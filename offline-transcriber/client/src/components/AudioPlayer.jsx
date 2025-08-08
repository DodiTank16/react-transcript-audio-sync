import React, { useEffect } from "react";
import AudioFile from "../assets/Victoria-Island.m4a";

const AudioPlayer = ({ audioFile, audioRef, onTimeUpdate }) => {
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

  useEffect(() => {
    if (!audioRef.current || !audioFile) return;

    if (audioFile instanceof Blob) {
      // For uploaded file
      audioRef.current.src = URL.createObjectURL(audioFile);
    } else if (typeof audioFile === "string") {
      // For imported asset
      audioRef.current.src = audioFile;
    }

    audioRef.current.load();
  }, [audioFile, audioRef]);

  return (
    <audio ref={audioRef} controls className="w-full mb-4">
      <source src={audioFile} />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;
