const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'zones',
			aliases: ['listzones', 'showzones', 'tzrzones', 'timezones', 'listtimezones'],
            group: 'main',
            memberName: 'zones',
            description: 'List all available timezones and timezone roles present on server. Support for custom timezones is planned.',
            examples: [
				'?zones'
			],
			throttling: {
				usages: 1,
				duration: 15
			}
        });
    }

    run(msg) {
		listZones(msg);
		
		var roles = msg.guild.roles.filter(
			x => containsZones(x.name)
		);
		if (roles.size > 0) {
			msg.say('Existing timezone roles on this server:');
			msg.say(
				roles.map(
					y => containedZones(
						settings.timezones,
						y.name
					)[0]
				).join(', ')
			);
		} else {
			msg.say('There are no timezone roles on this server - use `?setzone <timezone>` to add a timezone to a user.');
		}
    }
};