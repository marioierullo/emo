const { Collection } = require('discord.js');

function collectionEmoji() {    
    const collectionEmoji = new Collection();
    
    // key, value {}
    collectionEmoji.set('bueh', 
        { 
            label: 'Bueh', 
            description: 'Reacciòn de Bueh.', 
            value: '/images/emojis/emoBueh.png' 
        }
    );
    collectionEmoji.set('bueno', 
        { 
            label: 'Bueno', 
            description: 'Reacciòn de Bueno.', 
            value: '/images/emojis/emoBueno.png' 
        }
    );
    collectionEmoji.set('emo', 
        { 
            label: 'Emo', 
            description: 'Emo sin reacciòn.', 
            value: '/images/emojis/emo.png' 
        }
    );

    return collectionEmoji;
};

function collectionBanner() {    
    const collectionBanner = new Collection();
    
    // key, value {}
    collectionBanner.set('fondo1', 
        { 
            label: 'Fondo1', 
            description: 'Fondo de algo.', 
            value: '/images/banners/banner1.png',
            textWidth: 420,
            textHeight: 30 
        }
    );
    collectionBanner.set('fondo2', 
        { 
            label: 'Fondo2', 
            description: 'Fondo de algo.', 
            value: '/images/banners/banner2.png',
            textWidth: 420,
            textHeight: 30 
        }
    );

    return collectionBanner;
};

module.exports = {
    getCollectionEmoji: function(emoji) {
        if (emoji) {
            // gather all matches
            const collectionFiltered = collectionEmoji().filter(
                item => item.label.toLowerCase().includes(emoji.toLowerCase()));
            
            if(collectionFiltered) { 
            // check for exact label match
                if(collectionFiltered.size > 1) {
                    const collectionMatched = collectionFiltered.find(
                        item => item.label.toLowerCase() === emoji.toLowerCase());
                    if(collectionMatched)
                        return collectionMatched;
                }
                return collectionFiltered;
            }
        }
        return collectionEmoji();
    },
    getCollectionBanner: function(banner) {
        if (banner) {
            // gather all matches
            const collectionFiltered = collectionBanner().filter(
                item => item.label.toLowerCase().includes(banner.toLowerCase()));
            
            if(collectionFiltered) { 
                // check for exact label match
                    if(collectionFiltered.size > 1) {
                        const collectionMatched = collectionFiltered.find(
                            item => item.label.toLowerCase() === emoji.toLowerCase());
                        if(collectionMatched)
                            return collectionMatched;
                    }
                    return collectionFiltered;
                }
        }
        return collectionBanner();
    }
};