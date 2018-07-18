const {ipcRenderer} = require('electron');

var theGoodsElement = document.getElementById("thegoods");
var audioContext = new AudioContext();


var soundSource;
var ajaxRequest = new XMLHttpRequest();
ajaxRequest.open('GET', 'https://mdn.github.io/voice-change-o-matic/audio/concert-crowd.ogg', true);
ajaxRequest.responseType = 'arraybuffer';
ajaxRequest.onload = function() {
    var audioData = ajaxRequest.response;
  
    audioContext.decodeAudioData(audioData, function(buffer) {
        soundSource = audioContext.createBufferSource();
        soundSource.buffer = buffer;
    }, function(e){ console.log("Error with decoding audio data" + e.err);});
};

ajaxRequest.send();

function playsound()
{
    if (!soundSource) return;
    
    soundSource.connect(audioContext.destination);
    soundSource.start();
}

ipcRenderer.on('discord-sound', (event, soundPayload) => {
    
    audioContext.decodeAudioData(soundPayload.buffer, function(buffer) {
     
        let voiceData = audioContext.createBufferSource();
        voiceData.buffer = buffer;
     
        voiceData.connect(audioContext.destination);
        voiceData.start();
     
    }, function(e){
        console.log("Error with decoding audio data" + e.err);
     
    });
});
