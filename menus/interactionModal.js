const {
    ActionRowBuilder, 
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle 
} = require('discord.js');

module.exports = {
    displayModal: async function(interaction) {
        //create modal
        const modal = new ModalBuilder()
        .setCustomId('modal')
        .setTitle('EMO Reacciòn con Mensaje');

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
        
        try {
        await interaction.showModal(modal);
        } catch (error) {
            console.error(error);
            await message.reply(
                { 
                    content: 'There was an error while showing modal!', 
                    ephemeral: true 
                }
            );
        }
    }   
};