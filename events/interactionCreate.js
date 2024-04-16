const { Events} = require('discord.js');

//require root directory and path to modal object
const appRoot = require('app-root-path');
const {displayEmoji} = require(appRoot + '/emojis/displayEmoji.js');
const {deleteDisplayMenu} = require(appRoot + '/menus/displayMenu.js');
const {displayInteractionMenu} = require(appRoot + '/menus/displayInteractionMenu.js');
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
        /*
        console.log('interaction:' + interaction);
        console.log('interaction.id:' + interaction.id);
        console.log('interaction.message:' + interaction.message);
        console.log('interaction.message.id:' + interaction.message.id);
        */
        try {             
            if(interaction.customId === 'submit') {    
                console.log('interaction.customId:' + interaction.customId);
                //call displayEmoji
            } else if(interaction.customId === 'message') {
                console.log('interaction.customId:' + interaction.customId);
                //check if emojiSelect - selected
                // display modal with text input
                await displayModal(interaction);
                //deleteDisplayMenu(interaction.message);
            } else if(interaction.customId === 'cancel') {
                console.log('interaction.customId:' + interaction.customId);
                // delete message and entries
            }  else if(interaction.isStringSelectMenu()) {
                const emoFields = displayMenuItems.get(interaction.message.id + 'emoFields');
                
                if(interaction.customId === 'emojiSelect') 
                    emoFields.emoji = interaction.values[0];
                else
                    emoFields.banner = interaction.values[0];
                
                displayMenuItems.delete(interaction.message.id + 'emoFields');
                displayMenuItems.set(interaction.message.id + 'emoFields', emoFields);
                
                await displayInteractionMenu(
                    interaction, 
                    displayMenuItems.get(interaction.message.id + 'emoEmojis'),
                    displayMenuItems.get(interaction.message.id + 'emoBanners'),
                    emoFields
                );
            } else if (interaction.isModalSubmit()) {
                console.log('interaction.customId:' + interaction.customId);
                // get submitted text
                //const message = interaction.fields.getTextInputValue('messageInput');
            }

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
            /*
            await interaction.deferReply({ ephemeral: true });
            await interaction.deleteReply();                           
            
            const selectEmoji = 
            displayMenuItems.get(interaction.message.id + 'emoEmojis').filter(
                item => item.value === interaction.values[0] 
            );
            await displayEmoji(
                interaction, 
                selectEmoji.first(),
                displayMenuItems.get(interaction.message.id + 'emoFields').message,
                displayMenuItems.get(interaction.message.id + 'emoBanners').random(),
                'message'
            );
            */
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