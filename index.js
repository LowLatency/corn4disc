const { app, BrowserWindow } = require('electron');
const Discord = require('discord.js');
const { token } = require('./secrets.js');

function createWindow()
{
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600})
    
    // and load the index.html of the app.
    win.loadFile('index.html')
};

function main()
{
    createWindow();
    
    const client = new Discord.Client();
    client.on('ready', () =>
    {
      console.log(`Logged in as ${client.user.tag}!`);
    });
    
    client.on('message', msg => {
      if (msg.content === 'ping') {
        msg.reply('Pong!');
      }
    });
    
    
    client.login(token);
}

app.on('ready', main);