// Each browser gets its own anonymous user id.
const userId = (() => {
  let id = null;
  try { id = localStorage.getItem('aigf-user'); } catch {}
  if (!id) {
    id = crypto.randomUUID();
    try { localStorage.setItem('aigf-user', id); } catch {}
  }
  return id;
})();

const $ = (id) => document.getElementById(id);
const messagesEl = $('messages');
const input = $('input');
const sendBtn = $('sendBtn');
const settings = $('settings');
const settingsForm = $('settingsForm');
let profile = null;

const api = (path, opts = {}) =>
  fetch(`/api${path}${path.includes('?') ? '&' : '?'}userId=${encodeURIComponent(userId)}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  });

function addMessage(role, text = '') {
  messagesEl.querySelector('.empty')?.remove();
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return div;
}

function renderProfile() {
  $('gfName').textContent = profile.gfName;
  $('avatar').textContent = (profile.gfName[0] || '♥').toUpperCase();
  document.title = `${profile.gfName} 💕`;
}

function showEmpty() {
  messagesEl.innerHTML = `<div class="empty">${profile.gfName} ne "Hi" kaho 💌</div>`;
}

async function load() {
  profile = await (await api('/profile')).json();
  renderProfile();
  const history = await (await api('/history')).json();
  if (!history.length) showEmpty();
  history.forEach((m) => addMessage(m.role, m.text));
}

async function send(text) {
  addMessage('user', text);
  const bubble = addMessage('model');
  bubble.classList.add('typing');
  $('status').textContent = 'typing…';
  sendBtn.disabled = true;

  try {
    const res = await api('/chat', { method: 'POST', body: JSON.stringify({ message: text }) });
    if (!res.ok) throw new Error((await res.json()).error || res.statusText);
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      bubble.classList.remove('typing');
      bubble.textContent += decoder.decode(value, { stream: true });
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
  } catch (err) {
    bubble.textContent = `⚠️ ${err.message}`;
  } finally {
    bubble.classList.remove('typing');
    $('status').textContent = 'online';
    sendBtn.disabled = false;
    input.focus();
  }
}

$('composer').addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text || sendBtn.disabled) return;
  input.value = '';
  input.style.height = 'auto';
  send(text);
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    $('composer').requestSubmit();
  }
});
input.addEventListener('input', () => {
  input.style.height = 'auto';
  input.style.height = `${input.scrollHeight}px`;
});

// Settings
$('settingsBtn').addEventListener('click', async () => {
  profile = await (await api('/profile')).json(); // refresh memories
  settingsForm.userName.value = profile.userName;
  settingsForm.gfName.value = profile.gfName;
  settingsForm.personality.value = profile.personality;
  settingsForm.memories.value = profile.memories.join('\n');
  settings.showModal();
});

settings.addEventListener('close', async () => {
  if (settings.returnValue !== 'save') return;
  const body = {
    userName: settingsForm.userName.value,
    gfName: settingsForm.gfName.value,
    personality: settingsForm.personality.value,
    memories: settingsForm.memories.value.split('\n').map((s) => s.trim()).filter(Boolean),
  };
  profile = await (await api('/profile', { method: 'PUT', body: JSON.stringify(body) })).json();
  renderProfile();
});

$('resetBtn').addEventListener('click', async () => {
  if (!confirm('Badhi chat ane yaado delete kari daiye?')) return;
  await api('/history', { method: 'DELETE' });
  settings.close();
  showEmpty();
});

load().catch((err) => addMessage('model', `⚠️ Could not load: ${err.message}`));
input.focus();
