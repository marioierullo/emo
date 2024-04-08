const { 
    AttachmentBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} = require('discord.js');
const Canvas = require('@napi-rs/canvas');

//require root directory path
const appRoot = require('app-root-path');

module.exports = {
    displayMenu: async function(message, collectionEmoji) {
        // EMO Select
        const select = new StringSelectMenuBuilder()
        .setCustomId('emoji')
        .setPlaceholder('Elija su reacciòn (emoji Emo sin un mensaje)');
    
        if(collectionEmoji.size > 0)
            collectionEmoji.forEach(collection => {
                select.addOptions(
                    new StringSelectMenuOptionBuilder()
                    .setLabel(collection.label)
                    .setDescription(collection.description)
                    .setValue(collection.value)
                );
            });
        // add components to Row
        const selrow = new ActionRowBuilder().addComponents(select);

        // Button to add text
        // ButtonBuilder
        const btnMessage = new ButtonBuilder()
			.setCustomId('moreoptions')
			.setLabel('Agrega mas opciones de fondo y mensaje')
			.setStyle(ButtonStyle.Primary);

        const btnCancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Retirarse del menu')
			.setStyle(ButtonStyle.Secondary);

        // add components to Row
        const btnrow = new ActionRowBuilder().addComponents(btnMessage, btnCancel);

        // Create a 680x240 pixel canvas and get its context
        // The context will be used to modify the canvas
        const canvas = Canvas.createCanvas(680, 240);
        const context = canvas.getContext('2d');

        try {
            // load banner
            // This uses the canvas dimensions to stretch the image onto the entire canvas
            const background = await Canvas.loadImage(appRoot + '/banners/banner2.png');
            context.drawImage(background, 0, 0, canvas.width, canvas.height);

            // Select the font size and type from one of the natively available fonts
            // Select the style that will be used to fill the text in
            // Actually fill the text with a solid color    
            context.font = 'italic 60px sans-serif';
            context.fillStyle = '#ffffff';
            context.fillText('¡Uyyyyyyyy!', canvas.width / 2.2, canvas.height / 4.2);

            context.font = 'italic 40px sans-serif';
            context.fillStyle = '#ffffff';
            context.fillText('¿Ahora que hago?', canvas.width / 2.2, canvas.height / 2.2);
            
            // Use the helpful Attachment class structure to process the file for you
            const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'displayMenu.png' });

            const displayMenu = await message.channel.send(
                { 
                    content: 'Comando de EMO Reacción:@emo <<reacción>><<::fondo>> <<mensaje>>',
                    files: [attachment],
                    components: [selrow, btnrow]
                }
            );
            return displayMenu;
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
};