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

global.toRoleName = function (zoneName) {
	return '.' + zoneName;
}

global.listZones = function (msg) {
	msg.say('Available timezones:');
	msg.say(
		settings.timezones.join(", ")
	);
}

var zonesLong = [];
settings.timezones.forEach(
	(z) => zonesLong.push(toRoleName(z))
);

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

global.containedZones = function(zoneList, string) {
	var zones = [];
	zoneList.forEach(
		(zone) => {
			if (string.includes(zone)) {
				zones.push(zone);
			}
		}
	);
	return zones;
}

global.containsZones = function(string) {
	var cz = containedZones(zonesLong, string).length;
	return !!cz;
}

global.updateTimes = function(roles) {
	roles.array().forEach(
		(role) => {
			var zone = containedZones(settings.timezones, role.name)[0];
			role.setName(
				toRoleName(zone) + " - " + moment().utcOffset(
					settings.offsets[
						settings.timezones.indexOf(zone)
					]
				).format('h:mm A')
			);
		}
	);
}

function updateAllTimes() {
	guilds.array().forEach(
		(guild) => {
			updateTimes(
				guild.roles.filter(
					x => containsZones(x.name)
				)
			);
		}
	);
}
	
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity('with time');
	updateAllTimes();
});

client.login(auth.token);
setInterval(updateAllTimes, 60*1000);