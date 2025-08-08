// server/vosk-worker.js
const fs = require("fs");
const path = require("path");
const vosk = require("vosk");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");

const MODEL_PATH = path.join(
  __dirname,
  "models",
  "vosk-model-small-en-us-0.15"
);
const SAMPLE_RATE = 16000;

let model;

function initModel() {
  if (!fs.existsSync(MODEL_PATH)) {
    throw new Error(`Vosk model not found at path: ${MODEL_PATH}`);
  }
  vosk.setLogLevel(0);
  model = new vosk.Model(MODEL_PATH);
  console.log("✅ Vosk model loaded");
}

function convertToWav(inputPath) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(
      path.dirname(inputPath),
      path.basename(inputPath, path.extname(inputPath)) + "_16k.wav"
    );

    ffmpeg(inputPath)
      .setFfmpegPath(ffmpegPath) // Use local ffmpeg binary
      .audioFrequency(SAMPLE_RATE)
      .audioChannels(1)
      .format("wav")
      .on("end", () => resolve(outputPath))
      .on("error", reject)
      .save(outputPath);
  });
}

async function transcribeAudio(filePath) {
  if (!model) throw new Error("Model not initialized.");

  // Convert audio to proper format for Vosk
  const wavPath = await convertToWav(filePath);

  return new Promise((resolve, reject) => {
    try {
      const wfReader = fs.createReadStream(wavPath);
      const rec = new vosk.Recognizer({ model, sampleRate: SAMPLE_RATE });
      rec.setWords(true);

      wfReader.on("data", (data) => rec.acceptWaveform(data));
      wfReader.on("end", () => {
        const result = rec.finalResult();
        rec.free();

        // Clean up
        fs.unlinkSync(filePath);
        fs.unlinkSync(wavPath);

        resolve(result);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { initModel, transcribeAudio };
