
const clientconfig = require("../clientconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const date = require("date-and-time");
module.exports.run = async (client, message, args) => {

  console.log(`# Command used: ${clientconfig.prefix}arcadiaprefix || In ${message.guild.name}`);



if (message.author.id==`${clientconfig.BotID}`) {
  return
}
    let api_ping=Math.round(client.ping)
    const first_msg= await message.channel.send('Pinging')
  return message.channel.send(`Latency: ${first_msg.createdAt - message.createdAt}ms\nAPI: ${api_ping}ms`);

}

module.exports.help = {
  name: "ping",
  usage: `ping`,
  desc: "Tests my ping",
  public: true

}
