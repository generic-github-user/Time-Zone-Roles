var auth = require('./auth.json');
var timezones = require('./timezones.js');
var Discord = require('discord.js');
var Commando = require('discord.js-commando');
const path = require('path');

const client = new Commando.Client({
	commandPrefix: '?',
    owner: auth.owner,
    disableEveryone: true
});

global.settings = {
	"prefix": "?",
	"timezones": timezones.names,
	"offsets": timezones.offsets
};

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['main', 'Main Command Group']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

function localTime(time, offset) {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000*offset));
    return nd;
}

function containsZone(string) {
	var zones = [];
	settings.timezones.forEach(
		(zone) => {
			if (string.includes(zone)) {
				zones.push(zone);
			}
		}
	);
	return zones;
}
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('with time');
});

client.login(auth.token);