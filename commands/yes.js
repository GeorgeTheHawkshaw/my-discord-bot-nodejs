const download = require('image-downloader')
const Jimp = require("jimp")
const Discord = require("discord.js")
export.run(client, message, args, lastimage) => {
	message.channel.send("yes.")
	message.channel.startTyping();
	download.image({
		url: lastimage,
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
			var embed = new Discord.RichEmbed().attachFile(filename).setDescription("YES.");
			message.channel.send({
				embed
			})
			message.channel.stopTyping();
		}
			setTimeout(wait, 1500)
		}).catch((err) => {
			throw err
		})
	}
