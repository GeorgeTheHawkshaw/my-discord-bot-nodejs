exports.run = async (client, message, args, lastimage) => {
	const counts = parseInt(args[0],10)

  if(!counts || counts < 2 || counts > 100){
    return message.reply("Hey! Uhhhhh could you enter a number between 2 and 100 for me to delete?")
  }

  const fetchEm = await message.channel.fetchMessages({count: counts});
  message.channel.bulkDelete(fetchEm)
.catch(error => message.reply(`Oh Fiddlesticks! I wasn't able to delete the message because: ${error}`));
}
