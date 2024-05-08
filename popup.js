const buttonToggle = document.getElementById('activate');
const reccomendationsCheckBox = document.getElementById('secondary');
const commentsCheckBox = document.getElementById('comments');
const endCheckBox = document.getElementById('end');
const guideCheckBox = document.getElementById('guide');
const middleCheckBox = document.getElementById('middle');
const centerCheckBox = document.getElementById('center');
const optionsCheckBox = document.getElementById('start');
const checkBoxes = Array.from(document.querySelectorAll('input'));
let isToggled = false;
let settings = {
    isToggled,
    elements: {
	secondary: reccomendationsCheckBox.checked,
	middle: middleCheckBox.checked,
	start: optionsCheckBox.checked,
	guide: optionsCheckBox.checked,
	end: endCheckBox.checked,
	comments: commentsCheckBox.checked,
	related: reccomendationsCheckBox.checked,
	center: centerCheckBox.checked,
    left_sidebar: optionsCheckBox.checked,
    contents: reccomendationsCheckBox.checked,
    primary: reccomendationsCheckBox.checked
    }
}

buttonToggle.addEventListener('click', () => browser.tabs.query({active:true,currentWindow:true},toggleExtension));
reccomendationsCheckBox.addEventListener('click', () => browser.tabs.query({active:true,currentWindow:true}, (tabs) => toggleElement('reccomendations', tabs)));
commentsCheckBox.addEventListener('click', () => browser.tabs.query({active:true,currentWindow:true}, (tabs) => toggleElement('comments', tabs)));
endCheckBox.addEventListener('click', () => browser.tabs.query({active:true,currentWindow:true}, (tabs) => toggleElement('end', tabs)));
guideCheckBox.addEventListener('click', () => browser.tabs.query({active:true,currentWindow:true}, (tabs) => toggleElement('guide', tabs)));
middleCheckBox.addEventListener('click', () => browser.tabs.query({active:true,currentWindow:true}, (tabs) => toggleElement('middle', tabs)));
centerCheckBox.addEventListener('click', () => browser.tabs.query({active:true,currentWindow:true}, (tabs) => toggleElement('center', tabs)));
optionsCheckBox.addEventListener('click', () => browser.tabs.query({active:true,currentWindow:true}, (tabs) => toggleElement('start', tabs)));

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
        secondary: reccomendationsCheckBox.checked,
        middle: middleCheckBox.checked,
        start: optionsCheckBox.checked,
    	guide: optionsCheckBox.checked,
        end: endCheckBox.checked,
        comments: commentsCheckBox.checked,
        related: reccomendationsCheckBox.checked,
        center: centerCheckBox.checked,
        left_sidebar: optionsCheckBox.checked,
        contents: reccomendationsCheckBox.checked,
        primary: reccomendationsCheckBox.checked
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
