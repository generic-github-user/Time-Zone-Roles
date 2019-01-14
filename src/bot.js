var logger = require('winston');
var auth = require('./auth.json');
var Discord = require('discord.js');
const config = require("./auth.json");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
      colorize: true
});
logger.level = 'debug';

const client = new Discord.Client();

client.on('ready', () => {
  logger.info('Connected');
  console.log('Logged in as ${client.user.tag}!');
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(config.token);