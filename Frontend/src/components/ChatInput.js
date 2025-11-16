import React, { useState } from "react";

function ChatInput({ sessionId, onNewMessage }) {
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;

    // Add user message immediately
    onNewMessage({ sender: "You", text });

    fetch(`https://chatapp-project-1.onrender.com/api/session/${sessionId}/message`, {   // FIXED URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: text })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API RESPONSE:", data);

        if (data.success) {
          // Add AI reply
          onNewMessage({ sender: "AI", text: data.answer.text });
        } else {
          console.error("API Error:", data.error);
        }

        setText("");
      })
      .catch((err) => console.error("Send error:", err));
  };

  return (
    <div className="flex gap-2 p-4 border-t bg-white dark:bg-gray-900">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your question..."
        className="flex-1 p-2 border rounded dark:bg-gray-800 dark:text-white"
      />

      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-4 rounded"
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;