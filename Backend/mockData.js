const { v4: uuidv4 } = require("uuid");

// ------------------------------
// SESSION STORAGE
// ------------------------------
const sessions = [
  {
    id: uuidv4(),
    title: "Intro: SQL basics",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    messages: [
      { role: "user", text: "Explain SQL joins", timestamp: Date.now() - 5000 },
      {
        role: "assistant",
        text: "Here are SQL JOIN types and examples.",
        timestamp: Date.now() - 3000,
        structured: {
          columns: ["Join", "Description"],
          rows: [
            ["INNER JOIN", "Returns matched rows from both tables"],
            ["LEFT JOIN", "All rows from left + matched right"],
            ["RIGHT JOIN", "All rows from right + matched left"],
            ["FULL JOIN", "All rows when there is match from one of the tables"]
          ]
        }
      }
    ]
  }
];

// ------------------------------
// HELPER FUNCTIONS
// ------------------------------
function listSessions() {
  return sessions.map((s) => ({
    id: s.id,
    title: s.title,
    createdAt: s.createdAt,
  }));
}

function getSessionById(id) {
  return sessions.find((s) => s.id === id) || null;
}

function createNewSession(title = "New Chat") {
  const newSession = {
    id: uuidv4(),
    title,
    createdAt: Date.now(),
    messages: [
      { role: "assistant", text: "New session created. How can I help you today?", timestamp: Date.now() }
    ],
  };
  sessions.unshift(newSession);
  return newSession;
}

// ------------------------------
// INTELLIGENT MOCK ANSWERS
// ------------------------------
function generateMockResponse(question) {
  if (!question) return { text: "Can you repeat that?", structured: null };

  const q = question.toLowerCase().trim();

  // -----------------------------
  // 1️⃣ GREETINGS
  // -----------------------------
  if (["hi", "hello", "hey", "yo"].includes(q)) {
    return { text: "Hello! How can I help you today?", structured: null };
  }

  if (q.includes("how are you")) {
    return { text: "I'm doing great! How about you?", structured: null };
  }

  if (q.includes("who are you")) {
    return { text: "I'm your AI assistant built by Vipul!", structured: null };
  }

  // -----------------------------
  // 2️⃣ SQL JOIN EXPLANATION
  // -----------------------------
  if (
    q === "join" ||
    q === "joins" ||
    q.includes("sql join") ||
    q.includes("explain join")
  ) {
    return {
      text: "Here are SQL JOIN types and examples.",
      structured: {
        columns: ["Join", "Use case", "Example"],
        rows: [
          ["INNER JOIN", "Matching rows in both tables", "SELECT * FROM A INNER JOIN B ON A.id=B.id"],
          ["LEFT JOIN", "All from left + matched right", "SELECT * FROM A LEFT JOIN B ON A.id=B.id"],
          ["RIGHT JOIN", "All from right + matched left", "SELECT * FROM A RIGHT JOIN B ON A.id=B.id"],
          ["FULL JOIN", "All rows if match exists in any", "SELECT * FROM A FULL OUTER JOIN B ON A.id=B.id"],
        ],
      },
    };
  }

  // -----------------------------
  // 3️⃣ EMPLOYEE TABLE
  // -----------------------------
  if (q.includes("employee") || q.includes("employees")) {
    return {
      text: "Here is a sample employee dataset.",
      structured: {
        columns: ["ID", "Name", "Role", "Salary"],
        rows: [
          [1, "Neha", "Developer", 65000],
          [2, "Arjun", "QA Engineer", 45000],
          [3, "Kiran", "Manager", 85000],
        ],
      },
    };
  }

  // -----------------------------
  // 4️⃣ SIMPLE MATH LOGIC
  // -----------------------------
  if (q.match(/(\d+)\s*\+\s*(\d+)/)) {
    const [_, a, b] = q.match(/(\d+)\s*\+\s*(\d+)/);
    return { text: `The answer is ${Number(a) + Number(b)}.`, structured: null };
  }

  if (q.match(/(\d+)\s*\-\s*(\d+)/)) {
    const [_, a, b] = q.match(/(\d+)\s*\-\s*(\d+)/);
    return { text: `The answer is ${Number(a) - Number(b)}.`, structured: null };
  }

  // -----------------------------
  // 5️⃣ GENERAL QUESTIONS
  // -----------------------------
  if (q.includes("your name")) {
    return { text: "My name is Lumi, your personal AI assistant!", structured: null };
  }

  if (q.includes("who created you")) {
    return { text: "I was created by Vipul using a mock API!", structured: null };
  }

  if (q.includes("time")) {
    return { text: `Current time is: ${new Date().toLocaleTimeString()}`, structured: null };
  }

  // -----------------------------
  // 6️⃣ DEFAULT FALLBACK (ChatGPT-like)
  // -----------------------------
  return {
    text: `Here's what I understood: "${question}". But I'm still learning, can you ask it differently?`,
    structured: null
  };
}

module.exports = {
  sessions,
  listSessions,
  getSessionById,
  createNewSession,
  generateMockResponse,
};