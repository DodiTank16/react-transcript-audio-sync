const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { initModel, transcribeAudio } = require("./vosk-worker");

const app = express();
const upload = multer({ dest: "uploads/" });
const PORT = 5000;

app.use(cors());
app.use(express.json());

initModel();

app.post("/api/transcribe", upload.single("audio"), async (req, res) => {
  try {
    const result = await transcribeAudio(req.file.path);
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Transcription failed", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Vosk server running on http://localhost:${PORT}`);
});
