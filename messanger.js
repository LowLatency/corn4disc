const {ipcRenderer} = require('electron');

ipcRenderer.on('discord-message', (event, message) => {
    document.getElementById("message").innerText = message;
})