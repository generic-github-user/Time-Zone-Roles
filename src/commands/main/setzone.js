const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'setzone',
            group: 'main',
            memberName: 'dm',
            examples: ['setzone EST'],
            description: 'Set the time zone of a given user. If no user is provided, your own time zone will be set.',
			throttling: {
				usages: 1,
				duration: 15
			},
            args: [
                {
                    key: 'zone',
                    prompt: 'What time zone do you want to assign?',
                    type: 'string'
                },
                {
                    key: 'user',
                    prompt: 'Who would you like to assign this time zone to?',
                    type: 'user',
					default: ''
                }
            ]
        });    
    }

    run(msg, { zone, user }) {
		var guild = msg.guild;
		
		if (user == '') {
			user = msg.author;
		} else if (!msg.member.hasPermission("MANAGE_SERVER")) {
			user = '';
			msg.say("You do not have permission to set the time zone for another user.");
		}
		
		if (user != '') {
			if (settings.timezones.includes(zone)) {
				var role = guild.roles.find(x => x.name === zone);
				if (!role) {
					role = guild.createRole(
						{
							name: zone,
							color: 'BLUE',
						},
						"Timezone role " + zone + " created for " + user.username + " by " + msg.author.username + " with Time Zone Roles bot."
					);
				}
				
				if (
					!guild.member(user).roles
					.find(x => x.name === zone)
				) {
					// https://stackoverflow.com/a/27760489
					Promise.resolve(role).then(
						function(zoneRole) {
							guild.member(user).addRole(
								zoneRole,
								"Timezone role " + role.name + " added to user " + user.username + " by Time Zone Roles bot."
							);
						}
					);
					
					msg.say('Added the timezone role `' + zone + '` to ' + user.username + '.');
				} else {
					msg.say(user.username + ' already has the timezone role `' + zone + '`.');
				}
			} else {
				msg.say('`' + zone + '` is not a valid time zone. Support for custom time zones is planned. Valid time zones include:');
				msg.say(
					settings.timezones.join(", ")
				);
			}
		}
    }
};