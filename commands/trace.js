const download = require('image-downloader')
const Jimp = require("jimp")
const Discord = require("discord.js")
exports.run = (client, message, args, lastimage) => {
	message.channel.startTyping();
	download.image({
		url: lastimage,
		dest: 'images'
	}).then(({
		filename,
		image
	}) => {
		console.log('File saved to ' + filename)
		Jimp.read(filename, function emboss(err, image){
			if (err) throw err;
			image.resize(Jimp.AUTO, 500)
			image.convolute([
				[0,0,0],
				[-1,1,0],
				[0,0,0]
			]);
			image.write(filename);
		});

		function wait(){
			var embed = new Discord.RichEmbed().attachFile(filename).setDescription("Tada!");
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
