exports.run = (client, member) => {
  const defaultChannel = member.guild.channels.find(chan => chan.permissionsFor(guild.me).has("SEND_MESSAGES"));
  defaultChannel.send(`Welcome. Welcome to the server, ${member.user}`).catch(console.error);
}