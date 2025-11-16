import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar({ open, onClose }) {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://chatapp-project-1.onrender.com/api/sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data.sessions || []))
      .catch(() => {});
  }, []);

  const createNewChat = () => {
    fetch("https://chatapp-project-1.onrender.com/api/new-chat")
      .then((res) => res.json())
      .then((data) => {
        navigate(`/chat/${data.session.id}`);
        onClose && onClose();
      });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 
        border-r border-gray-300 dark:border-gray-700 p-4 z-30
        transform transition-transform 
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static`}
      >

        {/* Close button (mobile only) */}
        <button
          className="md:hidden mb-4 px-3 py-1 bg-gray-200 rounded"
          onClick={onClose}
        >
          ✕ Close
        </button>

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-md mb-4 font-semibold"
          onClick={createNewChat}
        >
          ➕ Start New Chat
        </button>

        <div className="space-y-2 overflow-y-auto h-[80vh]">
          {sessions.map((s) => (
            <Link
              key={s.id}
              to={`/chat/${s.id}`}
              onClick={onClose}
              className="block p-3 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200"
            >
              {s.title}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;