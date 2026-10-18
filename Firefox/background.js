// Background service worker
// Handles dynamic redirect logic based on user settings

chrome.runtime.onInstalled.addListener(() => {
    console.log('Google to DuckDuckGo Redirector installed');
    
    // Set default settings
    chrome.storage.local.set({
        enableRedirect: true,
        useHtmlVersion: true,
        redirectGoogleImages: true,
        redirectGoogleNews: true
    });
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getRedirectUrl') {
        chrome.storage.local.get(['useHtmlVersion'], (items) => {
            const useHtml = items.useHtmlVersion !== false;
            const baseUrl = useHtml ? 'https://duckduckgo.com/html/' : 'https://duckduckgo.com/';
            sendResponse({ redirectUrl: `${baseUrl}?q=${encodeURIComponent(message.query)}` });
        });
        return true; // Keep channel open for async response
    }
});

// Update redirect rules when settings change
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.enableRedirect) {
        console.log(`Redirect ${changes.enableRedirect.newValue ? 'enabled' : 'disabled'}`);
        // Rules are managed via declarativeNetRequest, controlled by manifest
    }
});

console.log('Google to DuckDuckGo Redirector background service worker ready');
