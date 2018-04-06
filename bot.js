const Discord = require("discord.js")
const download = require('image-downloader')
const fs = require("fs");
const client = new Discord.Client
const config = require("./config.json")
var dispatcher = null
var startTime, endTime

 fs.readdir("./events/", (err, files) => {
   if (err) return console.error(err);
   files.forEach(file => {
         let eventFunction = require(`./events/${file}`);
             let eventName = file.split(".")[0];
                     client.on(eventName, (...args) => eventFunction.run(client, ...args));
                       });
 });

client.on('message', message => {
	command(message);
	start();
	console.log(message.author.username + " (" + message.author.tag + "), said \"" + message.content + "\" on #" + message.channel.name)
});

//Start Timer
var start = function(){
	startTime = new Date();
}


var command = function(message){

if (message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) return;


//Seperate each word in an array
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

try{
	let commandFile = require(`./commands/${command}.js`);
	commandFile.run(client, message, args);
} catch (err) {
	console.error(err);
}

}
client.login(config.token);
