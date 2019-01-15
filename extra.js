 else if (msg.content === 'ping') {
	  
  }
  
  client.on('message', msg => {
  if (msg.content === s.prefix + 'ping') {
    msg.reply('Pong!');
  }
});