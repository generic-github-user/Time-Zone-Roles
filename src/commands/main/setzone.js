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
            ]
        });    
    }

    run(msg, { zone, user }) {
    }
};