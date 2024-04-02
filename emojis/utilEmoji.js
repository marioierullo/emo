const { Collection, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

function collectionEmoji() {    
    const collectionEmoji = new Collection();
    
    // key, value {}
    collectionEmoji.set('bueh', 
        { 
            label: 'Bueh', 
            description: 'Reacciòn de Bueh.', 
            value: 'emoBueh.png' 
        }
    );
    collectionEmoji.set('bueno', 
        { 
            label: 'Bueno', 
            description: 'Reacciòn de Bueno.', 
            value: 'emoBueno.png' 
        }
    );
    collectionEmoji.set('emo', 
        { 
            label: 'Emo', 
            description: 'Emo sin reacciòn.', 
            value: 'emo.png' 
        }
    );

    return collectionEmoji;
};

module.exports = {
    setSelectEmoji: function(collection) {

        const select = new StringSelectMenuBuilder()
        .setCustomId('emoji')
        .setPlaceholder('Elija su reacciòn de Emo');
        if(collection.size > 0)
            for (const key in collection) {
                select.addOptions(
                    new StringSelectMenuOptionBuilder()
                    .setLabel(collection[key].label)
                    .setDescription(collection[key].description)
                    .setValue(collection[key].value)
                );
            }
        return select;
    },
    getEmoji: function(emoji) {
        return collectionEmoji().get(emoji.toLowerCase());
    },
    getCollectionEmoji: function(emoji) 
    {
        if (emoji) {
            const collection = collectionEmoji().filter(
                item => item.label.toLowerCase().includes(emoji.toLowerCase()));
            
            // check for emoji label match
            if(collection && collection.size > 1)
                return collection.find(
                    item => item.label.toLowerCase() === emoji.toLowerCase());
            return collection;
        }
        return collectionEmoji();
    }
};