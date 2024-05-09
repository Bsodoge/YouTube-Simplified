const buttonToggle = document.getElementById('activate');
const optionsToggle = document.getElementById('options');
const reccomendationsCheckBox = document.getElementById('secondary');
const commentsCheckBox = document.getElementById('comments');
const endCheckBox = document.getElementById('end');
const centerCheckBox = document.getElementById('center');
const optionsCheckBox = document.getElementById('options');
const checkBoxes = Array.from(document.querySelectorAll('input'));
let isToggled = false;
let optionsToggled = false;
let settings = {
    isToggled,
    elements: {
	secondary: reccomendationsCheckBox.checked,
	start: optionsCheckBox.checked,
	guide: optionsCheckBox.checked,
	end: endCheckBox.checked,
	comments: commentsCheckBox.checked,
	related: reccomendationsCheckBox.checked,
	center: centerCheckBox.checked,
    left_sidebar: optionsCheckBox.checked,
    ytd_browse: reccomendationsCheckBox.checked,
    }
}

buttonToggle.addEventListener('click', () => browser.tabs.query({active:true,currentWindow:true},toggleExtension));
reccomendationsCheckBox.addEventListener('click', () => browser.tabs.query({active:true,currentWindow:true}, (tabs) => toggleElement('reccomendations', tabs)));
commentsCheckBox.addEventListener('click', () => browser.tabs.query({active:true,currentWindow:true}, (tabs) => toggleElement('comments', tabs)));
endCheckBox.addEventListener('click', () => browser.tabs.query({active:true,currentWindow:true}, (tabs) => toggleElement('end', tabs)));
centerCheckBox.addEventListener('click', () => browser.tabs.query({active:true,currentWindow:true}, (tabs) => toggleElement('center', tabs)));
optionsCheckBox.addEventListener('click', () => browser.tabs.query({active:true,currentWindow:true}, (tabs) => toggleElement('start', tabs)));
optionsToggle.addEventListener('click', () => browser.tabs.query({active:true,currentWindow:true}, toggleOptions));

const toggleElement = (element, tabs) => {
    checkBoxes.forEach(checkBox => {
	    if(checkBox.id === element){
            settings.elements[element] = !settings.elements[element];
            checkBox.checked = settings.elements[element];
        } 
    })
    setSettings();
    sendMessage(tabs)
}
const changeButtonText = () => {
    if(!isToggled){
        buttonToggle.innerText = "Activate";
        buttonToggle.classList.remove('activated');
    } else{
        buttonToggle.innerText = "Deactivate";
        buttonToggle.classList.add('activated')
    }
}

const toggleOptions = () => {
    if(!optionsToggled){
        optionsToggle.innerText = "Options +";
    } else{
        buttonToggle.innerText = "Options -";
    }
}

const setSettings = () => {
    settings = {
        isToggled,
        elements: {
        secondary: reccomendationsCheckBox.checked,
        start: optionsCheckBox.checked,
    	guide: optionsCheckBox.checked,
        end: endCheckBox.checked,
        comments: commentsCheckBox.checked,
        related: reccomendationsCheckBox.checked,
        center: centerCheckBox.checked,
        left_sidebar: optionsCheckBox.checked,
        ytd_browse: reccomendationsCheckBox.checked,
        }
    }
    browser.storage.local.set(settings);
}

const onOpen = () => {
    browser.storage.local.get(settings).then((storageSettings) => {
        isToggled = storageSettings.isToggled;
	    checkBoxes.forEach(checkBox => checkBox.checked = storageSettings.elements[checkBox.id]);
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
