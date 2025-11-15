import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatInput from "./ChatInput";

function ChatWindow() {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);

  // Normalize backend data - frontend format
  const normalize = (m) => ({
    sender: m.role === "user" ? "You" : "AI",
    text: m.text,
    structured: m.structured || null
  });

  // Load session messages
  useEffect(() => {
    fetch(`http://localhost:5000/api/session/${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.session?.messages) {
          setMessages(data.session.messages.map(normalize));
        }
      });
  }, [sessionId]);

  // Add new message to UI
  const handleNewMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <div className="flex flex-col h-full">

      {/* MESSAGE LIST */}
      <div className="flex-1 p-6 overflow-y-auto bg-white dark:bg-gray-900">
        {messages.map((msg, index) => (
          <div key={index} className="mb-6">

            <p className="font-bold">{msg.sender}:</p>
            <p className="text-gray-800 dark:text-gray-200">{msg.text}</p>

            {/* UNIVERSAL TABLE LOGIC */}
            {msg.structured && (
              <table className="mt-3 w-full border-collapse border border-gray-500">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    {msg.structured.columns.map((col, i) => (
                      <th key={i} className="border p-2 text-left">{col}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {msg.structured.rows.map((row, rindex) => (
                    <tr key={rindex}>
                      {row.map((cell, cindex) => (
                        <td key={cindex} className="border p-2">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </div>
        ))}
      </div>

      {/* INPUT BOX */}
      <ChatInput sessionId={sessionId} onNewMessage={handleNewMessage} />
    </div>
  );
}

export default ChatWindow;