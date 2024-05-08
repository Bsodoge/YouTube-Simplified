let isToggled = false;
let settings = {
    isToggled,
    elements: {
	secondary: false,
	middle: false,
	start: false,
	guide: false,
	end: false,
	comments: false,
	related: false,
	center: false,
    left_sidebar: false,
	main: false,
    }
}

const applySettings = (storageSettings) => {
    if(storageSettings.isToggled) blockContent(storageSettings);
    else unblockContent(storageSettings);
}

const blockContent = (settings) => {
	for(const element in settings.elements){
		if(settings.elements[element] === true){
			if(document.getElementById(element)) document.getElementById(element).style.display = 'none';	
		} else{
			if(document.getElementById(element)) document.getElementById(element).style.display = '';	
	}
}
}

const unblockContent = (settings) => {
    for(const element in settings.elements){
	if(settings.elements[element] === true){
	    if(document.getElementById(element)) document.getElementById(element).style.display = '';	
	}
    }
}

const onLoad = () => {
    browser.storage.local.get(settings).then((storageSettings) => {
	applySettings(storageSettings);
    });
}


const callback = (mutationsList, observer) => {
	for (const mutation of mutationsList) {
		if(document.getElementsByTagName('ytd-mini-guide-renderer')[0] && document.getElementsByTagName('ytd-mini-guide-renderer')[0].id !== 'left_sidebar') document.getElementsByTagName('ytd-mini-guide-renderer')[0].id = 'left_sidebar';
		if(document.getElementsByTagName('ytd-browse')[0] && document.getElementsByTagName('ytd-browse')[0].id !== 'main') document.getElementsByTagName('ytd-browse')[0].id = 'main';

		onLoad();
    }
};

browser.runtime.onMessage.addListener(applySettings);
const observer = new MutationObserver(callback);
observer.observe(document.body, {childList: true, subtree: true });
onLoad();


