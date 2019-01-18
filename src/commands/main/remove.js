const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'remove',
			aliases: ['removezone', 'removetimezone', 'removezonerole', 'removetimezonerole', 'clearzone'],
            group: 'main',
            memberName: 'remove',
            description: 'Remove timezone role from current server.',
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
			userPermissions: ['MANAGE_SERVER']
        });
    }

    run(msg) {
		
    }
};