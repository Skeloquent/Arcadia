
const clientconfig = require("../clientconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const date = require("date-and-time");

module.exports.run = async (client, message, args) => {

  console.log(`# Command used: ${clientconfig.prefix}math || In ${message.guild.name}`);


  if(message.author.id=='288133268468137984') {
    return message.channel.send(`I'm scared`)
  }
  if(message.author.id!='310180297939353600') {
    return message.channel.send('You are not worthy')
  }

if (!isNaN(args[0]) && !isNaN(args[2])) {
  if(args[1]=="/" && args[2]==0) {
    let rand=Math.floor(Math.random()*2)+1;
    if (rand==1) {
      return message.channel.send('<:AbbyOuch:631563894502195207>')
    }
    else {
      await message.channel.send('The answer is... Pancakes!')
      return message.channel.send('<:AbbyNom:631564116372488192>')
    }
  }
  else {
  message.channel.send("Answer: "+eval(args[0]+args[1]+args[2]))
}
}

}

module.exports.help = {
  name: "math",
  usage: `math`,
  desc: "Tests if the bot is online.",
  public: false

}
