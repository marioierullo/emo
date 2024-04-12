const {
    ActionRowBuilder,
    Events, 
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle 
} = require('discord.js');

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
            // modal pop-up called
            if(interaction.customId === 'moreoptions') {
                //create modal
                const modal = new ModalBuilder()
                .setCustomId('modal')
                .setTitle('EMO Reaccion con Mensaje');

                const hobbiesInput = new TextInputBuilder()
                    .setCustomId('hobbiesInput')
                    .setLabel("What's some of your favorite hobbies?")
                    // Paragraph means multiple lines of text.
                    .setStyle(TextInputStyle.Paragraph);

                // An action row only holds one text input,
                // so you need one action row per text input.
                const secondActionRow = 
                    new ActionRowBuilder().addComponents(hobbiesInput);

                // Add inputs to the modal
                modal.addComponents(secondActionRow);
                
                await interaction.showModal(modal);
            } else if (interaction.isModalSubmit()) { // modal submitted
                // modal interaction
                await interaction.deferReply({ ephemeral: true });    
                
                //if(displayMenuItems.has(interaction.message.id+'timeOutDisplayMenu')) {
                    //    console.log('isModalSubmit:'+interaction.message.id);
                    //}
                    console.log('isModalSubmit:');
                    //call timeout?
                    /*
                    await displayEmoji(
                        interaction.message, 
                        interaction.values[0]
                    );
                    */
                    //interaction.reply({ files: [attachment] });
            } else {
                // acknowledge displaymenu
                await interaction.deferReply({ ephemeral: true });
                
                if(interaction.isStringSelectMenu()) {
                    await displayEmoji(
                        interaction.message, 
                        interaction.values[0],
                        displayMenuItems.get(interaction.message.id+'emoFields').message,
                        displayMenuItems.get(interaction.message.id+'emoBanners').random()
                    );
                } 
                // cancel delayed delete message request 
                if(displayMenuItems.has(interaction.message.id+'timeOutDisplayMenu')) {
                    clearTimeout(displayMenuItems.get(interaction.message.id+'timeOutDisplayMenu'));
                    displayMenuItems.delete(interaction.message.id+'timeOutDisplayMenu');
                    displayMenuItems.delete(interaction.message.id+'emoFields');
                    displayMenuItems.delete(interaction.message.id+'emoEmojis');
                    displayMenuItems.delete(interaction.message.id+'emoBanners');
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