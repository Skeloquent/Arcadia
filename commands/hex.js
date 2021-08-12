
const clientconfig = require("../clientconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const date = require("date-and-time");

module.exports.run = async (client, message, args) => {

  console.log(`# Command used: ${client.clientconfig.prefix}hex || In ${message.guild.name}`);


  if(message.author.id=='739228525135003748') {
    return
  }



if(!message.guild) {
  return
}


if(!args[0]) {
  return message.channel.send(`Please provide a hex for a color to apply across the embed for all your profiles\nEx:\n\n${client.GuildPrefix[message.guild.id].prefix}hex d67834`)
}
if(!client.hex[message.author.id]) {
client.hex[message.author.id]={}
}
client.hex[message.author.id].hex=`#${args[0]}`
try {
return message.react('✅')
}
catch(err) {
return message.channel.send(`I react with ✅ to confirm data has been updated, please turn my react permissions ON`)
}




}

module.exports.help = {
  name: "hex",
  usage: `hex`,
  desc: "Set embed color",
  public: true

}
