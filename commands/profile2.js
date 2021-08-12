

const clientconfig = require("../clientconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const date = require("date-and-time");

module.exports.run = async (client, message, args) => {

  console.log(`# Command used: ${client.clientconfig.prefix}profile2 || In ${message.guild.name}`);

  if(message.author.id=='739228525135003748') {
    return
  }



if(!message.guild) {
  return
}


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
//if(args[0]) {
if(args[0] && client.GameNames.valid_games_LC.includes(args[0].toLowerCase())) {
  game=args[0].toLowerCase()
}
else if((args[0] && args[0].toLowerCase()=='fate') || game.toLowerCase()=='fate') {
  game='fgo'
}
else if((args[0] && args[0].toLowerCase()=='fatejp') || game.toLowerCase()=='fatejp') {
  game='fgojp'
}
else if((args[0] && args[0].toLowerCase()=='arknights') || game.toLowerCase()=='arknights') {
  game='ak'
}
else if((args[0] && args[0].toLowerCase()=='sinoalice') || game.toLowerCase()=='sinoalice') {
  game='sin'
}
else if((args[0] && args[0].toLowerCase()=='granblue') || game.toLowerCase()=='granblue') {
  game='gbf'
}
else if((args[0] && args[0].toLowerCase()=='azurlane') || game.toLowerCase()=='azurlane') {
  game='al'
}
else if((args[0] && (args[0].toLowerCase()=='fireemblem' || args[0].toLowerCase()=='fe')) || game.toLowerCase()=='fireemblem' || game.toLowerCase()=='fe') {
  game='feh'
}
else if(args[0] && (args[0].toLowerCase()=='pri' || args[0].toLowerCase()=='priconne')) {
  game='pri'
}
//Args[0] end
let prefix=client.GuildPrefix[message.guild.id].prefix
if(game=="") {
  return message.channel.send(`No game selected/ No channel overrides found\n\nHave an Admin set a default game for the server using:\n> ${prefix}config`)
}

let game_call=client.GameNames[game];
//Args[0] end



var player=message.author.id
if(player=='739228525135003748') {
  return
}
//console.log(`player ${player}   and game ${game}`)


if(args[0] && !client.GameNames.valid_games_LC.includes(args[0].toLowerCase())) {
  if (args[0].startsWith("<@!")) {
    var pinged=args[0]
    pinged=pinged.slice(3)
    pinged=pinged.slice(0,-1)
    player=pinged
  }
  else if (args[0].startsWith("<@")) {
    var pinged=args[0]
    pinged=pinged.slice(2)
    pinged=pinged.slice(0,-1)
    player=pinged
  }
  else if (!isNaN(args[0])) {
    player=args[0]
  }
  var filelist=[]
  let file = JSON.parse(fs.readFileSync("./Users.json"));
  Object.entries(file[game]).forEach(([key, value]) => {
    filelist.push(key)
  });
  //console.log(`Player is: ${player}, fulllist is: ${filelist  }`)
  if(!filelist.includes(player)) {
    return message.channel.send(`I could not locate any such ${game_call}`)
  }
  }



if (args[0] && args[1]) {
if (args[1].startsWith("<@!")) {
  var pinged=args[1]
  pinged=pinged.slice(3)
  pinged=pinged.slice(0,-1)
  player=pinged
}
else if (args[1].startsWith("<@")) {
  var pinged=args[1]
  pinged=pinged.slice(2)
  pinged=pinged.slice(0,-1)
  player=pinged
}
else if (!isNaN(args[1])) {
  player=args[1]
}
var filelist=[]
let file = JSON.parse(fs.readFileSync("./Users.json"));
Object.entries(file[game]).forEach(([key, value]) => {
  filelist.push(key)
});
if(!filelist.includes(player)) {
  return message.channel.send(`I could not locate any such ${game_call}`)
}
}

if(player==message.author.id && !client.Users[game][player]) {
  return message.channel.send(`You do not have a profile ${game_call}\n\nValid profile setup commands are:\n> ${prefix}name\n> ${prefix}id\n> ${prefix}image\n> ${prefix}flex`)
}

//console.log('game: '+game+' player: '+player)
  rich= new Discord.MessageEmbed()
  if (client.Users[game][player].image2) {
  rich.setImage(client.Users[game][player].image2)
}

if(client.Users[game][player].flavor!="") {
  rich.setFooter(`${client.Users[game][player].flavor}`+'\nLast updated on '+client.Users[game][player].time2)
}
else {
  rich.setFooter('Last updated on '+client.Users[game][player].time2)
}




//console.log('length2: '+length2+'\nformatted_supp: '+formatted_supp+'\nUlt final: '+ult_final)
rich.addField(`Name`,client.Users[game][player].name,false)
rich.addField('ID',client.Users[game][player].id,false)
if(client.Users[game][player]) {

  if(message.author.id==player) {
    if(message.author) {
      if (message.author.id) {
        rich.setThumbnail(message.author.avatarURL);
        client.Users[game][player].thumbnail=message.author.avatarURL
      }
    }

  }

  else if(client.Users[game][player].thumbnail) {
    rich.setThumbnail(client.Users[game][player].thumbnail)
  }
  else {
    if(message.author.id==player) {
    client.Users[game][player].thumbnail=message.author.avatarURL
  }
  }
}
rich.setAuthor(`Hello, ${game_call}`)
if(client.hex[player] && client.hex[player].hex) {
  try {
    rich.setColor(client.hex[player].hex)
}
catch(err) {
  rich.setColor('#2c2f33')
  message.channel.send(`Invalid Hex; consult ${prefix}hex`)
}
}
else {
rich.setColor(client.clientconfig.color)
}
return message.channel.send(rich)


}

module.exports.help = {
  name: "profile2",
  usage: `profile2 <game_name> <User_ping/Discord ID>`,
  desc: "Pulls up your profile, or that of another player",
  public: false

}
