exports.run = async (client, message, args, lastimage) => {
	var m = message;
	var msg = await message.channel.send("Pong!")
	//console.log(msg);
	var pingTime = msg.createdTimestamp - m.createdTimestamp
	var clientTime = Math.round(client.ws.ping)
	msg.edit("Pong! `" + pingTime + "ms` -- API Ping `" + clientTime + "ms`");
}
