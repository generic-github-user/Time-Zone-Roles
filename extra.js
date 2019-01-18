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

Discord.splitMessage(
	settings.timezones.join(", ")
).forEach(
	(shortMsg) => {
		msg.say(shortMsg)
	}
);

msg.say(
    Discord.splitMessage(
        array.join(", "),
        {
            'char': ','
        }
    )
);

if (cz == 0) {
	return false;
} else {
	return true;
}