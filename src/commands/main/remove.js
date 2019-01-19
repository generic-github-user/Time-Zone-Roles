const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'remove',
			aliases: ['removezone', 'removetimezone', 'removezonerole', 'removetimezonerole', 'clearzone'],
            group: 'main',
            memberName: 'remove',
            description: 'Remove timezone role from current server. If no timezone is provided, the role of the user who executes the command will be deleted. Use [ALL] as an input to remove all timezones from this server.',
            examples: [
				'?remove EST',
				'?remove [ALL]'
			],
            args: [
                {
                    key: 'zone',
                    prompt: 'What time zone do you want to remove from the server?',
                    type: 'string'
                }
            ],
			throttling: {
				usages: 1,
				duration: 15
			},
			userPermissions: ['MANAGE_ROLES']
        });
    }

    run(msg, { zone }) {
		var guild = msg.guild;
		
		if (settings.timezones.includes(zone)) {
			var role = guild.roles.find(
				x => containsZones(x.name) && x.name.includes(zone)
			);
			if (role) {
				role.delete().then(
					() => {
						msg.say('Time zone role for `' + zone + '` removed from server.');
					}
				);
			}
			else if (
				guild.roles.find(
					x => containsZones(x.name)
				)
			) {
				msg.say('`' + zone + '` does not exist on this server. These are all the existing timezone roles on this server:');
				var roles = guild.roles.filter(
					x => containsZones(x.name)
				).map(
					y => containedZones(
						settings.timezones,
						y.name
					)[0]
				);
				msg.say(roles.join(', '));
			}
			else {
				msg.say('`' + zone + '` does not exist on this server. There are no timezone roles on this server - use `?setzone <timezone>` to add a timezone to a user.');
			}
		}
		else if (zone === '[ALL]') {
			var roles = guild.roles.filter(
				x => containsZones(x.name)
			);
			
			if (roles.size > 0) {
				roles.deleteAll();
				
				msg.say('All timezone roles removed from server. These timezones were removed:');
				msg.say(
					roles.map(
						z => containedZones(
							settings.timezones,
							z.name
						)[0]
					).join(', ')
				);
			}
			else {
				msg.say('There are no timezone roles on this server - use `?setzone <timezone>` to add a timezone to a user.');
			}
		}
		else {
			msg.say('`' + zone + '` is not a valid time zone. Support for custom time zones is planned.');
			listZones(msg);
			msg.say('If you wish to remove all timezone roles from this server, use `?remove [ALL]`');
		}
    }
};