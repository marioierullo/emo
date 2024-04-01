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
    getEmoji: function(key) {
        return collectionEmoji().get(key.toLowerCase());
    },
    getCollectionEmoji: function(emoji) {
        return collectionEmoji().filter(
            (collection) => collection.label.toLowerCase().includes(emoji.toLowerCase())
        );
    }
};