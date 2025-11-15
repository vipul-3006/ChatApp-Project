import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">

        {/* LEFT SIDEBAR */}
        <Sidebar />

        {/* MAIN CHAT AREA */}
        <div className="flex-1">
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <div className="p-6 text-3xl text-blue-600">
                  Start New Chat
                </div>
              }
            />

            {/* Chat Page */}
            <Route
              path="/chat/:sessionId"
              element={<ChatWindow />}
            />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;