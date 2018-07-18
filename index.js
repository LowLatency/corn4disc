const { app, BrowserWindow } = require('electron');
const Discord = require('discord.js');
const { token } = require('./secrets.js');
const { ipcMain } = require('electron');
const path = require('path');
const Ogg = require("./Ogg.js");

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({width: 1000, height: 800});
    
    // and load the index.html of the app.
    win.loadFile(path.resolve('index.html')); //debugger problems woo
    win.webContents.openDevTools();
    
    return win;
}


function main()
{
    let win = createWindow();
    const client = new Discord.Client();
    let opusCombiner = new Ogg(2);
    
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    
        let ourchannel = client.channels.find('name', 'bruh');
        
        ourchannel
            .join()
            .then(connection => {
                console.log("joined yo");
                
                const receiver = connection.createReceiver();
                receiver.on('opus', (user, buffer) => {
                    opusCombiner.decode(buffer);
                })
            });
    });
    
    client.login(token);
    
    client.on('message', msg => {
        // msg.member.voiceChannel.join()
        //   .then(connection => {
        //     msg.reply("Joined channel!");
        //   })
        win.webContents.send('discord-message', msg.content);
    });
    
    opusCombiner.on('data', data => {
        win.webContents.send('discord-sound', new Uint8Array(data));
    });
    
    win.on('closed', () => {
        client.destroy();
    });
}

app.on('ready', main);