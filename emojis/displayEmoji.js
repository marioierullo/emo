const { AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

//require root directory path
const appRoot = require('app-root-path');

module.exports = {
    displayEmoji: async function(message, emoji, text, banner) {
        // Create a 680x240 pixel canvas and get its context
        // The context will be used to modify the canvas
        const canvas =
            (text)? Canvas.createCanvas(680, 240) : Canvas.createCanvas(128, 128);
        const context = canvas.getContext('2d');
    
        try {    
            // load background as banner or emo image
            const background = (text)
            ? await Canvas.loadImage(appRoot + '/banners/' + banner)
            : await Canvas.loadImage(appRoot + '/images/' + emoji);

            // This uses the canvas dimensions to stretch the image onto the entire canvas
	        context.drawImage(background, 0, 0, canvas.width, canvas.height);

            // if text is present, add emo image over background
            if(text) {
                //const emoOverlay = await Canvas.loadImage(appRoot + '/images/' + emoji);
                //context.drawImage(emoOverlay, 0, 0, 128, 128);
            }
            
            // Use the helpful Attachment class structure to process the file for you
	        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: emoji});

            await message.channel.send({ files: [attachment] });
        } catch (error) {
            console.error(error);
            if (message.replied || message.deferred) {
                await message.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }    
};