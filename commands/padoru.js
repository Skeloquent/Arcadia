
const clientconfig = require("../clientconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const date = require("date-and-time");
module.exports.run = async (client, message, args) => {

  console.log(`~ ~ ~ # Command used: ${clientconfig.prefix}padoru || In ${client.GuildPrefix[message.guild.id].name}`);

return
  try {
    message.author.send('https://discord.gg/E2cRc8xcY2')
  }
  catch(err){
    console.log(err)
    message.channel.send(`I am unable to send you a DM; if you are interested, please enable DMs for the server invite`)
  }

  return message.channel.send(`Happy Holidays <a:padoru:782200503139696680>`)



}

module.exports.help = {
  name: "padoru",
  usage: `${clientconfig.prefix}padoru`,
  desc: "Sets owner of a server",
  public: false

}
