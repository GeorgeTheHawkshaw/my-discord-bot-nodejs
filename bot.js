const Discord = require("discord.js")
const download = require('image-downloader')
const fs = require("fs");
const Jimp = require("jimp")
const client = new Discord.Client
const config = require("./config.json")
var dispatcher = null
var startTime, endTime
var lastimage = ""

fs.readdir("./events/", (err, files) => {
	if(err) return console.error(err);
	files.forEach(file =? {
		let eventFunction = require("./events/${file}");
		let eventName = file.split(".")[0];
		client.on(eventName, (...args) =? eventFunction.run(client, ...args));
	});
});

client.on('ready', () => {
	console.log('Logged in as ${client.user.tag}!')
	client.user.setGame("!help")
});

client.on('message', message => {
	command(message);
	start();
	console.log(msg.author.username + " (" + message.author.tag + "), said \"" + message.content + "\" on #" + message.channel.name)
});

//Start Timer
var start = function(){
	startTime = new Date();
}

//End Timer and Record Duration
var end = function(){
	endTime = new Date();
	var timeDiff = endTime - startTime;
	message.channel.send("Pong! `" + timeDiff + " ms`")
}

var command = function(message){

if (message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) return;

	//Save Uploaded Images to Drive
	var images = message.attachments.array();
	for (var i = 0; i <images.length; i++){
		console.log(images[i].url)
		lastimage = images[i].url;
	}

//Seperate each word in an array
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

try{
	let commandFile = require("./commands/${command}.js");
	commandFile.run(client, message, args);
} catch (err) {
	console.error(err);
}

/*
//Main Switch Case
	switch(command){
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
		case "ping":
			end();
			break;
		default:
			message.reply("What's Up?")
			break;
	}*/
}
client.login(config.token);
