import React, { useEffect } from "react";
import AudioFile from "../assets/Victoria-Island.m4a";

const AudioPlayer = ({ audioRef, onTimeUpdate }) => {
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      onTimeUpdate(audio.currentTime);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef, onTimeUpdate]);

  return (
    <audio ref={audioRef} controls className="w-full mb-4">
      <source src={AudioFile} />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;
