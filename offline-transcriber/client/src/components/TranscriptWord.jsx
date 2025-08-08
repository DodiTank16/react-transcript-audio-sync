import React, { useState } from "react";

const TranscriptWord = ({ word, isActive, onClick, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [tempText, setTempText] = useState(word.word);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    onEdit(word.start, tempText);
  };

  return (
    <span
      onClick={() => onClick(word.start)}
      onDoubleClick={handleDoubleClick}
      className={`inline-block px-1 cursor-pointer transition ${
        isActive ? "bg-yellow-200 font-bold" : ""
      }`}>
      {editing ? (
        <input
          autoFocus
          className="border rounded px-1 text-sm"
          value={tempText}
          onChange={(e) => setTempText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.target.blur();
          }}
        />
      ) : (
        word.word
      )}
    </span>
  );
};

export default TranscriptWord;
