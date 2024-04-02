const {Collection, Events, ChannelType } = require('discord.js');

//require root directory and path to modal object
const appRoot = require('app-root-path');
const {displayMenu} = require(appRoot + '/modals/displayMenu.js');
const {displayEmoji} = require(appRoot + '/emojis/displayEmoji.js');
const { getEmoji, getCollectionEmoji } = require(appRoot + '/emojis/utilEmoji');

function parseMessageContent(content) {
    const emoArgs = new Collection();
    if (!content) return emoArgs;

    // removes 'tags' containing all mentions (users, roles, channels) in the message.content
    var emoji = content.replace(/<(@[!&]?|#)(\d+)>/g,'').trim();    
    if (!emoji) return emoArgs;
    console.log('Parsed content:' + emoji);

    // parse string with ::
    if(emoji.includes('::')) {
        emoji = emoji.substr(0,emoji.indexOf('::')).trim();
        content = content.replace(emoji,'').trim();
    } else{
        emoji = emoji.substr(0,emoji.indexOf(' ')).trim();
        content = '';
    }

    // key, value {}
    emoArgs.set('emoArgs', 
        { 
            emoji: emoji, 
            message: content  
        }
    );
    console.log('Parsed emoArgs:' + emoArgs.first().emoji + '-' + emoArgs.first().message);
    return emoArgs;
}
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
            const emojiArgs = parseMessageContent(message.content);
            console.log('emojiArgs:' + emojiArgs.size);

            let collectionEmoji;
            if (emojiArgs.size === 1) collectionEmoji = getCollectionEmoji(emojiArgs.first().emoji);
            try {
                if (collectionEmoji && collectionEmoji.size === 1 ) {
                        await displayEmoji(message, collectionEmoji.first().value);
                }else {
                    await displayMenu(message, emojiArgs,
                        (collectionEmoji)? collectionEmoji: getCollectionEmoji());
                }
                await message.delete();
            } catch (error) {
                console.error(error);
                await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
};