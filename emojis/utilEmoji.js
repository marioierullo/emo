const { Collection } = require('discord.js');

function collectionEmoji() {    
    const collectionEmoji = new Collection();
    
    // key, value {}
    collectionEmoji.set('emo', 
        { 
            label: 'Emo', 
            description: 'Emo sin reacción.', 
            value: '/images/emojis/emo.png' 
        }
    );
    collectionEmoji.set('aaaa', 
        { 
            label: 'Aaaa', 
            description: 'Reacción de Aaaa.', 
            value: '/images/emojis/emoAaaa.png' 
        }
    );
    collectionEmoji.set('asco', 
        { 
            label: 'Asco', 
            description: 'Reacción de Asco.', 
            value: '/images/emojis/emoAsco.png' 
        }
    );
    collectionEmoji.set('bueh', 
        { 
            label: 'Bueh', 
            description: 'Reacción de Bueh.', 
            value: '/images/emojis/emoBueh.png' 
        }
    );
    collectionEmoji.set('bueno', 
        { 
            label: 'Bueno', 
            description: 'Reacción de Bueno.', 
            value: '/images/emojis/emoBueno.png' 
        }
    );
    collectionEmoji.set('desdichado', 
        { 
            label: 'Desdichado', 
            description: 'Reacción de Desdichado.', 
            value: '/images/emojis/emoDesdichado.png' 
        }
    );
    collectionEmoji.set('eeee', 
        { 
            label: 'Eeee', 
            description: 'Reacción de Eeee.', 
            value: '/images/emojis/emoEeee.png' 
        }
    );
    collectionEmoji.set('que', 
        { 
            label: 'Que', 
            description: 'Reacción de Que.', 
            value: '/images/emojis/emoQue.png' 
        }
    );
    collectionEmoji.set('hambre', 
        { 
            label: 'Hambre', 
            description: 'Reacción de Que Hambre.', 
            value: '/images/emojis/emoHambre.png' 
        }
    );
    collectionEmoji.set('lloron', 
        { 
            label: 'Lloron', 
            description: 'Reacción de Lloron.', 
            value: '/images/emojis/emoLloron.png' 
        }
    );
    collectionEmoji.set('loco', 
        { 
            label: 'Loco', 
            description: 'Reacción de Loco.', 
            value: '/images/emojis/emoLoco.png' 
        }
    );
    collectionEmoji.set('mirada', 
        { 
            label: 'Mirada', 
            description: 'Reacción de Mirada Profunda.', 
            value: '/images/emojis/emoMirada.png' 
        }
    );
    collectionEmoji.set('mmmm', 
        { 
            label: 'Mmmm', 
            description: 'Reacción de Mmmm.', 
            value: '/images/emojis/emoMmmm.png' 
        }
    );
    collectionEmoji.set('molesto', 
        { 
            label: 'Molesto', 
            description: 'Reacción de Molesto.', 
            value: '/images/emojis/emoMolesto.png' 
        }
    );
    collectionEmoji.set('naaa', 
        { 
            label: 'Naaa', 
            description: 'Reacción de Naaa.', 
            value: '/images/emojis/emoNaaa.png' 
        }
    );
    collectionEmoji.set('nervioso', 
        { 
            label: 'Nervioso', 
            description: 'Reacción de Nervioso.', 
            value: '/images/emojis/emoNervioso.png' 
        }
    );
    collectionEmoji.set('nooo', 
        { 
            label: 'Nooo', 
            description: 'Reacción de Nooo.', 
            value: '/images/emojis/emoNooo.png' 
        }
    );
    collectionEmoji.set('ohhh', 
        { 
            label: 'Ohhh', 
            description: 'Reacción de Ohhh.', 
            value: '/images/emojis/emoOhhh.png' 
        }
    );
    collectionEmoji.set('oooo', 
        { 
            label: 'Oooo', 
            description: 'Reacción de Oooo.', 
            value: '/images/emojis/emoOooo.png' 
        }
    );
    collectionEmoji.set('perdido', 
        { 
            label: 'Perdido', 
            description: 'Reacción de Perdido.', 
            value: '/images/emojis/emoPerdido.png' 
        }
    );
    collectionEmoji.set('preocupado', 
        { 
            label: 'Preocupado', 
            description: 'Reacción de Preocupado.', 
            value: '/images/emojis/emoPreocupado.png' 
        }
    );
    collectionEmoji.set('sacado', 
        { 
            label: 'Sacado', 
            description: 'Reacción de Sacado.', 
            value: '/images/emojis/emoSacado.png' 
        }
    );
    collectionEmoji.set('triste', 
        { 
            label: 'Triste', 
            description: 'Reacción de Triste.', 
            value: '/images/emojis/emoTriste.png' 
        }
    );
    collectionEmoji.set('uuuu', 
        { 
            label: 'Uuuu', 
            description: 'Reacción de Uuuu.', 
            value: '/images/emojis/emoUuuu.png' 
        }
    );
    collectionEmoji.set('uyyy', 
        { 
            label: 'Uyyy', 
            description: 'Reacción de Uyyy.', 
            value: '/images/emojis/emoUyyy.png' 
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
            description: 'Sentado, encojimiento de hombros.', 
            value: '/images/banners/banner1.png',
            height: 320,
            startTextWidth: 380,
            endTextWidth: 680,
            textHeight: 30 
        }
    );
    collectionBanner.set('fondo2', 
        { 
            label: 'Fondo2', 
            description: 'Toma de cerca, aterrorizado.', 
            value: '/images/banners/banner2.png',
            height: 320,
            startTextWidth: 380,
            endTextWidth: 680,
            textHeight: 30 
        }
    );
    collectionBanner.set('fondo3', 
        { 
            label: 'Fondo3', 
            description: 'Fotocopia, ojos cerrados.', 
            value: '/images/banners/banner3.png',
            height: 320,
            startTextWidth: 380,
            endTextWidth: 680,
            textHeight: 30 
        }
    )
    collectionBanner.set('fondo4', 
        { 
            label: 'Fondo4', 
            description: 'Fotocopia, sonrisa forzada.', 
            value: '/images/banners/banner4.png',
            height: 320,
            startTextWidth: 380,
            endTextWidth: 680,
            textHeight: 30 
        }
    );
    collectionBanner.set('fondo5', 
        { 
            label: 'Fondo5', 
            description: 'Pecera, parecerse a un pez.', 
            value: '/images/banners/banner5.png',
            height: 320,
            startTextWidth: 380,
            endTextWidth: 680,
            textHeight: 30 
        }
    );
    collectionBanner.set('fondo6', 
        { 
            label: 'Fondo6', 
            description: 'Con las manos arriba.', 
            value: '/images/banners/banner6.png',
            height: 320,
            startTextWidth: 360,
            endTextWidth: 680,
            textHeight: 30 
        }
    );
    collectionBanner.set('fondo7', 
        { 
            label: 'Fondo7', 
            description: 'Manejando, con un tazòn rojo.', 
            value: '/images/banners/banner7.png',
            height: 320,
            startTextWidth: 380,
            endTextWidth: 680,
            textHeight: 30 
        }
    );
    collectionBanner.set('fondo8', 
        { 
            label: 'Fondo8', 
            description: 'Artes y Oficios.', 
            value: '/images/banners/banner8.png',
            height: 320,
            startTextWidth: 380,
            endTextWidth: 680,
            textHeight: 30 
        }
    );
    collectionBanner.set('fondo9', 
        { 
            label: 'Fondo9', 
            description: 'Tenedor pegado en la cabeza.', 
            value: '/images/banners/banner9.png',
            height: 320,
            startTextWidth: 380,
            endTextWidth: 680,
            textHeight: 30 
        }
    );
    collectionBanner.set('fondo10', 
        { 
            label: 'Fondo10', 
            description: 'Dedo en té caliente.', 
            value: '/images/banners/banner10.png',
            height: 320,
            startTextWidth: 380,
            endTextWidth: 680,
            textHeight: 30 
        }
    );
    collectionBanner.set('fondo11', 
        { 
            label: 'Fondo11', 
            description: 'Sorprendido, en la playa.', 
            value: '/images/banners/banner11.png',
            height: 320,
            startTextWidth: 380,
            endTextWidth: 680,
            textHeight: 30 
        }
    );
    collectionBanner.set('fondo12', 
        { 
            label: 'Fondo12', 
            description: 'Posando, en la playa.', 
            value: '/images/banners/banner12.png',
            height: 320,
            startTextWidth: 380,
            endTextWidth: 680,
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
            
            if(collectionFiltered.size > 0) { 
                // check for exact label match
                if(collectionFiltered.size > 1) {
                    const collectionMatched = collectionFiltered.filter(
                        item => item.label.toLowerCase() === emoji.toLowerCase());   
                    if(collectionMatched.size > 0)
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

            if(collectionFiltered.size > 0) { 
                // check for exact label match
                if(collectionFiltered.size > 1) {
                    const collectionMatched = collectionFiltered.filter(
                        item => item.label.toLowerCase() === banner.toLowerCase());   
                    if(collectionMatched.size > 0)
                        return collectionMatched;
                }
                return collectionFiltered;
            }
        }
        return collectionBanner();
    }
};