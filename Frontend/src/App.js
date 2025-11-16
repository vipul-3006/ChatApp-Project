import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">

        {/* SIDEBAR FOR DESKTOP */}
        <div className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r">
          <Sidebar />
        </div>

        {/* HAMBURGER MENU (MOBILE) */}
        <button
          className="md:hidden absolute top-4 left-4 z-50 bg-gray-200 p-2 rounded shadow"
          onClick={() => setShowSidebar(true)}
        >
          ☰
        </button>

        {/* MOBILE SIDEBAR DRAWER */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            onClick={() => setShowSidebar(false)}
          >
            <div
              className="w-64 h-full bg-white dark:bg-gray-800 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar />
            </div>
          </div>
        )}

        {/* MAIN CHAT AREA */}
        <div className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<div className="p-4 text-xl">Start New Chat</div>} />
            <Route path="/chat/:id" element={<ChatWindow />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;