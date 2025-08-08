import { useRef, useState } from "react";
import AudioPlayer from "./components/AudioPlayer";
import Transcript from "./components/Transcript";
import transcriptData from "./data/sampleTranscript";
import TranscriptUploader from "./components/TranscriptUploader";
import Loader from "./components/Loader";

const App = () => {
  const [audio, setAudio] = useState(new Audio());
  const [loader, setLoader] = useState(false);

  const [transcript, setTranscript] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleEdit = (startTime, newText) => {
    const updatedResult = transcript?.result?.map((word) =>
      word.start === startTime ? { ...word, word: newText } : word
    );

    const updatedText = updatedResult.map((w) => w.word).join(" ");

    const updatedTranscript = {
      ...transcript,
      result: updatedResult,
      text: updatedText,
    };

    setTranscript(updatedTranscript);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-4 font-sans bg-gray-100">
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-2xl font-bold mb-4">
            🎙️ Editable Transcript Player
          </h1>
          <TranscriptUploader
            audio={audio}
            setAudio={setAudio}
            setTranscript={setTranscript}
            setLoader={setLoader}
          />
          <AudioPlayer
            audioFile={audio}
            audioRef={audioRef}
            onTimeUpdate={setCurrentTime}
          />
          <Transcript
            transcript={transcript}
            currentTime={currentTime}
            onSeek={handleSeek}
            onEdit={handleEdit}
          />
        </div>
      </div>
      {loader && <Loader text={"Processing the file"} />}
    </>
  );
};

export default App;
