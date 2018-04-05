exports.run = (client, message, args) => {
			message.channel.send("Inverting...")
			download.image({
				url: lastimage,
				dest: 'images'
			}).then(({
				filename,
				image
			}) => {
				console.log('File saved to', filename)

				//Modify Image
				Jimp.read(filename, function modify(err,please){
					if(err) throw err;
					please.resize(Jimp.AUTO, 500)
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
}
