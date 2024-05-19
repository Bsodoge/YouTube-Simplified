const getExtensionLink = document.getElementById("extension_link");
const getExtensionImage = document.getElementById("extension_image");

const browserLinks = {
    firefox: "https://addons.mozilla.org/en-US/firefox/addon/youtube-simplified/",
    chrome: "chrome"
}

const browserImages = {
    firefox: "images/firefox.svg",
    chrome: "images/chrome.svg"
}

const browser = (function () {
    const test = regexp => regexp.test(window.navigator.userAgent);
    switch (true) {
        case test(/edg/i): "edge";
        case test(/firefox|fxios/i): return "firefox";
        case test(/opr\//i): return "opera";
        case test(/chrome|chromium|crios/i): return "chrome";
        default: return "chrome";
    }
})();

getExtensionLink.href = browserLinks[browser];
getExtensionImage.src = browserImages[browser];

