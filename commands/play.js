const Discord = require("discord.js")
const ytdl = require('ytdl-core');


exports.run = (client, message, args, lastimage) => {
	
	console.log(args[0]);
	var channel = message.member.voiceChannel;



	
	if(channel){

		const streamOptions = { seek: 0, volume: 1 };

		var dispatcher = null;
		channel.join()
  		.then(connection => {
		ytdl.getInfo(args[0], function(err, info){
			var title = info.title;
    		const stream = ytdl(args[0], { filter : 'audioonly' });
    		dispatcher = connection.playStream(stream, streamOptions);
		message.channel.send("Playing **" + title + "**, requested by **" + message.member + "**");
		//console.log(dispatcher);

		dispatcher.on("end", end => {
                console.log("left channel");
                channel.leave();
            		});

		dispatcher.on("error", error => {
      			console.error(error);
      			message.channel.send("Error Occurred during playback. Try again later.");
    			});
			
			});
  		})
  	.catch(console.error);
	
	}
}
