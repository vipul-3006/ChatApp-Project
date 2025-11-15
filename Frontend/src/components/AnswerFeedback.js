import React from "react";

function AnswerFeedback({ onLike, onDislike }) {
  return (
    <div className="flex gap-4 mt-2">
      <button
        onClick={onLike}
        className="px-3 py-1 bg-green-500 text-white rounded"
      >
        Like
      </button>

      <button
        onClick={onDislike}
        className="px-3 py-1 bg-red-500 text-white rounded"
      >
        Dislike
      </button>
    </div>
  );
}

export default AnswerFeedback;