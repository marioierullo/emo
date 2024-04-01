const { Events, ChannelType } = require('discord.js');

//require root directory and path to modal object
const appRoot = require('app-root-path');
const {displayMenu} = require(appRoot + '/modals/displayMenu.js');
const {displayEmoji} = require(appRoot + '/emojis/displayEmoji.js');
const {getEmoji} = require(appRoot + '/emojis/getEmoji.js');

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
            const msg = message.content.replace(message.client.user,'');
            try {
                if (msg) {
                    await displayEmoji(message, getEmoji('emoBueh.png'));
                } else {
                    await displayMenu(message);
                }
                await message.delete();
            } catch (error) {
                console.error(error);
                await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
};