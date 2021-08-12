const clientconfig = require("../clientconfig.json")
const Discord = require("discord.js")
const fs = require("fs")
const date = require("date-and-time")

module.exports.run = async (client, message, args) => {

  console.log(`# Command used: ${clientconfig.prefix}arcadiaprefix || In ${message.guild.name}`);


  const prefix=client.GuildPrefix[message.guild.id].prefix

  if(!message.guild) {
    return message.channle.send(`Please use this command in a server`)
  }

    if (message.author.id!='310180297939353600' && message.author.id!=client.GuildPrefix[message.guild.id].owner) {
       return message.channel.send('This command is only for the one designated as Arcadia Server owner (defaults as server owner)')
    }


    if(args[0]) {
      client.GuildPrefix[message.guild.id].prefix=args[0]
      return message.channel.send('Server prefix has been set to: '+args[0])
    }
    else {
      return message.channel.send(`Please format as:\n> ${prefix}arcadiaprefix __newprefix__`)
    }


}

module.exports.help = {
  name: "arcadiaprefix",
  usage: `arcadiaprefix`,
  desc: "Changes my server prefix",
  public: true
}
