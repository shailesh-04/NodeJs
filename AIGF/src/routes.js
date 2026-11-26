import { Router } from 'express';
import Profile from './models/Profile.js';
import Message from './models/Message.js';
import { streamReply, extractMemories } from './ai.js';

const router = Router();
const HISTORY_LIMIT = 40; // past messages sent to the model as context
const MAX_MEMORIES = 50;

const getProfile = (userId) =>
  Profile.findOneAndUpdate(
    { userId },
    { $setOnInsert: { userId } },
    { upsert: true, returnDocument: 'after' }
  );

function requireUser(req, res, next) {
  const userId = req.query.userId || req.body?.userId;
  if (!userId || typeof userId !== 'string' || userId.length > 100) {
    return res.status(400).json({ error: 'userId is required' });
  }
  req.userId = userId;
  next();
}

router.get('/profile', requireUser, async (req, res) => {
  res.json(await getProfile(req.userId));
});

router.put('/profile', requireUser, async (req, res) => {
  const update = {};
  for (const key of ['userName', 'gfName', 'personality']) {
    if (typeof req.body[key] === 'string') update[key] = req.body[key].trim().slice(0, 500);
  }
  if (Array.isArray(req.body.memories)) {
    update.memories = req.body.memories.filter((m) => typeof m === 'string').slice(0, MAX_MEMORIES);
  }
  const profile = await Profile.findOneAndUpdate({ userId: req.userId }, update, {
    upsert: true,
    returnDocument: 'after',
  });
  res.json(profile);
});

router.get('/history', requireUser, async (req, res) => {
  const msgs = await Message.find({ userId: req.userId }).sort({ createdAt: -1, _id: -1 }).limit(100).lean();
  res.json(msgs.reverse().map(({ role, text, createdAt }) => ({ role, text, createdAt })));
});

router.delete('/history', requireUser, async (req, res) => {
  await Message.deleteMany({ userId: req.userId });
  await Profile.updateOne({ userId: req.userId }, { memories: [] });
  res.json({ ok: true });
});

router.post('/chat', requireUser, async (req, res) => {
  const message =
    typeof req.body.message === 'string' ? req.body.message.trim().slice(0, 4000) : '';
  if (!message) return res.status(400).json({ error: 'message is required' });

  const profile = await getProfile(req.userId);
  const history = (
    await Message.find({ userId: req.userId }).sort({ createdAt: -1, _id: -1 }).limit(HISTORY_LIMIT).lean()
  ).reverse();

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');

  let reply = '';
  try {
    for await (const piece of streamReply(profile, history, message)) {
      reply += piece;
      res.write(piece);
    }
  } catch (err) {
    console.error('Gemini error:', err.message);
    if (!reply) res.write('Sorry jaan, network ma kaik problem se 😵‍💫 farithi kahe ne?');
    return res.end();
  }
  res.end();

  // Save the exchange, then update long-term memory in the background every few turns.
  try {
    await Message.insertMany([
      { userId: req.userId, role: 'user', text: message },
      { userId: req.userId, role: 'model', text: reply },
    ]);
    const count = await Message.countDocuments({ userId: req.userId });
    if (count % 6 === 0) {
      const recent = [
        ...history.slice(-8),
        { role: 'user', text: message },
        { role: 'model', text: reply },
      ];
      const facts = await extractMemories(profile.memories, recent);
      if (facts.length) {
        await Profile.updateOne(
          { userId: req.userId },
          { $push: { memories: { $each: facts, $slice: -MAX_MEMORIES } } }
        );
      }
    }
  } catch (err) {
    console.error('Post-chat save failed:', err.message);
  }
});

export default router;
