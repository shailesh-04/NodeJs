import { GoogleGenAI } from '@google/genai';
import { buildSystemPrompt, MEMORY_PROMPT } from './persona.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Primary model first, then fallbacks used when a model is overloaded or unavailable.
const MODELS = [
  process.env.GEMINI_MODEL || 'gemini-3.8-flash',
  ...(process.env.GEMINI_FALLBACK_MODELS || 'gemini-3.5-flash,gemini-3.5-flash-lite')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
].filter((m, i, arr) => arr.indexOf(m) === i);

const RETRYABLE = /\b(429|500|503|504)\b|UNAVAILABLE|RESOURCE_EXHAUSTED|NOT_FOUND|404/;
const FIRST_CHUNK_TIMEOUT_MS = 30_000;
// Casual chat doesn't need deep reasoning; low thinking keeps replies fast.
const THINKING = { thinkingLevel: 'LOW' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Run fn(model) against each model in turn, retrying overload errors. */
async function withFallback(fn) {
  let lastErr;
  for (const model of MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        return await fn(model);
      } catch (err) {
        lastErr = err;
        if (!RETRYABLE.test(String(err?.message ?? err))) throw err;
        console.warn(`Gemini ${model} failed (attempt ${attempt + 1}), trying again/next model`);
        await sleep(400 * (attempt + 1));
      }
    }
  }
  throw lastErr;
}

/** Stream a reply. `history` is [{role, text}] (oldest first), excluding the new message. */
export async function* streamReply(profile, history, message) {
  const stream = await withFallback(async (model) => {
    // Give up on a model if it doesn't start answering in time.
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(new Error('503 timeout')), FIRST_CHUNK_TIMEOUT_MS);
    try {
      const chat = ai.chats.create({
        model,
        config: {
          systemInstruction: buildSystemPrompt(profile, message),
          temperature: 0.9,
          thinkingConfig: THINKING,
          abortSignal: ctrl.signal,
        },
        history: history.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
      });
      const s = await chat.sendMessageStream({ message });
      // Pull the first chunk here so overload errors are caught before anything is sent to the user.
      const it = s[Symbol.asyncIterator]();
      const first = await it.next();
      return { first, it };
    } catch (err) {
      throw ctrl.signal.aborted ? new Error(`503 timeout waiting for ${model}`) : err;
    } finally {
      clearTimeout(timer);
    }
  });

  for (let r = stream.first; !r.done; r = await stream.it.next()) {
    if (r.value?.text) yield r.value.text;
  }
}

/** Ask the model for new long-term facts about the user. Returns string[]. */
export async function extractMemories(known, recent) {
  const convo = recent.map((m) => `${m.role === 'user' ? 'User' : 'Her'}: ${m.text}`).join('\n');
  const res = await withFallback((model) =>
    ai.models.generateContent({
      model,
      contents: `${MEMORY_PROMPT}\n\nKnown:\n${known.join('\n') || '(none)'}\n\nConversation:\n${convo}`,
      config: {
        responseMimeType: 'application/json',
        temperature: 0,
        thinkingConfig: THINKING,
        abortSignal: AbortSignal.timeout(30_000),
      },
    })
  );
  try {
    const arr = JSON.parse(res.text);
    return Array.isArray(arr)
      ? arr.filter((s) => typeof s === 'string' && s.trim()).slice(0, 3)
      : [];
  } catch {
    return [];
  }
}
