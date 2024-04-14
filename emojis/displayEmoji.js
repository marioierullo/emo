const { AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

//require root directory path
const appRoot = require('app-root-path');

function textSizeCalculator(context, banner, text) {         
    // Select the font size and type from one of the natively available fonts
    // Select the style that will be used to fill the text in
    // Actually fill the text with a solid color    
    const fontSize = 24;
    context.font = `italic ${fontSize}px sans-serif`;
    context.fillStyle = '#ffffff';

    const textRowWidth = Math.trunc((banner.endTextWidth - banner.startTextWidth) / (fontSize / 2));
    const textRows = Math.trunc(banner.height / banner.textHeight);

    const estimateRows = Math.trunc(text.length / textRowWidth);
    let textRowPos = (estimateRows < textRows) 
        ? Math.abs(banner.height / 2 - banner.textHeight * estimateRows)
        : banner.textHeight;
    let rows = 0;
    do {
        var rowText = text;
        //split text out of boundaries
        if(rowText.length > textRowWidth) {
            rowText = rowText.substring(0,textRowWidth);  
        }

        //check for newline
        if(rowText.includes('\n')) {
            rowText = rowText.substring(0,rowText.indexOf('\n'));
            text = text.replace(rowText + '\n','');
        } else {
            text = text.replace(rowText,'');
 
            //check for possibility to complete a word or remove carry over longer word
            if(text.includes(' ')) {
                const getBlankPos = text.indexOf(' ');
                if(getBlankPos < 3) {
                    const getExtra = text.substring(0,getBlankPos + 1);
                    rowText += getExtra;
                    text = text.replace(getExtra,'');
                }
            } 

            if(rowText.includes(' ')) {
                const getBlankPos = rowText.lastIndexOf(' ');
                if((rowText.length - getBlankPos - 1) < 3) {
                    const removeExtra = 
                        rowText.substring(getBlankPos);
                    rowText = rowText.replace(new RegExp(removeExtra + '$'),'');
                    text = removeExtra.concat(text);
                }
            }
        }

        rowText = rowText.trim();
        text = text.trim();
        if(rowText.length > 0) { 
            if(rowText === text || text.length === 0) {
                if(rows === 0) 
                    rowText = '"' + rowText;
                rows = textRows;
            }
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
    displayEmoji: async function(message, emoji, text, banner, eventType) {
        // Create a 680x320 pixel canvas and get its context
        // The context will be used to modify the canvas
        // Canvas.createCanvas(width, height);
        const canvas = (text)
            ? Canvas.createCanvas(680, 320) 
            : Canvas.createCanvas(128, 128);
        const context = canvas.getContext('2d');
    
        try {    
            // This uses the emoji dimensions 128 x 128
            const emoEmoji = await Canvas.loadImage(appRoot + emoji);
            context.drawImage(emoEmoji, 0, 0, 128, 128);

            // if text is present, add background with text
            if(text) {
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

            if(eventType === 'message')
                await message.channel.send({ files: [attachment] });
            else
                await message.reply({ files: [attachment] });
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