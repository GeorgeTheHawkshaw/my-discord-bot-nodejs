const colors = require("colors")

exports.run = (client, guild) => {
  console.log("Mr. Friend joined the " + colors.blue.underline(guild.name) + " server with " + colors.yellow(guild.memberCount) + " members");
  client.user.setGame(`Mr. Friend is helping ${client.guilds.size} servers!`)
}