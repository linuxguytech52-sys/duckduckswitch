# Google to DuckDuckGo Redirector

A Chrome extension that automatically redirects Google searches to DuckDuckGo for enhanced privacy.

## Features

- **Automatic Redirects**: Google search URLs are automatically redirected to DuckDuckGo
- **Privacy-Focused**: Searches go through DuckDuckGo which doesn't track you
- **Configurable**: Options to customize redirect behavior
- **No Tracking**: Extension uses Chrome's Declarative Net Request API (no content scripts needed)

## Installation

### Chrome / Chromium

#### Method 1: Load Unpacked (Development)

1. Download or clone this extension
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the extension folder

#### Method 2: Pack as .crx

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Pack extension"
4. Select the extension folder
5. Install the generated `.crx` file

### Firefox

1. Download or clone this extension
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on…"
4. Select `manifest-firefox.json` from the extension folder
5. The extension will load and redirect Google searches to DuckDuckGo

> **Note:** For a permanent Firefox installation, you can package the extension as an `.xpi` file or submit it to [Mozilla Add-ons (AMO)](https://addons.mozilla.org/). To package: `zip -r duckduckswitch.xpi * -x "*.git*" ".*"` using `manifest-firefox.json` as the manifest.

## Usage

Once installed, the extension will automatically redirect Google searches to DuckDuckGo:

- `https://www.google.com/search?q=privacy` → `https://duckduckgo.com/?q=privacy`
- `https://google.com/search?q=test` → `https://duckduckgo.com/html/?q=test`

### Options

Click the extension icon and select "Options" to configure:

- **Enable automatic redirects**: Toggle redirects on/off
- **Use DuckDuckGo HTML version**: Use the lightweight HTML version vs. regular version
- **Redirect Google Images**: Also redirect image searches
- **Redirect Google News**: Also redirect news searches

## How It Works

The extension uses Chrome's **Declarative Net Request API** to intercept navigation requests to Google search URLs and redirect them to DuckDuckGo. This approach:

- Doesn't require content scripts
- Has minimal performance impact
- Works at the browser level before pages load

## Manifest Permissions

- `declarativeNetRequest`: For redirect rules
- `host_permissions`: Access to Google domains for redirects

## Uninstalling

1. Navigate to `chrome://extensions/`
2. Find "Google to DuckDuckGo Redirector"
3. Click "Remove"

## License

MIT License
