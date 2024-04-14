const {Events} = require('discord.js');

//require root directory and path to modal object
const appRoot = require('app-root-path');
const {getCollectionEmoji, getCollectionBanner} = require(appRoot + '/emojis/utilEmoji.js');
const {displayEmoji} = require(appRoot + '/emojis/displayEmoji.js');
const {deleteDisplayMenu} = require(appRoot + '/menus/displayMenu.js');
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
                if(interaction.isStringSelectMenu()) {
                    const selectEmoji = 
                    displayMenuItems.get(interaction.message.id+'emoEmojis').filter(
                        item => item.value === interaction.values[0] 
                    );
                    await displayEmoji(
                        interaction, 
                        selectEmoji.first(),
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
                            'message'
                        );
                        */
                } else {
                    // acknowledge displaymenu
                    //await interaction.deferReply({ ephemeral: true });
                    //await interaction.deleteReply();
                }      
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