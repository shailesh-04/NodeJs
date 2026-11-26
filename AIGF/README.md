# AI Girlfriend 💕

A companion chat app built with Node.js, Express, MongoDB and Google Gemini.

## Features
- Streaming chat replies from Gemini
- Chat history saved in MongoDB per browser (anonymous id kept in localStorage)
- Long-term memory: every few messages she picks up facts about you and keeps them in her prompt
- Settings for her name, her personality, your name, and her memories (you can edit them)
- Button to clear the chat and her memories

## Setup
```bash
npm install
cp .env.example .env   # then fill in MONGODB_URI and GEMINI_API_KEY
npm start              # or: npm run dev  (auto-restart on changes)
```
Open http://localhost:3000

## Structure
```
server.js            Express app entry
src/db.js            MongoDB connection
src/ai.js            Gemini chat streaming + memory extraction
src/persona.js       System prompt (edit to change how she talks)
src/routes.js        /api/profile, /api/history, /api/chat
src/models/          Mongoose models (Profile, Message)
public/              Chat UI (HTML/CSS/JS)
```

## Config (.env)
| Var | Required | Default |
|---|---|---|
| `MONGODB_URI` | yes | |
| `GEMINI_API_KEY` | yes | |
| `GEMINI_MODEL` | no | `gemini-3.8-flash` |
| `GEMINI_FALLBACK_MODELS` | no | `gemini-3.5-flash,gemini-3.5-flash-lite` (used when the main model is overloaded) |
| `PORT` | no | `3000` |
