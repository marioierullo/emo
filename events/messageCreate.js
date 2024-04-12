const {Events, ChannelType } = require('discord.js');

//require root directory and path to modal object
const appRoot = require('app-root-path');
const {displayMenu} = require(appRoot + '/interactions/displayMenu.js');
const {displayEmoji} = require(appRoot + '/emojis/displayEmoji.js');
const { getCollectionBanner } = require(appRoot + '/emojis/utilEmoji');
const { getCollectionEmoji } = require(appRoot + '/emojis/utilEmoji');

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
    
    // parse string with :: to get emoji,banner, message
    if(emoji.includes('::')) {
        emoji = emoji.substr(0,emoji.indexOf('::'));
        content = banner = banner.replace(emoji + '::','');

        if(banner.includes(' ')) {
            banner = banner.substr(0,banner.indexOf(' '));
            content = content.replace(banner + ' ','');
        } else {
            content = '';
        }
    } else if(emoji.includes(' ')) { // parse string with space to get emoji and message
        emoji = emoji.substr(0,emoji.indexOf(' '));
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

function deleteDisplayMenu(message) {
    if(displayMenuItems.has(message.id+'timeOutDisplayMenu')) {
        try {
            message.delete();
            displayMenuItems.delete(message.id+'timeOutDisplayMenu');
            displayMenuItems.delete(message.id+'emoFields');
            displayMenuItems.delete(message.id+'emoEmojis');
            displayMenuItems.delete(message.id+'emoBanners');
        } catch (error) {
            console.error(error);
            message.reply(
                { 
                    content: 'There was an error while auto-deleting emo display menu', 
                    ephemeral: true 
                }
            );
        }
    }
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
            // remove client user message from screen
            await message.delete();

            // parse message arguments
            const parsedMessage = parseMessageContent(message.content);

            // gather select Emoji items
            const selectEmoji = getCollectionEmoji(parsedMessage.emoji);

            // gather select Banner items
            const selectBanner = getCollectionBanner(parsedMessage.banner);

            try {
                if (selectEmoji.size === 1 ) {
                    await displayEmoji(
                        message, 
                        selectEmoji.first().value, 
                        parsedMessage.message,
                        selectBanner.random().value
                    );
                }else {
                    const msgDisplayMenu = await displayMenu(
                        message, 
                        selectEmoji
                    );
                    
                    // Delete after 30 seconds;
                    const timeOutDisplayMenu = setTimeout(() => deleteDisplayMenu(msgDisplayMenu), 30000); 

                    // add setTimeout call to menu items 
                    displayMenuItems.set(msgDisplayMenu.id + 'timeOutDisplayMenu', timeOutDisplayMenu); 

                    // add parsedMessage key, value {} to menu items
                    displayMenuItems.set(msgDisplayMenu.id + 'emoFields', parsedMessage);

                    // add emoji collection to menu items 
                    displayMenuItems.set(msgDisplayMenu.id + 'emoEmojis', selectEmoji);

                    // add banner collection to menu items 
                    displayMenuItems.set(msgDisplayMenu.id + 'emoBanners', selectBanner);
                    
                    
                    
                }
            } catch (error) {
                console.error(error);
                await message.reply(
                    { 
                        content: 'There was an error while executing this command!', 
                        ephemeral: true 
                    }
                );
            }
        }
    }
};