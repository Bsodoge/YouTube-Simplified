let isToggled = false;
let settings = {
    isToggled : isToggled,
}

const applySettings = (isToggled) => {
    console.log(isToggled);
    if(isToggled) blockContent();
    else unblockContent();
}

const getSettings = (message) => {
    applySettings(message.isToggled);
}

const blockContent = () => {
    if(document.getElementById('center')) document.getElementById('center').style.display = 'none';
    if(document.getElementById('logo')) document.getElementById('logo').style.display = 'none';
    if(document.getElementById('start')) document.getElementById('start').style.display = 'none';
    if(document.getElementById('guide')) document.getElementById('guide').style.display = 'none';
    if(document.getElementById('end')) document.getElementById('end').style.display = 'none';
    if(document.getElementById('secondary')) document.getElementById('secondary').style.display = 'none';
    if(document.getElementById('comments')) document.getElementById('comments').style.display = 'none';
    if(document.getElementById('related')) document.getElementById('related').style.display = 'none';
    if(document.getElementsByClassName('ytp-endscreen-content')[0]) document.getElementsByClassName('ytp-endscreen-content')[0].style.display = 'none';
}

const unblockContent = () => {
    if(document.getElementById('center')) document.getElementById('center').style.display = 'initial';
    if(document.getElementById('logo')) document.getElementById('logo').style.display = 'initial';
    if(document.getElementById('start')) document.getElementById('start').style.display = 'initial';
    if(document.getElementById('guide')) document.getElementById('guide').style.display = 'initial';
    if(document.getElementById('end')) document.getElementById('end').style.display = 'initial';
    if(document.getElementById('secondary')) document.getElementById('secondary').style.display = 'initial';
    if(document.getElementById('comments')) document.getElementById('comments').style.display = 'initial';
    if(document.getElementById('related')) document.getElementById('related').style.display = 'initial';
    if(document.getElementsByClassName('ytp-endscreen-content')[0]) document.getElementsByClassName('ytp-endscreen-content')[0].style.display = 'initial';
}

const onLoad = () => {
    browser.storage.local.get(settings).then((storageSettings) => {
	applySettings(storageSettings.isToggled);
    });
}

browser.runtime.onMessage.addListener(getSettings);

const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
	onLoad();
    }
};

const observer = new MutationObserver(callback);
observer.observe(document.body, {childList: true, subtree: true });

onLoad();
