const { Collection, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

function collectionEmoji() {    
    const collectionEmoji = new Collection();
    
    // key, value {}
    collectionEmoji.set('bueh', 
        { 
            label: 'Bueh', 
            description: 'Reaccion de Bueh.', 
            value: 'emoBueh.png' 
        }
    );
    collectionEmoji.set('bueno', 
        { 
            label: 'Bueno', 
            description: 'Reaccion de Bueno.', 
            value: 'emoBueno.png' 
        }
    );
    collectionEmoji.set('emo', 
        { 
            label: 'Emo', 
            description: 'Emo sin reaccion.', 
            value: 'emo.png' 
        }
    );

    return collectionEmoji;
};

module.exports = {
    setSelectEmoji: function(collection) {
        const select = new StringSelectMenuBuilder()
        .setCustomId('emoji')
        .setPlaceholder('Elija su emoji');
        
        select.addOptions(
            new StringSelectMenuOptionBuilder()
            .setLabel('Bueh')
            .setDescription('reaccion de Bueh.')
            .setValue('emoBueh.png')
        );

        return select;
        /*
        .addOptions(
                new StringSelectMenuOptionBuilder()
                .setLabel('Bueh')
                .setDescription('reaccion de Bueh.')
                .setValue('emoBueh.png'),
                new StringSelectMenuOptionBuilder()
                .setLabel('Bueh')
                .setDescription('reaccion de Bueh.')
                .setValue('emoBueh.png')
        );
        */
    },
    getEmoji: function(emoji) {
        return collectionEmoji().get(emoji.toLowerCase());
    },
    getCollectionEmoji: function(emoji = '') 
    {
        if (emoji) {
            const collection = collectionEmoji().filter(
                (item) => item.label.toLowerCase().includes(emoji.toLowerCase())            
            );
            if(collection && collection.size > 1)
                return collection.find(item => item.label.toLowerCase() === emoji.toLowerCase());
            return collection;
        }
        return collectionEmoji();
    }
};