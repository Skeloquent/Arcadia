
const clientconfig = require("../clientconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const date = require("date-and-time");
module.exports.run = async (client, message, args) => {

  console.log(`# Command used: ${clientconfig.prefix}invite || In ${message.guild.name}`);


return message.channel.send('Here is my invite link\nhttps://top.gg/bot/739228525135003748')


}

module.exports.help = {
  name: "invite",
  usage: `invite`,
  desc: "Sends my bot invite link",
  public: true

}
