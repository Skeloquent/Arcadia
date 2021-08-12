
const clientconfig = require("../clientconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const date = require("date-and-time");

module.exports.run = async (client, message, args) => {

  console.log(`# Command used: ${client.clientconfig.prefix}name || In ${message.guild.name}`);


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
else if(args[0] && (args[0].toLowerCase()=='pri' || args[0].toLowerCase()=='priconne')) {
  game='pri'
}
}
//Args[0] end

if(game=="") {
  return message.channel.send(`No game selected/ No channel overrides found\n\nHave an Admin set a default game for the server using:\n> ${prefix}config`)
}

let game_call=client.GameNames[game];
//Args[0] end



var player=message.author.id

let name=''
if(args[0] && (client.GameNames.valid_games_LC.includes(args[0].toLowerCase()) || client.GameNames.valid_games.includes(args[0].toLowerCase()))) {
  for(i=1;i<args.length;i++) {
    name+=`${args[i]} `;
  }
}
else {
for(i=0;i<args.length;i++) {
  name+=`${args[i]} `;
}
}

if(name!="") {
  name=name.slice(0,-1);
}
else {
  return message.channel.send(`${client.GameNames[game]}, please provide a name.\nEx:\n> ${client.GuildPrefix[message.guild.id].prefix}name Arcadia Bot`)
}


  if(!client.Users[game][player]) {
    client.Users[game][player]= {
      name: name,
      id: 'N/A',
      time: "",
      flex_time: "",
      image: "",
      flex: "",
      thumbnail: message.author.avatarURL,
      flavor: ""
    }
    message.react('✅')
    return
  }


  else {
      client.Users[game][player].name=name
      message.react('✅')
      return
  }




}

module.exports.help = {
  name: "name",
  usage: `name`,
  desc: "Set your in-game name",
  public: true

}
