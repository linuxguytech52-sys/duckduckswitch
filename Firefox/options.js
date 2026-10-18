// Options page script
document.addEventListener('DOMContentLoaded', () => {
    const enableRedirect = document.getElementById('enableRedirect');
    const useHtmlVersion = document.getElementById('useHtmlVersion');
    const redirectGoogleImages = document.getElementById('redirectGoogleImages');
    const redirectGoogleNews = document.getElementById('redirectGoogleNews');
    const saveBtn = document.getElementById('saveBtn');

    // Load saved settings
    chrome.storage.local.get({
        enableRedirect: true,
        useHtmlVersion: true,
        redirectGoogleImages: true,
        redirectGoogleNews: true
    }, (items) => {
        enableRedirect.checked = items.enableRedirect;
        useHtmlVersion.checked = items.useHtmlVersion;
        redirectGoogleImages.checked = items.redirectGoogleImages;
        redirectGoogleNews.checked = items.redirectGoogleNews;
    });

    // Save settings
    saveBtn.addEventListener('click', () => {
        chrome.storage.local.set({
            enableRedirect: enableRedirect.checked,
            useHtmlVersion: useHtmlVersion.checked,
            redirectGoogleImages: redirectGoogleImages.checked,
            redirectGoogleNews: redirectGoogleNews.checked
        }, () => {
            alert('Settings saved!');
        });
    });
});
