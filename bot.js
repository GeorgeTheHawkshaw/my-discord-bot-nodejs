const Discord = require("discord.js")
const music = require("discord.js-musicbot-addon")
const download = require('image-downloader')
const fs = require("fs");
const client = new Discord.Client
const config = require("./config.json")
const colors = require("colors")
const ytdl = require('ytdl-core');
var dispatcher = null
var startTime, endTime
var lastimage = ""
var imageMap = new Map();



fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});


client.on('message', async message => {
  command(message);
  console.log(colors.green.underline(message.author.tag))
  console.log(colors.yellow.bold("\"" + message.content + "\"") + " on #" + message.channel.name + "\n")
});



var command = function(message) {
  //In order to operate the correct images and send them to the correct channels,
  //I need to be able to add urls into a data structure that contains both the urls
  //and an ID of the channel the image was sent.
  
  //map = (key,value)
  
  /*
  let key = message.channel.id;
  imageMap.set(key,message.attachments.url);
  
  if(imageMap.has(key)){
	  console.log("Image added to the map!");
  }*/
  
  var images = message.attachments.array();
  for (var i = 0; i < images.length; i++) {
	console.log("images array length: ");
	console.log(images.length);
	console.log("User uploaded an image ");
    console.log(images[i].url)
    lastimage = images[i].url;
  }
  

  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;


  //Seperate each word in an array
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    let commandFile = require(`./commands/${command}.js`);
    
	commandFile.run(client, message, args, lastimage); 
	
	//lastImage instead should be the array of urls/ids | The command functions will filter which images to download
	//commandFile.run(client, message, args, imageMap);
  } catch (err) {
    console.error(err);
  }

}
client.login(config.token);
