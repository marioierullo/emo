const { Events} = require('discord.js');

//require root directory and path to modal object
const appRoot = require('app-root-path');
const {displayEmoji} = require(appRoot + '/emojis/displayEmoji.js');
const {displayMenu, deleteDisplayMenu} = require(appRoot + '/menus/displayMenu.js');
const {displayModal} = require(appRoot + '/menus/interactionModal.js');

function resetDeleteDisplayMenu(message) {
    if (message) {
        // remove setTimeout call to menu items
        if(displayMenuItems.has(message.id + 'timeOutDisplayMenu')) {
            clearTimeout(displayMenuItems.get(message.id + 'timeOutDisplayMenu')); 
            displayMenuItems.delete(message.id + 'timeOutDisplayMenu');
        }
        // Delete after 30 seconds;
        const timeOutDisplayMenu = setTimeout(() => 
            deleteDisplayMenu(message), 30_000); 
        displayMenuItems.set(message.id + 'timeOutDisplayMenu', timeOutDisplayMenu); 
    }
};

// When the client is mentioned.
// It makes response choices.
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        //exclude commands
        if (interaction.isChatInputCommand()) return;

        try {             
            if(
                interaction.customId === 'submit' ||
                interaction.customId === 'message'
            ) {    
                const emoFields = displayMenuItems.get(interaction.message.id + 'emoFields');
                if(interaction.customId === 'submit') {
                    await displayEmoji(
                        interaction.message, 
                        displayMenuItems.get(interaction.message.id + 'emoEmojis').filter(
                        item => item.value === emoFields.emoji).first(), 
                        emoFields.message,
                        displayMenuItems.get(interaction.message.id + 'emoBanners').filter(
                            item => item.value === emoFields.banner).first()
                    );
                } else {
                    displayMenuItems.set(interaction.user.id + 'emoFields', emoFields);
                    displayMenuItems.set(interaction.user.id + 'emoEmojis',
                        displayMenuItems.get(interaction.message.id + 'emoEmojis'));
                    displayMenuItems.set(interaction.user.id + 'emoBanners',
                        displayMenuItems.get(interaction.message.id + 'emoBanners'));
                    await displayModal(interaction, emoFields.message);
                }
            }  else if(interaction.isStringSelectMenu()) {
                const emoFields = displayMenuItems.get(interaction.message.id + 'emoFields');
                
                if(interaction.customId === 'emojiSelect') 
                    emoFields.emoji = interaction.values[0];
                else
                    emoFields.banner = interaction.values[0];
                
                displayMenuItems.delete(interaction.message.id + 'emoFields');
                displayMenuItems.set(interaction.message.id + 'emoFields', emoFields);
                
                await displayMenu(
                    interaction, 
                    displayMenuItems.get(interaction.message.id + 'emoEmojis'),
                    displayMenuItems.get(interaction.message.id + 'emoBanners'),
                    emoFields
                );
            } else if (interaction.isModalSubmit()) {
                interaction.deferReply();
                // get submitted text
                const emoFields = displayMenuItems.get(interaction.user.id + 'emoFields'); 

                await displayEmoji(
                    interaction, 
                    displayMenuItems.get(interaction.user.id + 'emoEmojis').filter(
                    item => item.value === emoFields.emoji).first(), 
                    interaction.fields.getTextInputValue('messageInput'),
                    displayMenuItems.get(interaction.user.id + 'emoBanners').filter(
                        item => item.value === emoFields.banner).first()
                );
                // remove items from displayMenuItems 
                displayMenuItems.delete(interaction.user.id + 'emoFields');
                displayMenuItems.delete(interaction.user.id + 'emoEmojis');
                displayMenuItems.delete(interaction.user.id + 'emoBanners');
            }

            if (!interaction.isModalSubmit()) {
                //keep message window alive
                if(interaction.isStringSelectMenu())  {
                    resetDeleteDisplayMenu(interaction.message);
                } else {
                    // delete message and entries
                    if (interaction.message) {
                        if(displayMenuItems.has(interaction.message.id + 'timeOutDisplayMenu')) {
                            clearTimeout(displayMenuItems.get(interaction.message.id + 'timeOutDisplayMenu'));
                            deleteDisplayMenu(interaction.message);
                        }
                    } 
                }
            } else {
                interaction.deleteReply();
            }
        } catch (error) {
            console.error(error);
            await interaction.reply(
                { 
                    content: 'There was an error while executing an interaction!', 
                    ephemeral: true 
                }
            );
        }
    }
};