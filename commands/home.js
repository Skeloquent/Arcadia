

const clientconfig = require("../clientconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const date = require("date-and-time");
module.exports.run = async (client, message, args) => {

  console.log(`# Command used: ${clientconfig.prefix}home || In ${message.guild.name}`);



return message.channel.send('Here is the invite link to my home!\nhttps://discord.gg/k2r9BQh')

  // --- END CUSTOM CODE HERE ---

}

module.exports.help = {
  name: "home",
  usage: `home`,
  desc: "Sends the link to my home server",
  public: true

}
