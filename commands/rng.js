

const clientconfig = require("../clientconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const date = require("date-and-time");

module.exports.run = async (client, message, args) => {

  console.log(`# Command used: ${clientconfig.prefix}rng || In ${message.guild.name}`);

    let bound;

      if(args[0] && !isNaN(args[0])) {
      bound=args[0]
    }
    else {
      return message.channel.send('Please provide a number')
    }
    if (bound<1) {
      return message.channel.send('Provide a number greater than 1 pls')
    }
 else if (bound==1) {
   let rng=(Math.floor(Math.random()*bound)+1);
    return(message.channel.send('...\n'+rng))
  }
  else {
    bound=args[0]
  }

let final=''
  if(args[1]) {
    if(!isNaN(args[1])) {
      var dice=args[1]
    }
  }
  for(i=0;i<dice;i++) {
    let rng=(Math.floor(Math.random()*bound)+1);
    final+=`${rng}, `;
  }

  if(final!='') {
    final=final.slice(0,-2)
    return message.channel.send(final)
  }
let rng=(Math.floor(Math.random()*bound)+1);
return message.channel.send(rng)

}

module.exports.help = {
  name: "rng",
  usage: `rng`,
  desc: "RNG",
  public: false

}
