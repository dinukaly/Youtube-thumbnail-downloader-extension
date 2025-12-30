(function () {
    'use strict';
    
    // Use a Map instead of WeakSet for more reliable tracking
    const processedIds = new Map();
    
    // Improved video ID extraction with multiple patterns
    function getVideoId(href) {
        if (!href) return null;
        
        // Try multiple patterns to extract video ID
        const patterns = [
            /[?&]v=([\w-]{11})/, // Standard watch URL
            /\/watch\?v=([\w-]{11})/, // Alternative format
            /youtu\.be\/([\w-]{11})/, // Short URL format
            /\/embed\/([\w-]{11})/ // Embed URL format
        ];
        
        for (const pattern of patterns) {
            const match = href.match(pattern);
            if (match) return match[1];
        }
        
        return null;
    }
    
    // Thumbnail URL construction with fallback qualities
    function getThumbnailUrls(videoId) {
        return [
            `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
            `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
            `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
        ];
    }
    
    // Enhanced download button creation
    function addDownloadButton(videoElement) {
        // Generate a unique ID for the element
        const elementId = videoElement.id || 
                         videoElement.dataset.videoId || 
                         Math.random().toString(36).substring(2, 15);
        
        // Skip if already processed
        if (processedIds.has(elementId)) return;
        processedIds.set(elementId, true);
        
        // Find thumbnail container with multiple selector strategies
        let thumbnail = null;
        const selectors = [
            'ytd-thumbnail',
            '#thumbnail',
            '.ytd-thumbnail',
            'a[href*="/watch"]'
        ];
        
        // Try each selector
        for (const selector of selectors) {
            const element = videoElement.querySelector(selector);
            if (element) {
                if (element.tagName === 'A') {
                    thumbnail = element.closest('ytd-thumbnail') || element;
                } else {
                    thumbnail = element;
                }
                if (thumbnail) break;
            }
        }
        
        if (!thumbnail) return;
        
        // Find video link and extract ID
        const videoLink = thumbnail.querySelector('a[href*="/watch"]') || 
                         videoElement.querySelector('a[href*="/watch"]');
        
        const videoId = videoLink ? getVideoId(videoLink.href) : null;
        if (!videoId) return;
        
        // Skip if button already exists on this thumbnail
        if (thumbnail.querySelector('.yt-thumb-dl-btn')) return;
        
        // Create download button
        const button = document.createElement('button');
        button.innerHTML = '⬇';
        button.className = 'yt-thumb-dl-btn';
        button.title = 'Download thumbnail';
        button.setAttribute('data-video-id', videoId);
        
        // Improved button styling for better visibility
        button.style.cssText = `
            position: absolute; top: 8px; right: 8px; 
            background: rgba(0,0,0,.7); color: white; 
            border: none; border-radius: 4px; padding: 4px 8px;
            font-size: 14px; cursor: pointer; z-index: 9999;
            opacity: .8; transition: opacity .2s;
        `;
        
        button.onmouseenter = () => button.style.opacity = '1';
        button.onmouseleave = () => button.style.opacity = '.8';
        
        // Open thumbnail in new tab
        button.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const urls = getThumbnailUrls(videoId);
            window.open(urls[0], '_blank');
        };
        
        // Ensure thumbnail container has relative positioning
        if (getComputedStyle(thumbnail).position === 'static') {
            thumbnail.style.position = 'relative';
        }
        
        thumbnail.appendChild(button);
    }
    
    // Improved scanning with more comprehensive selectors
    let scanTimeout;
    function scanVideos() {
        clearTimeout(scanTimeout);
        scanTimeout = setTimeout(() => {
            // More comprehensive selector list
            const selectors = [
                'ytd-rich-item-renderer',
                'ytd-grid-video-renderer', 
                'ytd-video-renderer',
                'ytd-compact-video-renderer',
                'ytd-playlist-renderer',
                'ytd-playlist-panel-video-renderer',
                'ytd-video-preview',
                'ytd-channel-video-renderer'
            ];
            
            const videos = document.querySelectorAll(selectors.join(', '));
            console.log(`YouTube Thumbnail Downloader: Found ${videos.length} video elements`);
            
            // Process videos in batches to avoid blocking UI
            const processVideoBatch = (startIndex, batchSize) => {
                const endIndex = Math.min(startIndex + batchSize, videos.length);
                
                for (let i = startIndex; i < endIndex; i++) {
                    addDownloadButton(videos[i]);
                }
                
                // Process next batch if there are more videos
                if (endIndex < videos.length) {
                    setTimeout(() => {
                        processVideoBatch(endIndex, batchSize);
                    }, 0);
                }
            };
            
            // Start processing in batches of 10
            processVideoBatch(0, 10);
        }, 100); // Reduced delay for faster response
    }
    
    // Enhanced mutation observer with more targeted detection
    const observer = new MutationObserver((mutations) => {
        let shouldScan = false;
        
        for (const mutation of mutations) {
            // Check for added nodes
            if (mutation.addedNodes.length > 0) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === 1) { // Element node
                        // Check if it's a video container or contains video containers
                        if (node.tagName && (
                            node.tagName.startsWith('YTD-') || 
                            node.id === 'contents' || 
                            node.id === 'items' ||
                            node.classList?.contains('ytd-') ||
                            node.querySelector?.('ytd-thumbnail')
                        )) {
                            shouldScan = true;
                            break;
                        }
                    }
                }
            }
            
            // Also check for attribute modifications on specific elements
            if (!shouldScan && mutation.type === 'attributes' && 
                mutation.target.nodeType === 1 && 
                mutation.target.tagName && 
                mutation.target.tagName.startsWith('YTD-')) {
                shouldScan = true;
            }
            
            if (shouldScan) break;
        }
        
        if (shouldScan) scanVideos();
    });
    
    // Initialize with multiple observer targets for better coverage
    function initialize() {
        console.log('YouTube Thumbnail Downloader: Initializing...');
        
        // Initial scan
        scanVideos();
        
        // Set up observers on multiple key elements
        const targets = [
            '#contents', 
            '#items', 
            'ytd-browse', 
            'ytd-watch-flexy',
            'ytd-page-manager',
            '#primary'
        ];
        
        let observersAttached = 0;
        
        for (const selector of targets) {
            const target = document.querySelector(selector);
            if (target) {
                observer.observe(target, { 
                    childList: true, 
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['src', 'href', 'data-video-id']
                });
                observersAttached++;
            }
        }
        
        // Fallback to body if no specific targets found
        if (observersAttached === 0) {
            observer.observe(document.body, { 
                childList: true, 
                subtree: true 
            });
        }
        
        // Set up periodic scanning for dynamic content
        setInterval(scanVideos, 3000);
    }
    
    // Start with a slight delay to ensure DOM is ready
    setTimeout(initialize, 500);
    
    // Cleanup
    window.addEventListener('beforeunload', () => observer.disconnect());
    
})();
