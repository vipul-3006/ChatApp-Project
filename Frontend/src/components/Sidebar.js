import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar({ open, onClose }) {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/sessions")
      .then(res => res.json())
      .then(data => setSessions(data.sessions))
      .catch(() => {});
  }, []);

  const createNewChat = () => {
    fetch("http://localhost:5000/api/new-chat")
      .then(res => res.json())
      .then(data => {
        navigate(`/chat/${data.session.id}`);
        onClose && onClose(); // close sidebar on mobile
      });
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden transition-opacity
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed z-30 top-0 left-0 h-full w-60 bg-white dark:bg-gray-800 
          border-r border-gray-200 dark:border-gray-700 p-4
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static`}
      >
        {/* Close button on mobile */}
        <button
          className="md:hidden mb-4 text-black dark:text-white"
          onClick={onClose}
        >
          Close
        </button>

        <button
          className="w-full bg-blue-500 text-white py-2 rounded mb-4"
          onClick={createNewChat}
        >
          New Chat
        </button>

        <div>
          {sessions.map((s) => (
            <Link
              key={s.id}
              to={`/chat/${s.id}`}
              onClick={onClose}
              className="block p-2 mb-2 bg-gray-100 dark:bg-gray-700 rounded"
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