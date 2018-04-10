exports.run = (client) => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity(`Mr. Friend is helping ${client.guilds.size} servers!`)
};