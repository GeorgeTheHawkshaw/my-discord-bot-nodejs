const download = require('image-downloader')
const Jimp = require("jimp")
const Discord = require("discord.js")
exports.run = (client, message, args, lastimage) => {

  message.channel.send("Jpegifying...")
  download.image({
    url: lastimage,
    dest: 'images'
  }).then(({
    filename,
    image
  }) => {
    console.log('File saved to', filename)

    //Modify Image
    Jimp.read(filename, function modify(err, please) {
      if (err) throw err;
      please.resize(Jimp.AUTO, 500)
        .quality(1)
        .quality(1)
        .dither565()
        .write(filename); //save
    });

    function waitaBit() {
      var embed = new Discord.RichEmbed().attachFile(filename).setDescription("Inverted bois")
      message.channel.send({
        embed
      })
    }
    setTimeout(waitaBit, 1500)

  }).catch((err) => {
    throw err
  })
}