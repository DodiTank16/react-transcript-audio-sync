import React from "react";
import TranscriptWord from "./TranscriptWord";

const Transcript = ({ transcript, currentTime, onSeek, onEdit }) => {
  return (
    <div className="flex flex-wrap gap-x-1 gap-y-2 p-4 leading-relaxed select-text max-h-[70vh] overflow-y-auto">
      {transcript?.result?.map((word, index) => (
        <TranscriptWord
          key={index}
          word={word}
          isActive={currentTime >= word.start && currentTime <= word.end}
          onClick={onSeek}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default Transcript;
