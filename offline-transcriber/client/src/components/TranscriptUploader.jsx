import React, { useState } from "react";
import axios from "axios";

const TranscriptUploader = ({ audio, setAudio, setTranscript, setLoader }) => {
  const handleFileChange = (e) => {
    setAudio(e.target.files[0]);
  };

  const handleUpload = async () => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("audio", audio);

      const res = await axios.post(
        "http://localhost:5000/api/transcribe",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.text) {
        setTranscript(res.data);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        🎙 Upload Audio for Transcription
      </h1>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Transcribe
      </button>
    </div>
  );
};

export default TranscriptUploader;
