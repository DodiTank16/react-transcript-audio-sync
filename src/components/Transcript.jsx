import React from "react";
import TranscriptWord from "./TranscriptWord";

const Transcript = ({ transcript, currentTime, onSeek, onEdit }) => {
  console.log("Transcript:", transcript);
  return (
    <div className="flex flex-wrap gap-1 p-4">
      {transcript.map((word, index) => (
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
