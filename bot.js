const Discord = require("discord.js")
const download = require('image-downloader')
const fs = require("fs");
const Jimp = require("jimp")
const client = new Discord.Client
var dispatcher = null

var lastimage = ""

client.on('ready', () => {
	console.log('Logged in as ${client.user.tag}!')
	client.user.setGame("!help")
});

client.on('message', message => {
	command(message);
	console.log(msg.author.username + " (" + message.author.tag + "), said \"" + message.content + "\" on #" + message.channel.name)
});

var command = function(message){
	//Save Uploaded Images to Drive
	var images = message.attachments.array();
	for (var i = 0; i <images.length; i++){
		console.log(images[i].url)
		lastimage = images[i].url;
	}
}
client.login('insert token here');
