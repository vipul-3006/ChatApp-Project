// server.js
const express = require('express');
const cors = require('cors');
const {
  listSessions,
  getSessionById,
  createNewSession,
  generateMockResponse
} = require('./mockdata');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// HEALTH CHECK
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: "API running" });
});

// GET all sessions
app.get('/api/sessions', (req, res) => {
  res.json({ success: true, sessions: listSessions() });
});

// CREATE new chat session
app.get('/api/new-chat', (req, res) => {
  const title = req.query.title || 'New Chat';
  const session = createNewSession(title);

  res.json({
    success: true,
    session: {
      id: session.id,
      title: session.title,
      createdAt: session.createdAt,
    }
  });
});

// GET session details + full message history
app.get('/api/session/:id', (req, res) => {
  const session = getSessionById(req.params.id);

  if (!session) {
    return res.status(404).json({ success: false, error: "Session not found" });
  }

  res.json({ success: true, session });
});

// POST a new chat message to session
app.post('/api/session/:id/message', (req, res) => {
  const { id } = req.params;
  const { question } = req.body;

  if (!question || typeof question !== "string") {
    return res.status(400).json({ success: false, error: "Missing 'question' in body" });
  }

  const session = getSessionById(id);
  const aiReply = generateMockResponse(question);

  // Store messages in the session
  if (session) {
    session.messages.push({
      role: "user",
      text: question,
      timestamp: Date.now()
    });

    session.messages.push({
      role: "assistant",
      text: aiReply.text,
      timestamp: Date.now(),
      structured: aiReply.structured || null
    });
  }

  // Response to frontend
  res.json({
    success: true,
    answer: aiReply
  });
});

// Start Backend
app.listen(PORT, () => {
  console.log(`Mock Chat API running at http://localhost:${PORT}`);
});