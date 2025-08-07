# 🎙️ React Transcript Audio Sync

A React.js application that syncs audio playback with a timestamped transcript. Built with modular architecture, this project allows users to highlight words as the audio progresses and jump to any point by clicking a word.

## 🚀 Features

- 🔊 Audio playback synced with transcript
- 🖱️ Click-to-seek functionality on each word
- 📦 Modular, scalable component structure
- 🕒 Real-time word highlighting based on timestamps
- 💡 Easy to extend with paragraphs, captions, or subtitle export

## 📁 Folder Structure

```
src/
├── components/
│   ├── AudioPlayer.js         # Audio player logic
│   ├── Transcript.js          # Word list rendering
│   └── TranscriptWord.js      # Single word with highlighting + click
├── data/
│   └── sampleTranscript.js    # Transcript data with timestamps
├── App.js                     # Main container with state
└── index.css                  # Styling (optional)
```

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/DodiTank16/react-transcript-audio-sync.git
cd react-transcript-audio-sync
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your audio file

File is already uploaded in assets folder.

### 4. Run the app

```bash
npm start
```

## 🛠 Future Improvements

- Subtitle export (SRT/VTT)
- Confidence-level coloring
- Paragraph segmentation
- Editable transcript

## 📄 License

MIT
