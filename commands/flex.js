
const clientconfig = require("../clientconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const date = require("date-and-time");
module.exports.run = async (client, message, args) => {

  console.log(`# Command used: ${client.clientconfig.prefix}flex || In ${message.guild.name}`);

  if(message.author.id=='739228525135003748') {
    return
  }



if(!message.guild) {
  return
}


var game='';
var prefix=client.GuildPrefix[message.guild.id].prefix


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

//Me reading back over this: "LOL, who tf wrote this shit"

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
else if(args[0].toLowerCase()=='girlsfrontline') {
  game='gfl'
}else if(args[0] && (args[0].toLowerCase()=='pri' || args[0].toLowerCase()=='priconne')) {
  game='pri'
}
}
//Args[0] end

if(game=="") {
  return message.channel.send(`No game selected/ No channel overrides found\n\nHave an Admin set a default game for the server using:\n> ${client.GuildPrefix[message.guild.id].prefix}config`)
}

let game_call=client.GameNames[game];
//Args[0] end



var player=message.author.id


if((message.attachments).array()[0]) {

  let date=new Date()
  let day= [date.getMonth()+1,
                 date.getDate()].join('/')

  if(!client.Users[game][player]) {
    if(message.member){
    client.Users[game][player]= {
      name: 'N/A',
      id: 'N/A',
      time: "",
      flex_time: day,
      image: "",
      flex: message.attachments.array()[0].url,
      thumbnail: message.member.user.avatarURL,
      flavor:""
    }
    message.react('✅')
    return
  }
  else {
    client.Users[game][player]= {
      name: 'N/A',
      id: 'N/A',
      time: "",
      flex_time: day,
      image: "",
      flex: message.attachments.array()[0].url,
      thumbnail: '',
      flavor:""
    }
    message.react('✅')
    return
    }
  }

        client.Users[game][message.author.id].flex=(message.attachments).array()[0].url

    client.Users[game][message.author.id].flex_time=day
    message.react('✅')
    if(client.Users[game][player]) {
      if (message.member) {
        client.Users[game][player].thumbnail=message.member.user.avatarURL
      }
    }
  }

  else {
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
      //console.log(`Player is: ${player}, fulllist is: ${filelist}`)
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


if(!client.Users[game][player]) {
  return message.channel.send(`You do not have anything to flex ${game_call}!\n\nTo set an image to flex, please do:\n> ${prefix}flex GAME (+upload an image)\nEx:\n> ${prefix}flex fgo (+upload an image)`)
}

  let rich=new Discord.MessageEmbed();
  rich.setTitle(`The ${client.GameNames[game]} Flex`)
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
  console.log(`game is ${game}`)
  if(client.Users[game][player]!='') {
  rich.setImage(client.Users[game][player].flex)
}

  return message.channel.send(rich)

  }


}

module.exports.help = {
  name: "flex",
  usage: `flex <game> (+attach image)`,
  desc: "Upload/Display something to flex on your friends",
  public: true

}
