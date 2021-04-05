// import allArenaCards from './arenaCards20210314173019.json';
const allArenaCards = require('./arenaCards20210323000926.json');

function findCards(searchOptions) {
    // TODO: Add finalList return options (eg return the img src, cmc, etc.  for each card as well as the name and arenaID )
    // TODO: Filter booster still weird, might add a filter alt arts

    const { set, color, rarity, booster, name } = searchOptions;
    let cardList = allArenaCards;

    // First filter by set if needed
    if (set) {
        cardList = filterSet(cardList, set);
    }

    // Filter by name if needed
    if (name) {
        cardList = filterByName(cardList, name);
    }

    // Filter Out Basic Lands
    cardList = filterBasicLands(cardList);

    // Filter by color if needed
    if (color) {
        cardList = filterColor(cardList, color);
    }

    // Filter by rarity if needed
    if (rarity) {
        cardList = filterRarity(cardList, rarity);
    }

    // Filter booster if needed
    if (booster !== undefined) {
        cardList = filterBooster(cardList, booster);
    }

    let finalCardList = [];
    cardList.forEach( (card) => {
        finalCardList.push({name: card.name, arenaId: card.arena_id});
    });
    
    // Sort the cards alphabetically
    finalCardList = sortCards(finalCardList);

    return finalCardList;
}

// Filter Set helper function
function filterSet(cardList, set) {
    let newCardList = [];
    cardList.forEach( (card) => {
        if (card.set === set) {
            newCardList.push(card);
        }
    });

    return newCardList;
}

// Filter Out Basic lands helper funciton
function filterBasicLands(cardList) {
    let newCardList = []
    cardList.forEach( (card) => {
        if ( !(card.type_line.includes('Basic Land')) ){
            newCardList.push(card);
        }
    });

    return newCardList
}

// Filter by Color helper function
function filterColor(cardList, searchColors){
    let newCardList= [];

    cardList.forEach( (card) => {

        // Check for colorless
        if (searchColors[0] === 'colorless') {

            /* Edge Case cards with multiple faces where the color is stored under card.card_faces[front, back].color */
            // Using front face for color
            if (!card.colors && card.card_faces) {
                // Colorless cards have nothing in their color array
                if (card.card_faces[0].colors.length === 0) {
                    newCardList.push(card);
                }
            }

            // Colorless cards have nothing in their color array
            else if (card.colors.length === 0) {
                newCardList.push(card);
            }
        }

        // Check for all multicolored cards
        else if (searchColors[0] === 'multi') {

            /* Edge Case cards with multiple faces where the color is stored under card.card_faces[front, back].color */
            // Using front face for color
            if (!card.colors && card.card_faces) {

                // Multi-colored cards have more that 1 color in their colors array
                if (card.card_faces[0].colors.length > 1) {
                    newCardList.push(card);
                }
            }

            // Multi-colored cards have more that 1 color in their colors array
            else if (card.colors.length > 1) {
                newCardList.push(card);
            }
        }

        // Normal color search

        // Edge Case cards with multiple faces where the color is stored under card.card_faces[front, back].color
        // using front face for color
        else if (!card.colors && card.card_faces) {

            // Check if the card has the same number of colors
            if (card.card_faces[0].colors.length === searchColors.length
                && card.card_faces[0].colors[0] === searchColors[0]) {

                // Initialize boolean to add this card
                let addCard = true;

                // Loop through each input color that is being filtered
                for (const searchColor of searchColors) {

                    // If the card doesn't contain the color make addCard false
                    if ( !card.card_faces[0].colors.includes(searchColor) ) {
                        addCard = false;
                        break; // break if it doesn't include all of the desired colors
                    }
                }

                // Use the addCard boolean to determine if the card should be added to newCardList
                if (addCard) {
                    newCardList.push(card);
                }
            }
        }

        // Check if the card has the same number of colors
        else if ( card.colors.length === searchColors.length ) {

            // Initialize boolean to add this card
            let addCard = true;

            // Loop through each input color that is being filtered
            for (const searchColor of searchColors) {

                // If the card doesn't contain the color make addCard false
                if (!card.colors.includes(searchColor)) {
                    addCard = false;
                    break; // break if it doesn't include all of the desired colors
                }
            }

            // Use the addCard boolean to determine if the card should be added to newCardList
            if (addCard) {
                newCardList.push(card);
            }
        }
    });

    return newCardList;
}

// Filter by rarity helper function
function filterRarity(cardList, rarity) {
    let newCardList = [];
    cardList.forEach( (card) => {

        if (card.rarity === rarity)
            newCardList.push(card);
    });

    return newCardList;
}

// Filter by booster boolean value helper function
function filterBooster(cardList, booster) {
    let newCardList = [];

    // If booster true, just put cards in list if card.booster is true
    if (booster === true) {
        cardList.forEach( (card) => {
            if (card.booster === booster) {
                newCardList.push(card);
            }
        });
    }

    // If booster is false, card needs to have card.booster= false and card.promo_types NOT contain "boosterfun"
    if (booster === false) {

        cardList.forEach( (card) => {

            // Check if it has property promo_types
            if (card.promo_types) {
                if (card.booster === booster && card.promo_types.includes("boosterfun") === false) {
                    newCardList.push(card);
                }

            // If it doesn't have card.promo_types just check if the booster property is correct
            } else {
                if ( card.booster === booster) {
                    newCardList.push(card);
                }
            }

        });
    }

    return newCardList;
}

// Helper function that sorts the cards alphabetically
function sortCards(cardList) {
    cardList.sort( (card1, card2) => {
        const name1 = card1.name.toUpperCase(); // ignore upper and lowercase
        const name2 = card2.name.toUpperCase();

        if (name1 < name2)
            return -1
        if (name1 > name2)
            return 1
        // Names are equal
        return 0
    });

    return cardList;
}

// Find cards by name helper function
function filterByName(cardList, name) {
    let newCardList = [];
    cardList.forEach( (card) => {
        
        if (card.name === name) {
            newCardList.push(card);
        }

        // Need to check card faces in order to find some cards
        if (card.card_faces) {
            card.card_faces.forEach( (face) => {
                if (face.name === name) {
                    newCardList.push( card );
                }
            });
        }
    });

    return newCardList;
}

// export default findCards;
module.exports = findCards;