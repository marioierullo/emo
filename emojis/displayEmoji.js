const { AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

//require root directory path
const appRoot = require('app-root-path');

function textSizeCalculator(context, banner, text) {         
    // Select the font size and type from one of the natively available fonts
    // Select the style that will be used to fill the text in
    // Actually fill the text with a solid color    
    context.font = 'italic 24px sans-serif';
    context.fillStyle = '#ffffff';

    const textRowWidth = 26;
    const textRows = Math.trunc(banner.height / banner.textHeight);
    const estimateRows = Math.trunc(text.length / textRowWidth);

    let textRowPos = (estimateRows < textRows) 
        ? Math.abs(banner.height / 2 - banner.textHeight * estimateRows)
        : banner.textHeight;
    
    let rows = 0;
    do {
        var rowText = text;
        if(rowText.length > textRowWidth) 
            rowText = rowText.substring(0, textRowWidth);             
        if(rowText.includes('\n')) {
            rowText = rowText.substring(0, rowText.indexOf('\n'));
            text = text.replace('\n',' ');
        }
        if(rowText.includes(' ')) {
            var spaceIndex = rowText.lastIndexOf(' ');
            if(spaceIndex < (textRowWidth - 1)) 
                rowText = rowText.substring(0, spaceIndex);
        }

        rowText = rowText.trim();
        text = text.replace(rowText,'').trim();
        
        if(rowText.length > 0) { 
            if(
                rowText.length === text.length || 
                text.replaceAll('\n','').trim().length === 0
            )
                rows = textRows; 
            else
                ++rows;    
            context.fillText(
                ((rows === 1) ? '"' : '') + 
                rowText +  
                ((rows === textRows)? '"' : ''), 
                banner.startTextWidth, textRowPos
            );
            textRowPos += banner.textHeight;
        }
    } while(rows < textRows);
};

module.exports = {
    displayEmoji: async function(message, emoji, text, banner) {
        // Create a 680x320 pixel canvas and get its context
        // The context will be used to modify the canvas
        // Canvas.createCanvas(width, height);
        const canvas = (text)
            ? Canvas.createCanvas(680, 320) 
            : Canvas.createCanvas(128, 128);
        const context = canvas.getContext('2d');

        try {    
            // This uses the emoji dimensions 128 x 128
            const emoEmoji = await Canvas.loadImage(appRoot + emoji.value);
            context.drawImage(emoEmoji, 0, 0, 128, 128);

            // if text is present, add background with text
            if(text) {
                // Select the font size and type from one of the natively available fonts
                // Select the style that will be used to fill the text in
                // Actually fill the text with a solid color    
                var fontSize = 24;
                var fontWidth = 28;
                if(emoji.label.length > 5 && emoji.label.length < 9 ) {
                    fontSize = 20;
                    fontWidth = 14;
                } else if(emoji.label.length > 8) {
                    fontSize = 20;
                    fontWidth = 0;
                }
                     
                context.font = `italic ${fontSize}px sans-serif`;
                context.fillStyle = '#ffffff';
                context.fillText('"' + emoji.label + '"', fontWidth, 160);

                // load background as banner
                const background = await Canvas.loadImage(appRoot + banner.value);
                // This uses the canvas dimensions to stretch the image onto the entire canvas
	            context.drawImage(background, 128, 0, canvas.width, canvas.height);
                
                //text width size calculator
                textSizeCalculator(context, banner, text);  
            }         
            // Use the helpful Attachment class structure to process the file for you
	        const attachment = new AttachmentBuilder(
                await canvas.encode('png'), { name: 'displayEmoji.png'}
            );

            await message.channel.send({ files: [attachment] });

        } catch (error) {
            console.error(error);
            await interaction.reply(
                { 
                    content: 'There was an error while executing displayEmoji!', 
                    ephemeral: true 
                }
            );
        }
    }    
};