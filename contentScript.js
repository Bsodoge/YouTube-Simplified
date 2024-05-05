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
    document.getElementById('center').style.display = 'none';
    document.getElementById('logo').style.display = 'none';
    document.getElementById('start').style.display = 'none';
    document.getElementById('guide').style.display = 'none';
    document.getElementById('end').style.display = 'none';
    document.getElementById('secondary').style.display = 'none';
    document.getElementById('comments').style.display = 'none';
}

const unblockContent = () => {
    document.getElementById('center').style.display = 'initial';
    document.getElementById('logo').style.display = 'initial';
    document.getElementById('start').style.display = 'initial';
    document.getElementById('guide').style.display = 'initial';
    document.getElementById('end').style.display = 'initial';
    document.getElementById('secondary').style.display = 'initial';
    document.getElementById('comments').style.display = 'initial';
}

const onLoad = () => {
    browser.storage.local.get(settings).then((storageSettings) => {
	applySettings(storageSettings.isToggled);
    });
}

browser.runtime.onMessage.addListener(getSettings);

onLoad();
