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

function writeText(context, shiftWidth){
    const canvas = context.canvas;

    context.font = 'italic 40px sans-serif';
    context.fillStyle = '#ffffff';
    context.fillText('"¡Uyyyyyyyyy!"', canvas.width / 2 + 20, canvas.height / 3);
    context.fillText('"¿Ahora, que', canvas.width / 2 + 20, canvas.height / 2);
    context.fillText('hago?"', canvas.width / 2 + 20, canvas.height / 1.5);
    
    var commandTitleFontSize = 20;
    var commandFontSize = 18;
    var commandTextWidthTitle = 0; 
    var commandTextWidth = 0;
    var commandSubTextWidth = 0;
    var commandSubTextWidth2 = 0;
    var commandSubTextWidth3 = 0;
    if(shiftWidth === 128) {
        commandTitleFontSize = 17;
        commandFontSize = 15;
        commandTextWidthTitle = shiftWidth - 26;
        commandTextWidth = commandTextWidthTitle - 40;
        commandSubTextWidth = commandTextWidth - 14;
        commandSubTextWidth2 = commandSubTextWidth - 4;
        commandSubTextWidth3 = commandSubTextWidth2 - 2;  
    }
    context.font = `bold ${commandTitleFontSize}px sans-serif`;
    context.fillText('Comando de Emo Reacción:', 30 + commandTextWidthTitle, canvas.height - 10);

    context.font = `${commandFontSize}px sans-serif`;
    context.fillText('@emo <', 300 + commandTextWidth, canvas.height - 10);

    context.font = 'bold italic 18px sans-serif';
    context.fillText('reacción', 370 + commandSubTextWidth, canvas.height - 10);

    context.font = `${commandFontSize}px sans-serif`;
    context.fillText('><', 444 + commandSubTextWidth, canvas.height - 10);

    context.font = 'bold italic 18px sans-serif';
    context.fillText('::fondo', 464 + commandSubTextWidth2, canvas.height - 10);

    context.font = `${commandFontSize}px sans-serif`;
    context.fillText('> <', 528 + commandSubTextWidth2, canvas.height - 10);

    context.font = 'bold italic 18px sans-serif';
    context.fillText('mensaje', 554 + commandSubTextWidth3, canvas.height - 10);

    context.font = `${commandFontSize}px sans-serif`;
    context.fillText('>', 626 + commandSubTextWidth3, canvas.height - 10);
};

module.exports = {
    displayInteractionMenu: async function(interaction, selectEmoji, selectBanner, emoFields) {
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

        let emoLabel = '';
        emojiSelect.options.every(option => { 
            if(option.data.value === emoFields.emoji) {
                option.setDefault(true);
                emoLabel = option.data.label;
                return false;
            }
            return true;
        });

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
            if(option.data.value === emoFields.banner) {
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
            var shiftWidth = 0;
            if(emoLabel.length > 0) {
            // This uses the emoji dimensions 128 x 128
                const emoEmoji = await Canvas.loadImage(appRoot + emoFields.emoji);
                context.drawImage(emoEmoji, 0, 0, 128, 128);

                // Select the font size and type from one of the natively available fonts
                // Select the style that will be used to fill the text in
                // Actually fill the text with a solid color    
                var fontSize = 24;
                var fontWidth = 28;
                if(emoLabel.length > 5 && emoLabel.length < 9 ) {
                    fontSize = 20;
                    fontWidth = 14;
                } else if(emoLabel.length > 8) {
                    fontSize = 20;
                    fontWidth = 0;
                }

                context.font = `italic ${fontSize}px sans-serif`;
                context.fillStyle = '#ffffff';
                context.fillText('"' + emoLabel + '"', fontWidth, 160);

                shiftWidth = 128;
            }

            // load banner
            // This uses the canvas dimensions to stretch the image onto the entire canvas
            const background = await Canvas.loadImage(appRoot + emoFields.banner);
            context.drawImage(background, shiftWidth, 0, canvas.width, canvas.height);
            writeText(context, shiftWidth);

            // Use the helpful Attachment class structure to process the file for you
            const attachment = new AttachmentBuilder(
                await canvas.encode('png'), { name: 'displayMenu.png' }
            );
            
            await interaction.update(
                {
                    files: [attachment],
                    components: [emojiActionRow,bannerActionRow, buttonsActionRow]
                }
            );
        } catch (error) {
            console.error(error);
            await interaction.reply(
                { 
                    content: 'There was an error while executing displayInteractionMenu!', 
                    ephemeral: true 
                }
            );
        }
    }    
};