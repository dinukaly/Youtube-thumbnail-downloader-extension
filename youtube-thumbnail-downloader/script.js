(function () {
    'use strict';
    
    console.log('YouTube Thumbnail Downloader extension loaded on', window.location.href);
    
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    
    function getVideoIdFromHref(href) {
        try {
            const u = new URL(href, location.origin);
            const v = u.searchParams.get('v');
            if (v && /^[\w-]{11}$/.test(v)) return v;
            
            
            const match = href.match(/\/watch\?v=([\w-]{11})/);
            if (match) return match[1];
        } catch {}
        return null;
    }
    
    function buildThumbs(id) {
        return [
            { key: 'maxres', url: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` },
            { key: 'sd',     url: `https://i.ytimg.com/vi/${id}/sddefault.jpg` },
            { key: 'hq',     url: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` },
            { key: 'mq',     url: `https://i.ytimg.com/vi/${id}/mqdefault.jpg` },
            { key: 'def',    url: `https://i.ytimg.com/vi/${id}/default.jpg` }
        ];
    }
    
    function download(url, filename) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
    
    function addDownloadButton(videoElement) {
       
        if (videoElement.querySelector('.yt-thumb-dl-btn')) return;
        

        let thumbnailContainer = null;
        let videoLink = null;
        

        const thumbnailSelectors = [
            'ytd-thumbnail',
            '.ytd-thumbnail',
            '#thumbnail',
            'a[href*="/watch"]'
        ];
        
        for (const selector of thumbnailSelectors) {
            const element = videoElement.querySelector(selector);
            if (element) {
                if (element.tagName === 'A' && element.href) {
                    videoLink = element;
                    thumbnailContainer = element.closest('ytd-thumbnail') || element;
                } else {
                    thumbnailContainer = element;
                    videoLink = element.querySelector('a[href*="/watch"]') || 
                               element.closest('a[href*="/watch"]') ||
                               videoElement.querySelector('a[href*="/watch"]');
                }
                if (thumbnailContainer && videoLink) break;
            }
        }
        
        if (!videoLink || !thumbnailContainer) {
            console.log('No thumbnail or video link found');
            return;
        }
        
        const videoId = getVideoIdFromHref(videoLink.href);
        if (!videoId) {
            console.log('Could not extract video ID from', videoLink.href);
            return;
        }
        

        const button = document.createElement('button');
        button.innerHTML = '⬇️';
        button.className = 'yt-thumb-dl-btn';
        button.title = 'Download thumbnail';
        

        Object.assign(button.style, {
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '14px',
            cursor: 'pointer',
            zIndex: '1000',
            opacity: '0.8',
            transition: 'opacity 0.2s'
        });
        
        button.addEventListener('mouseenter', () => button.style.opacity = '1');
        button.addEventListener('mouseleave', () => button.style.opacity = '0.8');
        
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const thumbs = buildThumbs(videoId);
            
           
            for (const thumb of thumbs) {
                try {
                    const img = new Image();
                    img.onload = () => {
                        download(thumb.url, `${videoId}.jpg`);
                        console.log('Downloaded thumbnail:', thumb.url);
                    };
                    img.onerror = () => {
                        console.log('Thumbnail not available:', thumb.url);
                    };
                    img.src = thumb.url;
                    break; 
                } catch (err) {
                    console.error('Error downloading thumbnail:', err);
                }
            }
        });
        

        if (getComputedStyle(thumbnailContainer).position === 'static') {
            thumbnailContainer.style.position = 'relative';
        }
        
        thumbnailContainer.appendChild(button);
        console.log('Added download button for video', videoId);
    }
    
    function scanForVideos() {
        const videoSelectors = [
            'ytd-rich-item-renderer',
            'ytd-grid-video-renderer',
            'ytd-video-renderer',
            'ytd-compact-video-renderer'
        ];
        
        const videos = document.querySelectorAll(videoSelectors.join(', '));
        console.log(`Found ${videos.length} video elements`);
        
        videos.forEach(addDownloadButton);
    }
    

    setTimeout(() => {
        scanForVideos();
    }, 2000);
    

    const observer = new MutationObserver((mutations) => {
        let hasNewVideos = false;
        
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { 
                    if (node.matches && node.matches('ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer')) {
                        hasNewVideos = true;
                    } else if (node.querySelector) {
                        const videos = node.querySelectorAll('ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer');
                        if (videos.length > 0) hasNewVideos = true;
                    }
                }
            });
        });
        
        if (hasNewVideos) {
            setTimeout(scanForVideos, 500);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    

    setInterval(scanForVideos, 5000);
    
})();
