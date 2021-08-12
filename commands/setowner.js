

const clientconfig = require("../clientconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const date = require("date-and-time");

module.exports.run = async (client, message, args) => {

  console.log(`# Command used: ${clientconfig.prefix}setowner || In ${message.guild.id}`);

  if(message.author.id=='650917006375124993') {
    return
  }
  if(message.author.id!='310180297939353600') {
    let prefix=client.GuildPrefix[message.guild.id].prefix
    return message.channel.send(`Only my creator can change this. Please do ${prefix}home to locate them.`)
  }
  else {
    if(!args[0]) {
      return message.channel.send('Format as:\n$setowner __GuildID__  __NewOwnerID__')
    }
    client.GuildPrefix[args[0]].owner=args[1]
    return message.channel.send('Sheba Bot Owner for [ '+client.GuildPrefix[args[0]].name+' ] has been set to <@'+args[1]+'>')
  }

}

module.exports.help = {
  name: "setowner",
  usage: `${clientconfig.prefix}setowner`,
  desc: "Sets owner of a server",
  public: false

}
