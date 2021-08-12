
const clientconfig = require("../clientconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const date = require("date-and-time");

module.exports.run = async (client, message, args) => {

  console.log(`# Command used: ${clientconfig.prefix}help || In ${message.guild.name}`);

if(message.author.id=='739228525135003748') {
  return
}
  let home=''
  let func=''
  let donate=''
  let p=''
  let commandMessage
  let publicCommands = [];
  let sinCommands= [];
  let commandNames = Array.from(client.commands.keys());
  commandNames.forEach(cName => {
    if (client.commands.get(cName).help.public) {
      publicCommands.push(cName);
}
});
  let helpEmbed = new Discord.MessageEmbed;

  let commands=''
  const prefix=client.GuildPrefix[message.guild.id].prefix




  publicCommands.forEach(pCommand => {
    let name = client.commands.get(pCommand).help.name;
    let usage = client.commands.get(pCommand).help.usage;
    let desc = client.commands.get(pCommand).help.desc;

    if (name=='profile' || name=='image' || name=='flex' || name=='id' || name=='name' || name=='footer') {
      p+="**"+ prefix+usage+"**\n-" + desc + "\n\n";
    }
    else if (name=='home' || name=='invite' || name=='ping' || name=='tutorial') {
      home+="**" + prefix+usage + "**\n-" + desc + "\n\n";
    }
    else if (name=='arcadiaprefix' || name=='channel'||name=='config') {
      func+="**" + prefix+usage + "**\n-" + desc + "\n\n";
    }
    else {
    commandMessage = "**" + prefix+usage + "**\n-" + desc + "\n\n";
    commands = commands + commandMessage;
  }
  });


  let pink='<a:PinkSparkles:739403401338552320>'
  let space=`-------`;

  let valid_games=client.GameNames.valid_games_help_format
  let valid_formatted=''
  for(entry in valid_games) {
    valid_formatted+=`-${valid_games[entry]}\n`
  }

  helpEmbed.setColor(client.clientconfig.color)
  helpEmbed.addField("Command List", `----------\n${pink} **__Main__** ${pink}\n${p}${commands}${space}\n${pink} **__Admin__** ${pink}\n${func}${space}\n${pink} **__Misc__** ${pink}\n${home}${space}`,false)



if(client.GuildPrefix[message.guild.id].intro_seen==0) {
  client.GuildPrefix[message.guild.id].intro_seen=1;
  return message.channel.send(`<a:PinkSparkles:739403401338552320> *__Hello and Welcome to Arcadia Bot__!* <a:PinkSparkles:739403401338552320>\n\n**__-Admins: Please set your server's main game (if applicable), by doing__**:\n> $config\n\n**__-For a full tutorial on how to setup a profile with me, please do__**:\n> $tutorial or $t\n\n-If you have any questions about setup and operation, or any games/features you would like to see added, please do:\n> $home\n\n*Calling ${prefix}help again will pull up my normal help message*\n\n*(I will only send this message once, ever)*`)
}
  try{
  await message.channel.send(helpEmbed)
  }
  catch(err) {
    let helpEmbed1=new Discord.MessageEmbed();
    let helpEmbed2=new Discord.MessageEmbed();
    helpEmbed1.setColor(client.clientconfig.color)

    helpEmbed2.setColor(client.clientconfig.color)

    helpEmbed1.addField("Command List", `----------\n${pink} **__Main__** ${pink}\n${p}${commands}${space}\n${pink} **__Admin__** ${pink}\n${func}${space}\n${pink}`,false)
    helpEmbed2.addField(`**__Misc__** ${pink}\n${home}${space}`,false)
    await message.channel.send(helpEmbed1)
    await message.channel.send(helpEmbed2)

  }
  await message.channel.send(`Currently supported games:\n${valid_formatted}`)



}

module.exports.help = {
  name: "help",
  usage: `help`,
  desc: "DMs the user a command list.",
  public: false

}
