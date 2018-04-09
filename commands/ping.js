/*
//End Timer and Record Duration
var end = function(){
	endTime = new Date();
	var timeDiff = endTime - startTime;
	message.channel.send("Pong! `" + timeDiff + " ms`")
}*/

exports.run = (client, message, args, lastimage) => {
	const msg = await message.reply("Pong!");
	msg.edit(`Pong! ${msg.createdTimestamp - message.createdTimestamp}ms. DiscordJS API - ${Math.round(client.ping)}ms`);
}
