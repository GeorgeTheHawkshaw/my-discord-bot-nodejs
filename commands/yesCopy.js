const download = require('image-downloader')
const Jimp = require("jimp")
const Discord = require("discord.js")
const colors = require("colors")
exports.run = (client, message, args, imageMap) => {
	message.channel.send("yes.")
	message.channel.startTyping();
	if(imageMap.has(message.channel.id)){
		download.image({
		//url: lastimage,
		url: imageMap.get(message.channel.id),
		dest: 'images'
	}).then(({
		filename,
		image
	}) => {
		console.log(colors.red('File saved to ') + colors.cyan.underline( filename))
		var images = [filename, 'images/pointing-guy.jpg']
		var jimps = []
		for(var i = 0; i < images.length; i++){
			jimps.push(Jimp.read(images[i]));
		}
		Promise.all(jimps).then(function(data){
			return Promise.all(jimps)
		}).then(function(data){
			data[0].resize(Jimp.AUTO, 380)
			data[1].composite(data[0], (data[1].bitmap.width - data[0].bitmap.width) / 2 , 20);
			data[1].write(filename);
		})

		function wait(){
			//var embed = new Discord.RichEmbed().attachFile(filename).setDescription("YES.");
			//message.channel.send({embed})
			message.channel.send({files: [filename]});
			message.channel.stopTyping();
		}
			setTimeout(wait, 10500) //change back to 1500 later
		}).catch((err) => {
			throw err
		})
	}
	}
