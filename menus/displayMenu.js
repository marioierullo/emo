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
    displayMenu: async function(message, selectEmoji, selectBanner, banner) {
        //emoji select
        const emojiSelect = new StringSelectMenuBuilder()
        .setCustomId('emojiSelect')
        .setPlaceholder('Elija su reacción de emoji Emo');
    
        selectEmoji.forEach(
            collection => {
                emojiSelect.addOptions(
                    new StringSelectMenuOptionBuilder()
                    .setLabel(collection.label)
                    .setDescription(collection.description)
                    .setValue(collection.value)
                );
            }
        );

        // add components to Row
        const emojiActionRow = 
            new ActionRowBuilder().addComponents(emojiSelect);

        //banner select
        const bannerSelect = new StringSelectMenuBuilder()
        .setCustomId('bannerSelect')
        .setPlaceholder('Elija su fondo de mensaje Emo');
    
        selectBanner.forEach(
            collection => {
                bannerSelect.addOptions(
                    new StringSelectMenuOptionBuilder()
                    .setLabel(collection.label)
                    .setDescription(collection.description)
                    .setValue(collection.value)
                );
            }
        );

        bannerSelect.options.every(option => { 
            if(option.data.value === banner) {
                option.setDefault(true);
                return false;
            }
            return true;
        });

        // add components to Row
        const bannerActionRow = 
            new ActionRowBuilder().addComponents(bannerSelect);

        // Button to add text
        const btnMessage = new ButtonBuilder()
			.setCustomId('message')
			.setLabel('Agrega su mensaje')
			.setStyle(ButtonStyle.Primary);

        const btnSubmit = new ButtonBuilder()
			.setCustomId('submit')
			.setLabel('Envía sus opciones')
			.setStyle(ButtonStyle.Primary);

        const btnCancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Salir del menú')
			.setStyle(ButtonStyle.Secondary);

        // add components to Row
        const buttonsActionRow = 
            new ActionRowBuilder().addComponents(btnMessage, btnSubmit, btnCancel);

        // Create a 680x320 pixel canvas and get its context
        // The context will be used to modify the canvas
        // Canvas.createCanvas(width, height);
        const canvas = Canvas.createCanvas(680, 320);
        const context = canvas.getContext('2d');

        try {
            // load banner
            // This uses the canvas dimensions to stretch the image onto the entire canvas
            const background = await Canvas.loadImage(appRoot + banner);
            context.drawImage(background, 0, 0, canvas.width, canvas.height);

            context.font = 'italic 40px sans-serif';
            context.fillStyle = '#ffffff';
            context.fillText('"!Uyyyyyyyyy¡"', canvas.width / 2, canvas.height / 3);
            context.fillText('"¿Ahora, que', canvas.width / 2, canvas.height / 2);
            context.fillText('hago?"', canvas.width / 2, canvas.height / 1.5);

            context.font = 'bold 20px sans-serif';
            context.fillText('Comando de Emo Reacción:', 30, canvas.height - 10);

            context.font = '18px sans-serif';
            context.fillText('@emo <', 300, canvas.height - 10);

            context.font = 'bold italic 18px sans-serif';
            context.fillText('reacción', 370, canvas.height - 10);

            context.font = '18px sans-serif';
            context.fillText('><', 444, canvas.height - 10);

            context.font = 'bold italic 18px sans-serif';
            context.fillText('::fondo', 464, canvas.height - 10);

            context.font = '18px sans-serif';
            context.fillText('> <', 528, canvas.height - 10);

            context.font = 'bold italic 18px sans-serif';
            context.fillText('mensaje', 554, canvas.height - 10);

            context.font = '18px sans-serif';
            context.fillText('>', 626, canvas.height - 10);

            // Use the helpful Attachment class structure to process the file for you
            const attachment = new AttachmentBuilder(
                await canvas.encode('png'), { name: 'displayMenu.png' }
            );
        
            const displayMenu = await message.channel.send(
                { 
                    files: [attachment],
                    components: [emojiActionRow,bannerActionRow, buttonsActionRow]
                }
            );
            return displayMenu;
        } catch (error) {
            console.error(error);
            await message.reply(
                { 
                    content: 'There was an error while executing displayMenu!', 
                    ephemeral: true 
                }
            );
        }
    }, 
    deleteDisplayMenu: function(message) {
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
                        content: 'There was an error while auto-deleting emo display menu!', 
                        ephemeral: true 
                    }
                );
            }
        }
    }    
};