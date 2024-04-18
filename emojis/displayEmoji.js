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

    const estimateRows = Math.trunc(text.length / banner.textRowLength) + 
        (text.match(/\n/g) || []).length;

    let textRowPos; 
    if(estimateRows > 6 && estimateRows < 9)
        textRowPos = banner.textHeight * 2;
    else if(estimateRows > 4 && estimateRows < 7)
        textRowPos = banner.textHeight * 3;
    else if(estimateRows > 2 && estimateRows < 5)
        textRowPos = banner.textHeight * 4;
    else if(estimateRows < 3)
        textRowPos = banner.textHeight * 5;
    else
        textRowPos = banner.textHeight;

    let rows = 0;
    do {
        var rowText = text;
        if(rowText.length > banner.textRowLength) {
            rowText = rowText.substring(0, banner.textRowLength);             
            if(!rowText.includes('\n') && rowText.includes(' ')) {
                var spaceIndex = rowText.lastIndexOf(' ');
                if(spaceIndex < (banner.textRowLength - 1)) 
                    rowText = rowText.substring(0, spaceIndex);
            }
        }
        if(rowText.includes('\n')) {
            rowText = rowText.substring(0, rowText.indexOf('\n'));
            text = text.replace('\n',' ');
        }

        rowText = rowText.trim();
        text = text.replace(rowText,'').trim();
        
        if(rowText.length > 0) { 
            if(text.replaceAll('\n','').trim().length === 0)
                rows = banner.textRows; 
            else
                ++rows;    
            context.fillText(
                ((rows === 1) ? '"' : '') + 
                rowText +  
                ((rows === banner.textRows)? '"' : ''), 
                banner.startTextWidth, textRowPos
            );
            textRowPos += banner.textHeight;
        }
    } while(rows < banner.textRows);
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