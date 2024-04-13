const {Events} = require('discord.js');

//require root directory and path to modal object
const appRoot = require('app-root-path');
const {deleteDisplayMenu} = require(appRoot + '/menus/displayMenu.js');
const {displayEmoji} = require(appRoot + '/emojis/displayEmoji.js');
const {displayModal} = require(appRoot + '/menus/interactionModal.js');

// When the client is mentioned.
// It makes response choices.
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        //exclude commands
        if (interaction.isChatInputCommand()) return;

        try {             
            // modal pop-up called via button click
            if(interaction.customId === 'moreoptions') {
                await displayModal(interaction);
            } else {
                // acknowledge displaymenu
                await interaction.deferReply({ ephemeral: true });
                
                if(interaction.isStringSelectMenu()) {
                    await displayEmoji(
                        interaction.message, 
                        interaction.values[0],
                        displayMenuItems.get(interaction.message.id+'emoFields').message,
                        displayMenuItems.get(interaction.message.id+'emoBanners').random(),
                        'message'
                    );
                } else if (interaction.isModalSubmit()) { // modal submitted                    
                        console.log('isModalSubmit:');
                        /*
                        await displayEmoji(
                            interaction, 
                            interaction.values[0],
                            displayMenuItems.get(interaction.message.id+'emoFields').message,
                            displayMenuItems.get(interaction.message.id+'emoBanners').random(),
                            'interaction'
                        );
                        */
                }

                if (!interaction.isModalSubmit())
                    await interaction.deleteReply();
            }

            // cancel delayed delete message request 
            if (!interaction.isModalSubmit() && interaction.message.id) {
                if(displayMenuItems.has(interaction.message.id+'timeOutDisplayMenu')) {
                    clearTimeout(displayMenuItems.get(interaction.message.id+'timeOutDisplayMenu'));
                    deleteDisplayMenu(interaction.message);
                }
            }
        } catch (error) {
            console.error(error);
            await interaction.reply(
                { 
                    content: 'There was an error while executing this command!', 
                    ephemeral: true 
                }
            );
        }
    }
};