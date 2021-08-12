
const clientconfig = require("../clientconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const date = require("date-and-time");

module.exports.run = async (client, message, args) => {

  console.log(`# Command used: ${client.clientconfig.prefix}clear || In ${message.guild.name}`);


  if(message.author.id=='739228525135003748') {
    return
  }




if(!message.guild) {
  return
}

const prefix=client.GuildPrefix[message.guild.id].prefix

var game='';


//Server MainGame start
game=client.GuildPrefix[message.guild.id].main
//Server MainGame end


//Server Channel Override start
let file = JSON.parse(fs.readFileSync("./GuildPrefix.json"));

let channels=[];
let game_list=[];

Object.entries(file[message.guild.id].channel_overrides).forEach(([key, value]) => {
  channels.push(key)
  game_list.push(value)
});

for(i=0;i<channels.length;i++) {
  //console.log(`Channel: ${message.channel.id}, comp: ${channels[i]}`)

  if(channels[i]==message.channel.id) {
    game=game_list[i]
  }
}

//Server Channel Override end


//Args[0] start
if(args[0]) {
if(client.GameNames.valid_games_LC.includes(args[0].toLowerCase())) {
  game=args[0].toLowerCase()
}
else if(args[0].toLowerCase()=='fate') {
  game='fgo'
}
else if(args[0].toLowerCase()=='fatejp') {
  game='fgojp'
}
else if(args[0].toLowerCase()=='arknights') {
  game='ak'
}
else if(args[0].toLowerCase()=='sinoalice') {
  game='sin'
}
else if(args[0].toLowerCase()=='granblue') {
  game='gbf'
}
else if(args[0].toLowerCase()=='azurlane') {
  game='al'
}
else if(args[0].toLowerCase()=='fireemblem' || args[0].toLowerCase()=='fe') {
  game='feh'
}
}

else{
  return message.channel.send(`Please provide a game for me to delete data for`)
}
//Args[0] end

if(game=="") {
  return message.channel.send(`No game selected. Please provide a valid game for me to delete your data for.\n\n(Consult ${prefix}help for the full list)`)
}

let game_call=client.GameNames[game];
//Args[0] end



var player=message.author.id

let name=''


  if(!client.Users[game][player]) {
  return message.channel.send(`You do not have a profile setup with me, ${game_call}\n\nTo setup a profile, please do:\n> ${prefix}tutorial`)
}
else {
  delete client.Users[game][player]
    message.react('✅')
    return message.channel.send(`Profile deleted ${game_call}, I wish you all the best`)
  }



}

module.exports.help = {
  name: "clear",
  usage: `clear <GAME>`,
  desc: "Clears your data for the specified game",
  public: false

}
