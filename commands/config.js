
const clientconfig = require("../clientconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const date = require("date-and-time");

module.exports.run = async (client, message, args) => {

  console.log(`# Command used: ${clientconfig.prefix}config || In ${message.guild.name}`);

  if(!message.guild) {
    return message.channle.send(`Please use this command in a server`)
  }

  //  if (!message.member.hasPermission("ADMINISTRATOR")) {
       //return message.channel.send('This command is only for those with the permission [ Administrator ]')
       if(message.author.id!=client.GuildPrefix[message.guild.id].owner) {
         return message.channel.send('This command is only available to the server owner')

    }

const prefix=client.GuildPrefix[message.guild.id].prefix

const valid_games=client.GameNames.valid_games_help_format
let main=client.GuildPrefix[message.guild.id].main
let valid_formatted=''
for(entry in valid_games) {
  valid_formatted+=`-${valid_games[entry]}\n`
  /*
  if(valid_games[entry]==`Granblue Fantasy`) {
    valid_formatted+=`-GBF (${valid_games[entry]})\n`
  }
  else if(valid_games[entry]=='Azur Lane') {
    valid_formatted+=`-AL (${valid_games[entry]})\n`
  }
  else {
  valid_formatted+=`-${valid_games[entry]}\n`
}
*/
}



    if(!args[0]) {
        return message.channel.send(`To pull up your server's current configuration, please do:\n> ${client.GuildPrefix[message.guild.id].prefix}config display\n\nTo change your server's __MainGame__, please do:>\n> ${client.GuildPrefix[message.guild.id].prefix}config main __GAME__\nEx:\n> ${client.GuildPrefix[message.guild.id].prefix}config main fgo\n\nTo set channel-specific overrides, please consult:\n> ${client.GuildPrefix[message.guild.id].prefix}channel`)
    }
    if(args[0].toLowerCase()=='display') {

      let list=[];
      let list_vals=[];
      let file = JSON.parse(fs.readFileSync("./GuildPrefix.json"));
        Object.entries(file[message.guild.id].channel_overrides).forEach(([key, value]) => {
          list.push(key)
          list_vals.push(value)
        });
        let formatted=''


        var final_game_format=''
        let actual_val=''
        let adding=[];

        let form_final=client.GameNames.valid_games_help_format
        let looping_list=client.GameNames.valid_games_LC
        for(entry in list_vals) {
          //console.log(`comparing: ${list_vals[entry]} to: ${looping_list[entry]}`)
          if(client.IAmLazyFormatNames[list_vals[entry]]) {
            adding.push(client.IAmLazyFormatNames[list_vals[entry]]);
          }
        }



        for(i=0;i<list.length;i++) {
          formatted+=`> <#${list[i]}>: ${adding[i]}\n`
        }
        //var main=client.GuildPrefix[message.guild.id].main

        if(main=='') {
          main=`> Set up using ${prefix}config main`

        }
        else {
          main=`> ${main}`
        }
        if(formatted=='') {
          formatted=`> Set up using ${prefix}channel`
        }

      return message.channel.send(`__Current configuration for [ ${client.GuildPrefix[message.guild.id].name} ]__\n\nMain Game:\n${main}\n\nChannel overrides:\n${formatted}`)
    }

    else if(args[0].toLowerCase()=='main') {
      if(!args[1]) {

        return message.channel.send(`-This will change your server's __MainGame__\n-A __MainGame__ allows for commands like ${prefix}profile and ${prefix}image to default to the designated __MainGame__\n(Unless channel overrides are specified with ${client.GuildPrefix[message.guild.id].prefix}channel)\n\nValid selections are:\n${valid_formatted}\nTo change your server's __MainGame__, please do:\n> ${prefix}config main __GAME__`)
      }
      if(!client.GameNames.valid_games_LC.includes(args[1].toLowerCase()) && !client.GameNames.valid_games.includes(args[1].toLowerCase())) {
        return message.channel.send(`-Game: [ ${args[1] } ] not recognized\n\nValid selections are:\n${valid_formatted}\nTo change your server's __MainGame__, please do:\n> ${prefix}config main GameName`)

      }

      var actual_val='' ;
      let looping_list=client.GameNames.valid_games_LC
      let full_name_list=client.GameNames.valid_games
      //console.log(`MAIN IS: ${main}`)
      main=args[1].toLowerCase()
      for(entry in looping_list) {
        if (main==looping_list[entry] || main==full_name_list[entry]) {
          actual_val=looping_list[entry]
        }
      }

      if(client.IAmLazyFormatNames[actual_val]) {
        var disp_val=client.IAmLazyFormatNames[actual_val]
      }
      client.GuildPrefix[message.guild.id].main=actual_val
      return message.channel.send(`-__MainGame__ has been set to: __${disp_val}__\n\nTo see what a __MainGame__ means for your server, consult:\n> ${client.GuildPrefix[message.guild.id].prefix}config main\n\n(Note that I update once a minute, so please allow me some time to update)`)
    }

    else {
      return message.channel.send(`Valid uses of this command are:\n> ${prefix}config\n> ${prefix}config display\n> ${prefix}config main`)
    }




}

module.exports.help = {
  name: "config",
  usage: `config`,
  desc: "Pull up your server's Gacha Game configurations",
  public: true

}
