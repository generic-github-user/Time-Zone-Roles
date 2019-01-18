const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'zones',
			aliases: ['listzones', 'showzones', 'tzrzones', 'timezones', 'listtimezones'],
            group: 'main',
            memberName: 'zones',
            description: 'List all available timezones. Support for custom timezones is planned.',
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
		msg.say("Available timezones:");
		msg.say(settings.timezones.join(", "));
    }
};