const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'setzone',
            group: 'main',
            memberName: 'dm',
            description: 'Sends a message to the user you mention.',
            examples: ['setzone EST'],
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
			var role = guild.roles.find(x => x.name === zone);
			if (!role) {
				guild.createRole(
					{
						name: zone,
						color: 'BLUE',
					},
					"Timezone role " + zone + " created for " + user.username + " by " + msg.author.username + " with Time Zone Roles bot."
				);
			}
		}
    }
};