const getExtensionLink = document.getElementById("extension_link");
const getExtensionImage = document.getElementById("extension_image");

const browserLinks = {
    firefox: "https://addons.mozilla.org/en-US/firefox/addon/youtube-simplified/",
    chrome: "https://chromewebstore.google.com/detail/youtube-simplified/ofdlnilnphocpoekbagdkemgidmbfmjl?hl=en-GB&authuser=1"
}

const browserImages = {
    firefox: "img/firefox.svg",
    chrome: "img/chrome.svg"
}

const browser = (function () {
    const test = regexp => regexp.test(window.navigator.userAgent);
    switch (true) {
        case test(/firefox|fxios/i): return "firefox";
        case test(/chrome|chromium|crios/i): return "chrome";
        default: return "chrome";
    }
})();

getExtensionLink.href = browserLinks[browser];
getExtensionImage.src = browserImages[browser];

