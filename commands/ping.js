/*
//End Timer and Record Duration
var end = function(){
	endTime = new Date();
	var timeDiff = endTime - startTime;
	message.channel.send("Pong! `" + timeDiff + " ms`")
}*/

exports.run = (client, message, args, lastimage) => {
	message.reply("Pong!").catch(console.error);
}
