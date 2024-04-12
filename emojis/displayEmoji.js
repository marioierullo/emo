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

            // This uses the emoji dimensions 128 x 128
            const emoEmoji = await Canvas.loadImage(appRoot + '/images/' + emoji);
            context.drawImage(emoEmoji, 0, 0, 128, 128);

            // if text is present, add emo image and background with text
            if(text) {
                // This uses the canvas dimensions to stretch the image onto the entire canvas
	            context.drawImage(background, 128, 0, canvas.width, canvas.height);

                // Select the font size and type from one of the natively available fonts
                // Select the style that will be used to fill the text in
                // Actually fill the text with a solid color    
                
                context.font = 'italic 20px sans-serif';
                context.fillStyle = '#ffffff';
                context.fillText(text, 
                    canvas.width / 2.2, canvas.height / 4.2);
            }
            
            // Use the helpful Attachment class structure to process the file for you
	        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'emo-image.png'});

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