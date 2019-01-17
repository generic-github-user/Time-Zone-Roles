const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'setzone',
			aliases: ['settimezone', 'set', 'addzone', 'setuserzone', 'tzrset'],
            group: 'main',
            memberName: 'dm',
            description: 'Set the time zone of a given user. If no user is provided, your own time zone will be set.',
            examples: [
				'setzone EST',
				'setzone PST @amazing_discord_user#3392'
			],
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
				var member = guild.member(user);
				member.removeRoles(
					guild.roles.filter(
						x => containsZones(x.name)
					)
				);
				
				var role = guild.roles.find(x => x.name.includes(zone));
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
					!member.roles
					.find(x => x.name.includes(zone))
				) {
					// https://stackoverflow.com/a/27760489
					Promise.resolve(role).then(
						(zoneRole) => {
							// console.log(zoneRole)
							member.addRole(
								zoneRole,
								"Timezone role " + role.name + " added to user " + user.username + " by Time Zone Roles bot."
							).then(
								() => msg.say('Added the timezone role `' + zone + '` to ' + user.username + '.')
							);
							updateTimes(
								guild.roles.filter(x => x.name.includes(zone))
							);
						}
					);
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