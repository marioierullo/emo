const { ModalBuilder, AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

//require root directory path
const appRoot = require('app-root-path');

module.exports = {
    displayMenu: async function(message) {
        const modal = new ModalBuilder()
			.setCustomId('displayMenu')
			.setTitle('EMO Menu');

        // Create a 700x250 pixel canvas and get its context
        // The context will be used to modify the canvas
        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext('2d');
        
        try {
            // load emo image
            const background = await Canvas.loadImage(appRoot + '/images/emoBueh.png');

            // This uses the canvas dimensions to stretch the image onto the entire canvas
            context.drawImage(background, 0, 0, canvas.width, canvas.height);

            // Use the helpful Attachment class structure to process the file for you
            const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'displayMenu.png' });
            
            // display the Menu
            //await message.channel.send('¡Uyyyyy! ¿Ahora que hago?');
            await message.channel.send({ files: [attachment] });
        } catch (error) {
            console.error(error);
            await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }    
};