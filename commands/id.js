
const clientconfig = require("../clientconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const date = require("date-and-time");

module.exports.run = async (client, message, args) => {

  console.log(`# Command used: ${client.clientconfig.prefix}id || In ${message.guild.name}`);


  if(message.author.id=='739228525135003748') {
    return
  }



if(!message.guild) {
  return
}


var game='';


//Server MainGame start
game=client.GuildPrefix[message.guild.id].main
const prefix=client.GuildPrefix[message.guild.id].prefix
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
//Args[0] end

if(game=="") {
  return message.channel.send(`No game selected/ No channel overrides found\n\nHave an Admin set a default game for the server using:\n> ${prefix}config`)
}

let game_call=client.GameNames[game];
//Args[0] end



var player=message.author.id

let id=''
if(args[0] && (client.GameNames.valid_games_LC.includes(args[0].toLowerCase()) || client.GameNames.valid_games.includes(args[0].toLowerCase()))) {
  for(i=1;i<args.length;i++) {
    id+=`${args[i]} `;
  }
}
else {
for(i=0;i<args.length;i++) {
  id+=`${args[i]} `;
}
}

if(id!="") {
  id=id.slice(0,-1);
}
else {
  return message.channel.send(`${client.GameNames[game]}, please provide a name.\nEx:\n> ${client.GuildPrefix[message.guild.id].prefix}id 4001`)
}


  if(!client.Users[game][player]) {
    client.Users[game][player]= {
      name: 'N/A',
      id: id,
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
    client.Users[game][player].id=id
    try {
    message.react('✅')
  }
  catch(err) {
    message.channel.send(`I react with ✅ to confirm data has been updated, please turn my react permissions ON`)
  }
    return
  }




}

module.exports.help = {
  name: "id",
  usage: `id`,
  desc: "Set your in-game ID",
  public: true

}
