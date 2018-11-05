const Discord = require("discord.js")
const ytdl = require('ytdl-core');


exports.run = (client, message, args, lastimage) => {
	
	console.log(args[0]);
	var channel = message.member.voiceChannel;



	
	if(channel){
		const streamOptions = { seek: 0, volume: 1 };
		//let info = ytdl.getInfo(args[0]);
		//let stream = ytdl.downloadFromInfo(info, {filter: 'audioonly'})
		var dispatcher = null;
		channel.join()
  		.then(connection => {
    		const stream = ytdl(args[0], { filter : 'audioonly' });
    		dispatcher = connection.playStream(stream, streamOptions);
		console.log(dispatcher);
		dispatcher.on("end", end => {
                console.log("left channel");
                channel.leave();
            		});

		dispatcher.on("error", error => {
      			console.error(error);
      			message.channel.send("Error Occurred during playback. Try again later.");
    			});
  		})
  	.catch(console.error);
	
	}
}
