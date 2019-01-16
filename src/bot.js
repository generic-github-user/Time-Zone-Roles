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
	.registerDefaultCommands({
		eval: false
	})
    .registerCommandsIn(path.join(__dirname, 'commands'));

guilds = client.guilds;

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

function updateTimes() {
	var d = new Date();
	
	guilds.array().forEach(
		(guild) => {
			guild.roles.filter(
				x => new RegExp(settings.timezones.join("|")).test(
					x.name
				)
			).array().forEach(
				(role) => {
					role.setName(
						containsZone(role.name)[0] + " - " + localTime(
							d,
							settings.offsets[
								settings.timezones.indexOf(containsZone(role.name)[0])
							]
						).getHours()
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
setInterval(updateTimes, 30*60)