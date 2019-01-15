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
		
		if (user == '') {
			return msg.author.send(zone);
		} else if (msg.member.hasPermission("MANAGE_SERVER")) {
			return user.send(zone);
		} else {
			return "You do not have permission to set the time zone for another user.";
		}
    }
};