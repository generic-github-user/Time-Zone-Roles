var auth = require('./auth.json');
var Discord = require('discord.js');

const client = new Discord.Client();

var settings = {
	"prefix": "?"
};
s = settings;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === s.prefix + 'ping') {
    msg.reply('Pong!');
  }
});

client.login(auth.token);