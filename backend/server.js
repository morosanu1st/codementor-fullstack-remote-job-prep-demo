/**
 * Tiny Express API — interview-friendly full-stack demo.
 * Run: npm i && npm start  →  http://localhost:3847
 */
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3847;

app.use(cors());
app.use(express.json());

/** In-memory store (swap for Postgres/Mongo in a real portfolio app). */
let tasks = [
  { id: 1, title: 'Ship health endpoint', done: true },
  { id: 2, title: 'Add CRUD for tasks', done: false },
];
let nextId = 3;

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'job-prep-api', ts: new Date().toISOString() });
});

app.get('/api/tasks', (_req, res) => {
  res.json({ tasks });
});

app.post('/api/tasks', (req, res) => {
  const title = (req.body && req.body.title || '').trim();
  if (!title) return res.status(400).json({ error: 'title is required' });
  const task = { id: nextId++, title, done: false };
  tasks.push(task);
  res.status(201).json({ task });
});

app.patch('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: 'not found' });
  if (typeof req.body.done === 'boolean') task.done = req.body.done;
  if (typeof req.body.title === 'string' && req.body.title.trim()) {
    task.title = req.body.title.trim();
  }
  res.json({ task });
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const before = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);
  if (tasks.length === before) return res.status(404).json({ error: 'not found' });
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`job-prep-api listening on http://localhost:${PORT}`);
});
