const { Events, ChannelType } = require('discord.js');

//require root directory and path to modal object
const appRoot = require('app-root-path');
const modal = require(appRoot + '/modals/displayMenu.js');

// When the client is mentioned.
// It makes response choices.
module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
        //check for different types messages or authors not utilized
        if (message.author.bot) return false;
        if (message.channel.type == ChannelType.DM) return false;
        if (message.channel.type == ChannelType.GroupDM) return false;
        
        // Check if the message mentions the bot
        if (message.mentions.has(message.client.user)) { 
            await modal.displayMenu(message);
        }
    },
};