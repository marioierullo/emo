const {Collection, Events, ChannelType } = require('discord.js');

//require root directory and path to modal object
const appRoot = require('app-root-path');
const {displayMenu} = require(appRoot + '/modals/displayMenu.js');
const {displayEmoji} = require(appRoot + '/emojis/displayEmoji.js');
const { getCollectionEmoji } = require(appRoot + '/emojis/utilEmoji');

function parseMessageContent(content) {
    const emoArgs = new Collection();
    if (!content) return emoArgs;

    // removes 'tags' containing all mentions (users, roles, channels) in the message.content
    content = content.replace(/<(@[!&]?|#)(\d+)>/g,'').trim();    
    if (!content) return emoArgs;

    // parse string with :: or space
    var emoji = content;
    if(emoji.includes('::')) {
        emoji = emoji.substr(0,emoji.indexOf('::'));
        content = content.replace(emoji + '::','');
    } else if(emoji.includes(' ')) {
        emoji = emoji.substr(0,emoji.indexOf(' '));
        content = content.replace(emoji + ' ','');;
    } else {
        content = '';
    }
 
    //set key, value {}
    emoArgs.set('emoArgs', 
        { 
            emoji: emoji.trim(), 
            message: content  
        }
    );
    return emoArgs;
};

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
            // parse message arguments
            const emoArgs = parseMessageContent(message.content);

            let collectionEmoji;
            if (emoArgs.size === 1) 
                collectionEmoji = getCollectionEmoji(emoArgs.first().emoji);
            try {
                if (collectionEmoji && collectionEmoji.size === 1 ) {
                    await displayEmoji(
                        message, 
                        collectionEmoji.first().value, 
                        emoArgs.first().message
                    );
                }else {
                    await displayMenu(
                        message, 
                        (collectionEmoji)? collectionEmoji: getCollectionEmoji(),
                        (emoArgs.size === 1)? emoArgs.first().message: ''
                    );
                }
                await message.delete();
            } catch (error) {
                console.error(error);
                await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
};