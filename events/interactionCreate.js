const {Events } = require('discord.js');

// When the client is mentioned.
// It makes response choices.
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        if (interaction.isChatInputCommand()) return;

        try {      
            if(interaction.isStringSelectMenu()) {
                console.log('interaction.name:'+interaction);
            } else if(interaction.isButton()) {
                if(interaction.customId === 'cancel') {
                    // Delete the message
                    await interaction.message.delete();
                } else {
                    console.log('interaction.name:'+interaction);
                }
            } else {            
                await interaction.reply(
                    {
                        content: 'Got your interaction:' + interaction,
                        ephemeral: true
                    }
                ); 
            }
        } catch (error) {
            console.error(error);
            await interaction.reply(
                { 
                    content: 'There was an error while executing this command!', 
                    ephemeral: true 
                }
            );
        }
    }
};