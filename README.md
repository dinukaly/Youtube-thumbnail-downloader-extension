# YouTube Thumbnail Downloader Extension

A simple browser extension that lets you **download YouTube video thumbnails in one click**—directly from YouTube.

---

## ✨ What This Extension Does

* Adds a **small download button (⬇️)** on every YouTube video thumbnail
* Downloads the **best available thumbnail quality automatically**
* Works while you **scroll, search, or navigate** on YouTube
* **No redirects**, **no popups**, **no data collection**

---

## 🚀 Key Features

* ✅ One‑click thumbnail download
* ✅ Highest quality first (up to 1920×1080)
* ✅ Works on all YouTube pages
* ✅ Auto-detects newly loaded videos
* ✅ Clean and non-intrusive UI
* ✅ No special permissions required

---

## 🧩 Supported Browsers

| Browser | Support                         |
| ------- | ------------------------------- |
| Chrome  | ✅ Yes                           |
| Edge    | ✅ Yes                           |
| Brave   | ✅ Yes                           |
| Firefox | ⚠️ Needs small manifest changes |
| Safari  | ❌ Not supported                 |

---

## 📦 Installation Guide (Chrome / Edge)

1. Download or clone this repository
2. Open your browser and go to:

   * Chrome: `chrome://extensions/`
   * Edge: `edge://extensions/`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked**
5. Select the extension folder
6. Done 🎉 The extension is now active

---

## 🖱️ How to Use

1. Open **YouTube**
2. Hover over any video thumbnail
3. Click the **⬇️ download button** (top-right corner)
4. The thumbnail downloads instantly

📁 File name format:

```
VIDEO_ID.jpg
```

Example:

```
dQw4w9WgXcQ.jpg
```

---

## 🖼️ Screenshot Guide

> 📌 Screenshots are placed in the `screenshots/` folder

### 1️⃣ Extension Loaded

![Extension Loaded](/youtube-thumbnail-downloader/images/01.jpg)

---

### 2️⃣ Download Button on Thumbnail

![Download Button](/youtube-thumbnail-downloader/images/02.jpg)

---

### 3️⃣ One‑Click Download

![Downloading Thumbnail](/youtube-thumbnail-downloader/images/03.jpg)

---

### 4️⃣ Downloaded File

![Downloaded Image](/youtube-thumbnail-downloader/images/04.jpg)

---

## 🛠️ How It Works (Simple Explanation)

1. The extension runs on YouTube pages
2. It finds video thumbnails automatically
3. A small ⬇️ button is added to each thumbnail
4. When clicked:

   * Video ID is detected
   * Thumbnail URLs are generated
   * Best available image is downloaded

---

## 📐 Thumbnail Quality Order

The extension tries these in order:

1. `maxresdefault` (1920×1080)
2. `sddefault` (640×480)
3. `hqdefault` (480×360)
4. `mqdefault` (320×180)
5. `default` (120×90)

---

## 📁 Project Structure

```
youtube-thumbnail-downloader/
├── manifest.json
├── script.js
├── icon.png
├── screenshots/
│   ├── 1-extension-loaded.png
│   ├── 2-download-button.png
│   ├── 3-download-action.png
│   └── 4-downloaded-file.png
└── README.md
```

---

## ❓ Troubleshooting

### Button Not Showing?

* Refresh the page
* Scroll down (new videos load dynamically)
* Make sure the extension is enabled

### Image Not Downloading?

* Check browser download permissions
* Some videos don’t have max resolution thumbnails

---

## 🔐 Privacy & Safety

* 🔒 No tracking
* 🔒 No analytics
* 🔒 No external servers
* 🔒 Runs only on YouTube

---

## 🧑‍💻 Development

To make changes:

1. Edit `script.js`
2. Reload the extension in browser

---

## 📜 License

MIT License — free to use, modify, and share.

---

## 🤝 Contributing

Contributions are welcome:

* Bug fixes
* Feature ideas
* UI improvements
* Documentation updates

---

## ❤️ Support

If you like this project:

* ⭐ Star the repository
* 🐛 Report issues
* 💡 Suggest improvements

Happy downloading! 🎉
