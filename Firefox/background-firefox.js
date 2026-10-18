// Background service worker for Firefox
// Uses webRequest API (Firefox does not support declarativeNetRequest for redirects)

function getBaseUrl() {
    return browser.storage.local.get('useHtmlVersion').then((items) => {
        const useHtml = items.useHtmlVersion !== false;
        return useHtml ? 'https://duckduckgo.com/html/' : 'https://duckduckgo.com/';
    });
}

function buildRedirectUrl(baseUrl, query) {
    return `${baseUrl}?q=${encodeURIComponent(query)}`;
}

// Extract query from Google search URL
function extractQuery(url) {
    try {
        const u = new URL(url);
        return u.searchParams.get('q') || '';
    } catch {
        return '';
    }
}

// Check if URL should be redirected
function shouldRedirect(url) {
    try {
        const u = new URL(url);
        const hostname = u.hostname;
        const path = u.pathname;
        const search = u.search;

        // www.google.com/search or google.com/search
        if (hostname === 'www.google.com' && path === '/search') return true;
        if (hostname === 'google.com' && path === '/search') return true;
        if (hostname === 'encrypted.google.com' && path === '/search') return true;

        // Subdomain google searches: *.google.com/search
        if (hostname.endsWith('.google.com') && path === '/search') return true;

        // Query string variants
        if (search && searchParamsContainQuery(search)) return true;

        return false;
    } catch {
        return false;
    }
}

function searchParamsContainQuery(search) {
    const params = new URLSearchParams(search);
    return params.has('q') || params.has('oq') || params.has('as_q');
}

// Handle redirects via webRequest
browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        if (details.type !== 'main_frame') return {};
        return getBaseUrl().then((baseUrl) => {
            const query = extractQuery(details.url);
            if (!query) return {};
            return {
                redirectUrl: buildRedirectUrl(baseUrl, query)
            };
        });
    },
    {
        urls: [
            "https://www.google.com/search*",
            "https://google.com/search*",
            "https://encrypted.google.com/search*",
            "https://*.google.com/search*"
        ],
        types: ["main_frame"]
    },
    ["blocking"]
);

// Initialize on install
browser.runtime.onInstalled.addListener(() => {
    console.log('Google to DuckDuckGo Redirector installed (Firefox)');

    browser.storage.local.set({
        enableRedirect: true,
        useHtmlVersion: true,
        redirectGoogleImages: true,
        redirectGoogleNews: true
    });
});

// Listen for messages from popup/options
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getRedirectUrl') {
        getBaseUrl().then((baseUrl) => {
            sendResponse({ redirectUrl: `${baseUrl}?q=${encodeURIComponent(message.query)}` });
        });
        return true;
    }
});

// React to settings changes
browser.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.enableRedirect) {
        console.log(`Redirect ${changes.enableRedirect.newValue ? 'enabled' : 'disabled'}`);
    }
});

console.log('Google to DuckDuckGo Redirector background worker ready (Firefox)');
