module.exports = {
    displayMenu: async function(message){
        try {
            await message.channel.send('¡Uyyyyy! ¿Ahora que hago?');
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