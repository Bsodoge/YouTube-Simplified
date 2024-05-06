let isToggled = false;
let settings = {
    isToggled,
    elements: {
	logo: false,
	secondary: false,
	middle: false,
	start: false,
	guide: false,
	end: false,
	comments: false,
	related: false,
	center: false,
    }
}

const applySettings = (storageSettings) => {
    if(storageSettings.isToggled) blockContent(storageSettings);
    else unblockContent(storageSettings);
}

const getSettings = (message) => {
    applySettings(message);
}

const blockContent = (settings) => {
    for(const element in settings.elements){
	if(settings.elements[element] === true){
	    if(document.getElementById(element)) document.getElementById(element).style.display = 'none';	
	}
    }
}

const unblockContent = (settings) => {
    for(const element in settings.elements){
	if(settings.elements[element] === true){
	    if(document.getElementById(element)) document.getElementById(element).style.display = 'initial';	
	}
    }
}

const onLoad = () => {
    browser.storage.local.get(settings).then((storageSettings) => {
	applySettings(storageSettings);
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

