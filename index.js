const { app, BrowserWindow } = require('electron');
const Discord = require('discord.js');
const { token } = require('./secrets.js');
const {ipcMain} = require('electron');

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({width: 800, height: 600})
    
    // and load the index.html of the app.
    win.loadFile('index.html');
    win.webContents.openDevTools();
    
    return win;
}

function main()
{
    let win = createWindow();
    const client = new Discord.Client();
    
    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });
    
    client.login(token);
    
    client.on('message', msg => {
 
      win.webContents.send('discord-message', msg.content);
      
    });
    
    win.on('closed', () => {
        client.destroy();
    });
}

app.on('ready', main);