const clientconfig = require("./clientconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const date = require("date-and-time");
const client = new Discord.Client({
 partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

var heartBeat = 120;

client.commands = new Discord.Collection();

  client.clientconfig=require("./clientconfig.json")
  client.GuildPrefix=require("./GuildPrefix.json")
  client.GameNames=require("./GameNames.json")
  client.Users=require("./Users.json")
  client.Characters=require("./Characters.json")
  client.IAmLazyFormatNames=require("./IAmLazyFormatNames.json")
  client.hex=require("./hex.json")

fs.readdir("./commands/", (err, files) => {
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile == undefined || jsfile.length <= 0) {

    return;
  }
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    client.commands.set(props.help.name, props);

  });
  //console.log("### Finished loading");
  //console.log(`---LOAD-------------\n`);
});

client.on("ready", async () => {


client.guilds.cache.forEach(guild => {

    console.log(`# ${guild.name}: ID: ${guild.id} with ${guild.memberCount} Members`);
    if(!client.GuildPrefix[guild.id]) {
      client.GuildPrefix[guild.id]= {
        prefix: client.clientconfig.prefix,
        name: guild.name,
        owner: guild.ownerID,
        intro_seen: 0,
        main: '',
        channel_overrides: {}
      }
    }

    if(!client.GuildPrefix[guild.id].intro_seen) {
      client.GuildPrefix[guild.id].intro_seen=0;
    }
    if(!client.GuildPrefix[guild.id].replace_timer) {
      client.GuildPrefix[guild.id].replace_timer=0;
    }

  });

  console.log(`---AWAIT------------`);
  console.log(`## Awaiting`);

 client.user.setActivity(`Over Gacha Hell || ${client.clientconfig.prefix}help`, {type: "WATCHING"});
  //client.user.setActivity(`IMP | Soon: Temporarily down for maintenance`, {type: "WATCHING"});


  var interval = setInterval (function () {
    let now = new Date();
    date.format(now, 'YYYY/MM/DD HH:mm:ss');

        fs.writeFile("./GuildPrefix.json", JSON.stringify(client.GuildPrefix, null, 4), err => {
          if(err) throw err;
          });

          fs.writeFile("./Users.json", JSON.stringify(client.Users, null, 4), err => {
            if(err) throw err;
            });

                      fs.writeFile("./hex.json", JSON.stringify(client.hex, null, 4), err => {
                        if(err) throw err;
                        });


          //console.log(`> Minute`)
  }, heartBeat * 1000);


});

client.on("guildCreate", async guild => {
  client.GuildPrefix[guild.id]= {
    prefix: client.clientconfig.prefix,
    name: guild.name,
    owner: guild.ownerID,
    main: '',
    channel_overrides: {},
    intro_seen:0
  }

});

client.on("guildDelete", async guild => {
});

client.on("guildMemberAdd", async member => {
});

client.on("guildMemberRemove", async member => {
});
client.on("messageReactionAdd", async (messageReaction, user)  => {
  })
client.on("message", async message => {


if(message.content.toLowerCase()=='how long is maintenance' || message.content.toLowerCase()=='how long is maintenance?') {
     return message.channel.send('https://twitter.com/nash0k1desu/status/1278207442585743365?s=09');
}
if(message.author.id=='310180297939353600' && message.guild) {
  if(message.content.toLowerCase()=='prefix?') {
    return message.channel.send(`${client.GuildPrefix[message.guild.id].prefix}`)
  }
}


if(message.author.id!='739228525135003748'){
  if(message.guild) {
  let prefix = client.GuildPrefix[message.guild.id].prefix;
  if (!message.content.startsWith(prefix)) return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];


  if (cmd.toLowerCase() === `${prefix}p`) cmd = `${prefix}profile`;
  if (cmd.toLowerCase() === `${prefix}p2`) cmd = `${prefix}profile2`;
  if (cmd.toLowerCase() === `${prefix}t`) cmd = `${prefix}tutorial`;
  if (cmd.toLowerCase() === `${prefix}flavor`) cmd = `${prefix}footer`;


  let args = messageArray.slice(1);
  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(client, message, args);

}
}
});

client.on("error", async e => {
  reconnectTries++;
});
client.on("warn", (e) => console.warn(e));

client.login(clientconfig.token);
