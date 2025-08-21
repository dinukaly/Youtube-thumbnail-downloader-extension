# YouTube Thumbnail Downloader Extension

A lightweight browser extension that adds a convenient download button to YouTube video thumbnails, allowing you to save high-quality thumbnail images with just one click.

## Features

- **One-click thumbnail downloads**: Simply click the download button on any video thumbnail
- **Multiple quality options**: Automatically tries to download the highest available resolution (maxresdefault, sddefault, hqdefault, mqdefault, default)
- **Seamless integration**: Works directly on YouTube without redirecting to external sites
- **Real-time detection**: Automatically detects new videos as you scroll or navigate
- **Non-intrusive design**: Clean, minimal button that doesn't interfere with YouTube's interface
- **No permissions required**: Runs entirely within the browser without needing special permissions

## Installation

### Chrome/Edge (Manifest V3)

1. Download or clone this extension
2. Open Chrome/Edge and navigate to `chrome://extensions/` or `edge://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension folder
5. The extension will be installed and active immediately

### Firefox

This extension is designed for Manifest V3. For Firefox, you may need to modify the manifest.json for compatibility.

## How It Works

The extension operates through content scripts that run on YouTube pages:

1. **Content Injection**: The script runs when you visit YouTube pages
2. **Thumbnail Detection**: Automatically finds video thumbnails on the page
3. **Button Addition**: Adds a small download button (⬇️) to each thumbnail
4. **Video ID Extraction**: Extracts the YouTube video ID from the thumbnail link
5. **Image Download**: Uses YouTube's thumbnail API to download the highest quality available image

## Usage

1. **Navigate to YouTube**: Go to any YouTube page (homepage, search results, channel pages, etc.)
2. **Look for download buttons**: You'll see small black download buttons (⬇️) in the top-right corner of video thumbnails
3. **Click to download**: Click any download button to save the thumbnail image
4. **File naming**: Thumbnails are automatically named using the video ID (e.g., `dQw4w9WgXcQ.jpg`)

## Technical Details

### File Structure

```
youtube-thumbnail-downloader/
├── manifest.json    # Extension configuration
├── script.js        # Main content script
├── icon.png         # Extension icon (48x48 and 128x128)
└── README.md        # This file
```

### Thumbnail Quality Hierarchy

The extension attempts to download thumbnails in the following order of preference:
1. **maxresdefault** - Maximum resolution (1920x1080)
2. **sddefault** - Standard definition (640x480)
3. **hqdefault** - High quality (480x360)
4. **mqdefault** - Medium quality (320x180)
5. **default** - Default quality (120x90)

### Supported Pages

- YouTube homepage
- Search results pages
- Channel pages
- Subscription feeds
- Trending pages
- Any page with video thumbnails

## Browser Compatibility

- **Chrome**: ✅ Full support (Manifest V3)
- **Edge**: ✅ Full support (Manifest V3)
- **Brave**: ✅ Full support (Manifest V3)
- **Firefox**: ⚠️ May require manifest modifications
- **Safari**: ❌ Not supported

## Troubleshooting

### Extension Not Working?

1. **Check if enabled**: Ensure the extension is enabled in your browser's extension settings
2. **Refresh YouTube**: Try refreshing the YouTube page
3. **Clear cache**: Clear your browser cache and cookies
4. **Check console**: Open browser dev tools (F12) and check the console for any error messages

### Download Button Not Appearing?

1. **Wait a moment**: The extension needs a few seconds to load on new pages
2. **Scroll down**: New videos loaded dynamically will have buttons added
3. **Check selectors**: The extension may need updates if YouTube changes their HTML structure

### Images Not Downloading?

1. **Check popup blocker**: Ensure your browser allows downloads
2. **Check file permissions**: Ensure your download folder has write permissions
3. **Try different quality**: Some videos may not have all thumbnail qualities available

## Privacy & Security

- **No data collection**: This extension does not collect or transmit any user data
- **No external requests**: All requests are made directly to YouTube's CDN
- **Minimal permissions**: Only requires access to YouTube pages
- **Open source**: Full source code is available for review

## Development

### Making Changes

1. Edit the `script.js` file for functionality changes
2. Edit `manifest.json` for extension configuration changes
3. Reload the extension in your browser's extension settings

### Adding New Features

The extension uses the following key functions:
- `getVideoIdFromHref()`: Extracts video IDs from URLs
- `buildThumbs()`: Generates thumbnail URLs for different qualities
- `addDownloadButton()`: Creates and positions download buttons
- `scanForVideos()`: Scans the page for new video thumbnails

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Open an issue on the project repository
3. Provide detailed information about your browser version and the issue you're experiencing