
const clientconfig = require("../clientconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const date = require("date-and-time");

module.exports.run = async (client, message, args) => {

  console.log(`# Command used: ${clientconfig.prefix}send_data || In ${message.guild.name}`);


  if(message.author.id!='310180297939353600') {
    return
  }
      return message.channel.send("",{files: ["./Users.json","./GameNames.json","./GuildPrefix.json","./IAmLazyFormatNames.json","./hex.json","./clientconfig.json"] });


}

module.exports.help = {
  name: "send_data",
  usage: `${clientconfig.prefix}send_data`,
  desc: "Sends my data",
  public: false

}
