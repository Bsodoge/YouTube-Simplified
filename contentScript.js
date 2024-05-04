let isToggled = false;
let settings = {
    isToggled : isToggled,
}

const applySettings = (isToggled) => {
    if(isToggled) blockContent();
    else unblockContent();
}

const getSettings = (message) => {
    applySettings(message.isToggled);
}

const blockContent = () => {
    document.getElementById('center').style.visibility = 'collapse';
}

const unblockContent = () => {
    document.getElementById('center').style.visibility = 'visible';
}

const onLoad = () => {
    browser.storage.local.get(settings).then((storageSettings) => {
	applySettings(storageSettings.isToggled);
    });
}

browser.runtime.onMessage.addListener(getSettings);

onLoad();
