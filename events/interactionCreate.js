const {Events } = require('discord.js');

//require root directory and path to modal object
const appRoot = require('app-root-path');
const {displayEmoji} = require(appRoot + '/emojis/displayEmoji.js');

// When the client is mentioned.
// It makes response choices.
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        //exclude commands
        if (interaction.isChatInputCommand()) return;

        try {  
            if (interaction.isModalSubmit()) {
                console.log('isModalSubmit:'+interaction.customid);
            } else {
                // acknowledge displaymenu interaction
                await interaction.deferReply({ ephemeral: true });

                if(interaction.isStringSelectMenu()) {
                    await displayEmoji(
                        interaction.message, 
                        interaction.values[0]
                    );
                } else if(interaction.isButton()) {
                    if(interaction.customId === 'message') {
                        //create modal
                        console.log('isButton:'+interaction.customId);
                    } 
                }
                // Delete displaymenu
                await interaction.message.delete();
                await interaction.deleteReply();
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