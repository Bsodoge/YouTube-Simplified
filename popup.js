const buttonToggle = document.getElementById('activate');
let isToggled = false;
let settings = {
    isToggled,
    elements: {
	logo: true,
	secondary: true,
	middle: true,
	start: true,
	guide: true,
	end: true,
	comments: true,
	related: true,
	center: true,
    }
}

buttonToggle.addEventListener('click', () => browser.tabs.query({active:true,currentWindow:true},toggleExtension));

const changeButtonText = () => {
    if(!isToggled){
        buttonToggle.innerText = "Activate";
        title.classList.remove('titleActivate');
        buttonToggle.classList.remove('buttonActivate');
    } else{
        buttonToggle.innerText = "Deactivate";
        title.classList.add('titleActivate');
        buttonToggle.classList.add('buttonActivate')
    }
}

const setSettings = () => {
    settings = {
           isToggled,
            elements: {
  	    logo: true,
	    secondary: true,
	    middle: true,
	    start: true,
	    guide: true,
	    end: true,
	    comments: true,
	    related: true,
	    center: true,
        }
    }
    browser.storage.local.set(settings);
}

const onOpen = () => {
    browser.storage.local.get(settings).then((storageSettings) => {
        isToggled = storageSettings.isToggled;
        changeButtonText();
        settings = storageSettings;
        browser.tabs.query({active:true,currentWindow:true},sendMessage);
    });
}

const sendMessage = (tabs) => {
    browser.tabs.sendMessage(tabs[0].id, settings);
}

const toggleExtension =(tabs) => {
    isToggled = !isToggled;
    changeButtonText();
    setSettings();
    sendMessage(tabs);
}

onOpen();
