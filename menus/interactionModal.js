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
        .setCustomId('emoModal')
        .setTitle('EMO Reacción con Mensaje y Fondo');

        //text input
        const messageInput = new TextInputBuilder()
            .setCustomId('messageInput')
            .setLabel("Escribe tu mensaje aquí")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Paragraph)
            .setValue(displayMenuItems.get(interaction.message.id + 'emoFields').message)
            // set the maximum number of characters to allow
	        .setMaxLength(200)
            .setRequired(true);

        // An action row only holds one text input,
        // so you need one action row per text input.
        const messageActionRow = 
            new ActionRowBuilder().addComponents(messageInput);

        // Add inputs to the modal
        modal.addComponents(messageActionRow);
        
        try {
        await interaction.showModal(modal);
        } catch (error) {
            console.error(error);
            await interaction.reply(
                { 
                    content: 'There was an error while showing modal!', 
                    ephemeral: true 
                }
            );
        }
    }   
};