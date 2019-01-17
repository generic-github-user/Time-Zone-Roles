var auth = require('./auth.json');
var timezones = require('./timezones.js');
var Discord = require('discord.js');
var Commando = require('discord.js-commando');
var moment = require('moment');
var momentTimezone = require('moment-timezone');
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
	.registerDefaultCommands({
		eval: false
	})
    .registerCommandsIn(path.join(__dirname, 'commands'));

guilds = client.guilds;

containedZones = function(string) {
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

containsZones = function(string) {
	return new RegExp(settings.timezones.join("|")).test(string);
}

function updateTimes() {
	guilds.array().forEach(
		(guild) => {
			guild.roles.filter(
				x => containsZones(x.name)
			).array().forEach(
				(role) => {
					var zone = containedZones(role.name)[0];
					role.setName(
						zone + " - " + moment.tz(zone).format('h:mm A')
					);
				}
			)
		}
	);
}
	
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity('with time');
	updateTimes();
});

client.login(auth.token);
setInterval(updateTimes, 60*1000);