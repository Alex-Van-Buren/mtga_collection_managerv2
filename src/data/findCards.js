// import allArenaCards from './arenaCards20210427172602.json';
const allArenaCards = require('./arenaCards20210427172602.json');

/**
 * 
 * @param {*} searchOptions Object of options to filter the cards on Arena. Define as an object eg{set:'setId', name:'cardName', color: ['W', 'G'] 
 * (color also accepts 'colorless' or 'multi'), rarity: ['rarity1','rarity2'], booster: boolean}
 * @param {*} returnOptions An Array of addtional properties to retrieve eg ['image_uris', 'set', 'cmc', etc]
 * @returns An array of the cards founds with each card as an object with properties: name, arenaId, and the additional properties defined (if found)
 */
function findCards(searchOptions, returnOptions) {
    // TODO: Filter booster still weird, might add a filter alt arts

    const { set, color, rarity, booster, term, excludeBasicLands=true } = searchOptions;
    let cardList = allArenaCards;

    // First filter by set if needed
    if (set) {
        cardList = filterSet(cardList, set);
    }

    // Filter by name if needed
    if (term) {
        cardList = filterByTerm(cardList, term);
    }

    // Filter by color if needed
    if (color) {
        cardList = filterColor(cardList, color);
    }

    // Filter by rarity if needed
    if (rarity) {
        cardList = filterRarity(cardList, rarity);
    }

    // Filter Out Basic Lands
    if (excludeBasicLands) {
        cardList = filterBasicLands(cardList);
    }

    // Filter booster if needed
    if (booster !== undefined) {
        cardList = filterBooster(cardList, booster);
    }

    // Sort the cards 
    cardList = sortCards(cardList);

    // Get the desired properties
    cardList = getCardProperties(cardList, returnOptions);    

    return cardList;
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
        if ( card.type_line.includes('Basic') && card.type_line.includes('Land') ){
            // Skip
        }
        
        else {
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

        // check if the rarity array contains the rarity of the card
        if (rarity.includes(card.rarity))
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

// Helper function that sorts the cards 
function sortCards(cardList) {

    // First sorts alphabetically
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

    // Then by cmc
    cardList.sort( (card1, card2) => {
        return card1.cmc - card2.cmc
    })

    return cardList;
}

// Find cards by name helper function
// - includes partial matches
function filterByTerm(cardList, term) {
    const newCardList = [];
    
    for (const card of cardList) {
        let toPush = false;

        if ( match(card.name) ) {
            toPush = true;
        }
        else if ( match(card.type_line) ) {
            toPush = true;
        }

        else if (card.oracle_text && match(card.oracle_text)) {
            toPush = true;
        }

        // Need to check card faces in order to find some cards
        else if (card.card_faces) {

            // Check oracle_text for each face
            for (const face of card.card_faces) {

                if ( face.oracle_text && match(face.oracle_text) ) {
                    toPush = true;
                    break;
                }
            }
        }

        if (toPush) {
            newCardList.push(card);
        }

    }

    return newCardList;

    // Make check less verbose
    function match(checkText) {
        return checkText.toUpperCase().includes(term.toUpperCase());
    }
}

// Helper function that takes the input cardlist and returns the desired properties of that card to make it easier to use
function getCardProperties(cardList, returnOptions) {
    let newCardList = [];
    cardList.forEach( (card) => {
        
        // initialize card object to add
        let newCard = {};

        // Add the name to the newCard
        // For modal_dfc and adventure cards the desired card name is the name on the front face
        if ( card.layout === 'adventure' || card.layout === 'modal_dfc') {
            newCard.name = card.card_faces[0].name;
        }

        // Otherwise just grab the name from the top level name
        else{
            newCard.name = card.name;
        }

        // Add the arena id to newCard
        newCard.arenaId = card.arena_id;

        // Check for other optional card Properties
        if (returnOptions) {
            returnOptions.forEach((option) => {
                // Check if the option is directly defined
                if( card[option]) {

                    // Then just put the option in the newCard
                    newCard[option] = card[option];
                } 
                // Check if the option is defined under card_faces (using front face)
                else if ( card.card_faces && card.card_faces[0][option]) {
                    
                    // Put option in the newCard
                    newCard[option] = card.card_faces[0][option];

                    // Put the backside option onto key property backside
                    if (!newCard.backside) {
                        newCard.backside = {};
                    }
                    newCard.backside[option] = card.card_faces[1][option];
                }

                // Else the option is not found so do nothing                
            });
        }

        // Add the newCard with desired Properties to newCardList
        newCardList.push(newCard);
    });

    // Return newCardList
    return newCardList;
}

// export default findCards;
module.exports = findCards;