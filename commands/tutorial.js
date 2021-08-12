
const clientconfig = require("../clientconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const date = require("date-and-time");
module.exports.run = async (client, message, args) => {

  console.log(`# Command used: ${clientconfig.prefix}tutorial || In ${message.guild.name}`);


  let msg=''
  const prefix=client.GuildPrefix[message.guild.id].prefix
  msg+=` <a:PinkSparkles:739403401338552320> To setup a profile with me, you need to upload the following:  <a:PinkSparkles:739403401338552320>\n\nIn-game name:\n> ${prefix}name Arcadia\n\nID Number:\n> ${prefix}id 4001\n\nPicture of your support list:\n> ${prefix}image (+upload an image in the same message)\n\n**(Optional)** An image to flex on your friends:\n> ${prefix}flex (+upload an image in the same message)\n\n\n**Note: to pull up/upload to games not set as the default in the current channel (${prefix}channel), for example:**\n> ${prefix}name FGO Grails4Sheba\n> ${prefix}name arknights CeylonBestOP\n> ${prefix}id sinoalice 4001\n\n\n*-A full list of my supported games can be found using:*\n> ${prefix}help\n*-For questions or concerns, as well as a full step-by-step visual guide on how to use me, please do:*\n> ${prefix}home`

  return message.channel.send(msg)

}

module.exports.help = {
  name: "tutorial",
    usage: `tutorial`,
  desc: "**__Sends a tutorial__**",
  public: true

}
