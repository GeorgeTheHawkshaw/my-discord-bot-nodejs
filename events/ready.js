exports.run = (client) => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity(`Mr. Friend is ready to be your friend!`)
};
