import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { connectDB } from './src/db.js';
import routes from './src/routes.js';

if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set in .env');
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json({ limit: '100kb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', routes);
app.use((err, req, res, _next) => {
  console.error(err);
  if (!res.headersSent) res.status(500).json({ error: 'Something went wrong' });
});

const PORT = process.env.PORT || 3000;
await connectDB(process.env.MONGODB_URI);
app.listen(PORT, () => console.log(`💕 AI Girlfriend running at http://localhost:${PORT}`));
