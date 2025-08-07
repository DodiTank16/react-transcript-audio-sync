import { useRef, useState } from "react";
import AudioPlayer from "./components/AudioPlayer";
import Transcript from "./components/Transcript";
import transcriptData from "./data/sampleTranscript";

const App = () => {
  const [transcript, setTranscript] = useState(transcriptData);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleEdit = (startTime, newText) => {
    const updated = transcript.map((word) =>
      word.start === startTime ? { ...word, word: newText } : word
    );
    setTranscript(updated);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 font-sans bg-gray-100">
      <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-2xl font-bold mb-4">
          🎙️ Editable Transcript Player
        </h1>
        <AudioPlayer audioRef={audioRef} onTimeUpdate={setCurrentTime} />
        <Transcript
          transcript={transcript}
          currentTime={currentTime}
          onSeek={handleSeek}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default App;
