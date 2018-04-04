const Discord = require("discord.js")
const download = require('image-downloader')
const fs = require("fs");
const Jimp = require("jimp")
const client = new Discord.Client
const config = require("./config.json")
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

//Seperate each word in an array
if (message.content.charAt(0) != config.prefix) return;
	message.content = message.content.substring(1,message.content.length);
	var args = message.content.split(" ");
	var cmd = args[0];
	var otherWordsThatArentTheFirst = ""
	for (var i = 1; i < args.length; i++){
		otherWordsThatArentTheFirst = otherWordsThatArentTheFirst + args[i] + " ";
	}
	var otherWordsOfficial = otherWordsThatArentTheFirst;
	console.log(args);

//Main Switch Case
	switch(cmd){
		case "invert":
			message.channel.send("Inverting...")
			download.image({
				irl: lastimage,
				dest: 'images'
			}).then(({
				filename,
				image
			}) => {
				console.log('File saved to', filename)

				//Modify Image
				Jimp.read(filename, function modify(err,please){
					if(err) throw err;
					please.resize(Jimp.AUTHO, 500)
					.invert()
					.write(filename); //save
				});

				function waitaBit(){
					var embed = new Discord.RichEmbed().attachFile(filename).setDescription("Inverted bois")
					message.channel.send({
						embed
					})
				}
				setTimeout(waitaBit, 1500)

			}).catch((err) => {
				throw err
			})
			break;
		default:
			message.reply("What's Up?")
			break;
	}
}
client.login(config.token);
