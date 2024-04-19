const {Events, ChannelType } = require('discord.js');

//require root directory and path to modal object
const appRoot = require('app-root-path');
const {displayMenu, deleteDisplayMenu} = require(appRoot + '/menus/displayMenu.js');
const {displayEmoji} = require(appRoot + '/emojis/displayEmoji.js');
const { getCollectionBanner, getCollectionEmoji} = require(appRoot + '/emojis/utilEmoji');

function parseMessageContent(content) {
    const object = 
        {
            emoji: '',
            banner: '', 
            message: ''
        }

    if(!content) return object;

    // removes 'tags' containing all mentions (users, roles, channels) in the message.content
    var emoji = banner = content = content.replace(/<(@[!&]?|#)(\d+)>/g,'').trim();    
    if(!emoji) return object;

    // parse string with :: to get emoji,banner, message
    if(emoji.includes('::')) {
        emoji = emoji.substring(0,emoji.indexOf('::'));
        content = banner = banner.replace(emoji + '::','');

        if(banner.includes(' ')) {
            banner = banner.substring(0,banner.indexOf(' '));
            content = content.replace(banner + ' ','');
        } else {
            content = '';
        }
    } else if(emoji.includes(' ')) { // parse string with space to get emoji and message
        emoji = emoji.substring(0,emoji.indexOf(' '));
        content = content.replace(emoji + ' ','');
        banner = '';
    } else {
        banner = '';
        content = '';
    }

    // reconcilliate object
    object.emoji = emoji.trim();
    object.banner = banner.trim(); 
    object.message = content.trim();
    return object;
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
            // remove items from displayMenuItems created by author
            if(displayMenuItems.has(message.author.id + 'emoFields'))
                displayMenuItems.delete(message.author.id + 'emoFields');
            if(displayMenuItems.has(message.author.id + 'emoEmojis'))
                displayMenuItems.delete(message.author.id + 'emoEmojis');
            if(displayMenuItems.has(message.author.id + 'emoBanners'))
                displayMenuItems.delete(message.author.id + 'emoBanners');

            // parse message arguments
            const parsedMessage = parseMessageContent(message.content);

            // gather select Emoji items
            const selectEmoji = getCollectionEmoji(parsedMessage.emoji);
 
            // gather select Banner items
            const selectBanner = getCollectionBanner(parsedMessage.banner);

            try {
                if (selectEmoji.size === 1 ) {
                    var blnReply = false;
                    var msg = message;
                    let { channel, reference: reply } = message;
                    if(reply) {
                        const repliedTo = await channel.messages.fetch(reply.messageId);
                        if(repliedTo) {
                            blnReply = true;
                            msg = repliedTo;
                        }
                    }

                    await displayEmoji(
                        msg, 
                        selectEmoji.first(), 
                        parsedMessage.message,
                        selectBanner.random(),
                        blnReply
                    );
                }else {
                    parsedMessage.emoji = selectEmoji.random().value;
                    parsedMessage.banner = selectBanner.random().value;

                    const msgDisplayMenu = 
                        await displayMenu(
                            message, 
                            selectEmoji, 
                            selectBanner,
                            parsedMessage,
                            true
                        );
    
                    // Delete after 30 seconds;
                    const timeOutDisplayMenu = setTimeout(() => deleteDisplayMenu(msgDisplayMenu), 30_000); 

                    // add setTimeout call to menu items 
                    displayMenuItems.set(msgDisplayMenu.id + 'timeOutDisplayMenu', timeOutDisplayMenu); 

                    // add parsedMessage key, value {} to menu items
                    displayMenuItems.set(msgDisplayMenu.id + 'emoFields', parsedMessage);

                    // add emoji collection to menu items 
                    displayMenuItems.set(msgDisplayMenu.id + 'emoEmojis', selectEmoji);

                    // add banner collection to menu items 
                    displayMenuItems.set(msgDisplayMenu.id + 'emoBanners', selectBanner);           
                }
                // remove client user message from screen
                await message.delete();
            } catch (error) {
                console.error(error);
                await message.reply(
                    { 
                        content: 'There was an error while executing a message!'
                    }
                );
            }
        }
    }
};