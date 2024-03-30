//This line will read the .env file and set the environment variables in the process.env object.
require('dotenv').config();

//The fs module is Node's native file system module. 
//fs is used to read the commands directory and identify our command files.
const fs = require('node:fs');

//The path module is Node's native path utility module. 
//path helps construct paths to access files and directories. 
const path = require('node:path');

// Require the necessary discord.js classes
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

// Create a new client instance
const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessageTyping
	],
	partials: [
		Partials.Message,
		Partials.Channel,
		Partials.Reaction
	] 
});

//dynamically retrieve your event files
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);