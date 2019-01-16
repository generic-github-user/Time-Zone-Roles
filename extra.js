 else if (msg.content === 'ping') {
	  
  }
  
  client.on('message', msg => {
  if (msg.content === s.prefix + 'ping') {
    msg.reply('Pong!');
  }
});

member.roles.forEach(
	(role) => {
		settings.timezones.forEach(
			(zone) => {
				if (role.name === zone) {
					member.removeRole(role);
				}
			}
		)
	}
);