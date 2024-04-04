const { Collection } = require('discord.js');

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
    getCollectionEmoji: function(emoji) 
    {
        if (emoji) {
            // gather all matches
            const collectionFiltered = collectionEmoji().filter(
                item => item.label.toLowerCase().includes(emoji.toLowerCase()));
            
            // check for exact label match
            if(collectionFiltered && collectionFiltered.size > 1)
            {
                const collectionMatched = collectionFiltered.find(
                    item => item.label.toLowerCase() === emoji.toLowerCase());
                if(collectionMatched)
                    return collectionMatched;
                return collectionFiltered;
            }
        }
        return collectionEmoji();
    }
};