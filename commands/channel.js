

const clientconfig = require("../clientconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const date = require("date-and-time");


//Pretend I actually fixed this after the upgrade to Discord.js v12 to allow for Admins and not just server owner
module.exports.run = async (client, message, args) => {

  console.log(`# Command used: ${clientconfig.prefix}channel || In ${message.guild.name}`);


  if(!message.guild) {
    return
  }

    //if (!message.member.hasPermission("ADMINISTRATOR")) {
    if(message.author.id!=client.GuildPrefix[message.guild.id].owner) {
      return message.channel.send('This command is only available to the server owner')

      // return message.channel.send('This command is only for those with the permission [ Administrator ]')
    }

    const prefix= client.GuildPrefix[message.guild.id].prefix
    const valid_games_help=client.GameNames.valid_games_help_format
    const valid_games=client.GameNames.valid_games
    const valid_games_LC=client.GameNames.valid_games_LC
    let match=''
    let disp_game=''

    if(!args[0]) {
        return message.channel.send(`-This command creates channel overrides for specific channels.\n\nThe format for this is:\n> ${prefix}channel channel-name game\n\**Note the spaces*\n\nFor example:\n> ${prefix}channel arknights-general Arknights\n-Will allow __${prefix}profile__ to default to __${prefix}profile Arknights__ in __Arknights-general__ instead of your server's __MainGame__\n\nYour server's __MainGame__ is accessable by doing:\n> ${prefix}config display\n\n(Please use ${prefix}home if you have any questions)`)
    }
    if(args[0].toLowerCase()=='display') {
      return message.channel.send(`__Current configuration for [ ${client.GuildPrefix[message.guild.id].name} ]__\n\nMain Game:\n> ${client.GuildPrefix[message.guild.id].main}\n\nChannel overrides:\n> <#739234341883871402>: Arknights`)
    }

    if(!args[1]) {
      let valid_formatted=''
      for(entry in valid_games_help) {
        valid_formatted+=`-${valid_games_help[entry]}\n`
      }
      return message.channel.send(`Please enter a game to set as the channel default. Ex:\n> ${prefix}channel channel-name fgo\n\nValid games are:\n${valid_formatted}`)
      }



    if(!valid_games_LC.includes(args[1].toLowerCase()) && !valid_games.includes(args[1].toLowerCase())) {
      let valid_formatted=''
      for(entry in valid_games_help) {
        valid_formatted+=`-${valid_games_help[entry]}\n`
      }
      return message.channel.send(`The game [ ${args[1]} ] is not a game I know\n\nValid games are:\n${valid_formatted}`)
    }

    let guild=message.guild
    let yes=guild.channels.cache.find(channel => channel.name === args[0])
try {
  client.GuildPrefix[message.guild.id].channel_overrides[yes.id]=args[1].toLowerCase()
  for(i=0;i<valid_games.length;i++) {
    if(valid_games[i].toLowerCase()==args[1].toLowerCase() || valid_games_LC[i].toLowerCase()==args[1].toLowerCase()) {
      disp_game=valid_games_help[i];
      match=valid_games_LC[i];
    }
  }
  client.GuildPrefix[message.guild.id].channel_overrides[yes.id]=match;
  return message.channel.send(`<#${yes.id}> has been given an override for the game: __${disp_game}__\n\n*(Note that I update once a minute, so please give me time to update)*`)
}
catch(err) {
  return message.channel.send(`A channel with the name [ ${args[0]} ] could not be located\nMake sure everything is lowercase with the appropriate hypenation`)
}
    //client.channels.find("name","welcome").send("Welcome!")



}

module.exports.help = {
  name: "channel",
  usage: `channel`,
  desc: "Overrides the main game preset for specific channels",
  public: true

}
