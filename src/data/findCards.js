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

        // If all colors are false, don't run function
        if (!(color.white || color.blue || color.black || color.red || color.green || color.colorless || color.multi)) {
            // Don't run function

        } else if ( color.multi && color.colorless ) {
            // TODO: If multi AND colorless are true, return zero cards

        } else {
            
            cardList = filterColor(cardList, color);
        }
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

    // Filter out Alternate Art for cards
    cardList = filterAltArt(cardList);

    // Sort the cards 
    cardList = sortCards(cardList);

    // Get the desired properties
    cardList = getCardProperties(cardList, returnOptions);    

    return cardList;
}

/**
 * Filter cards not in specified set.
 * @param {String} cardSet Set code of the card
 * @param {String} set The set that the card needs to match to return true
 * @returns True if cardSet and set match, false otherwise.
 */
 function filterSet(cardSet, set) {

    // Filter cards not in the set
    if (cardSet === set) {
        return true;
    }

    return false;
}

/**
 * Filter out Basic Lands.
 * @param {String} cardTypeLine The type line of the card to check
 * @returns True if the card is not a basic land, false if it is.
 */
function filterBasicLands(cardTypeLine) {

    // Skip basic lands
    if ( cardTypeLine.includes('Basic') && cardTypeLine.includes('Land') ){
        return false;
    }
    
    return true;
}

/**
 * Filter by Color helper function
 * @param {Array} cardColor Array of strings containing the color identities of the card to be checked.
 * @param {Object} searchColors Object containing the boolean values for the desired colors.
 * @returns True if the card colors match the search colors (logic is more complex for multi and colorless).
 * Returns false if the card colors don't match.
 */
function filterColor(cardColor, searchColors) {
        
    // Multi false logic
    if ( !searchColors.multi ) {

        // If the card contains any of the WUBRG colors that are being searched for
        if ((searchColors.white && cardColor.includes('W')) ||
            (searchColors.blue  && cardColor.includes('U')) ||
            (searchColors.black && cardColor.includes('B')) ||
            (searchColors.red   && cardColor.includes('R')) ||
            (searchColors.green && cardColor.includes('G')))
        {
            // Card matches a color
            return true;
        }

        // Check if colorless is true and the card is colorless
        if ( searchColors.colorless && (cardColor.length === 0) ) {

            // Card matches colorless
            return true;
        }
    }

    // Multi true
    else {

        // Check if card has more than one color in color identity
        if ( cardColor.length < 2 ) {

            // Card isn't multi-color
            return false;
        }
        
        // Check if multi is the only color option that is true
        if ( searchColors.multi && 
             !( searchColors.white || searchColors.blue  || searchColors.black || 
                searchColors.red   || searchColors.green || searchColors.colorless )
           )
        {
            // Card is multi-color
            return true;
        }

        // Card must include ALL required colors but may include addtional colors
        const colors = { 'white' : 'W', 'blue'  : 'U', 'black' : 'B', 'red'   : 'R', 'green' : 'G' };
        
        for (const [name, symbol] of Object.entries(colors)) {
            
            // Make sure card has all required colors
            if ( searchColors[name] && !cardColor.includes(symbol) ) {

                // Card doesn't include a required color
                return false;
            } 
        }
        // Card includes all required colors
        return true;
    }

}

/**
 * Check if the card's rarity is in the rarity array
 * @param {String} cardRarity The rarity of the card to be checked.
 * @param {Array} rarity The array of desired rarities.
 * @returns True when the card's rarity is in the rarities array.
 */
function filterRarity(cardRarity, rarity) {

    // Check if the rarity array contains the rarity of the card
    if (rarity.includes(cardRarity)) {
        return true;
    }
    return false;
        
}

/**
 * Checks if the card's booster value and the desired booster value match
 * @param {boolean} cardBooster The card's booster value
 * @param {boolean} booster The desired booster value.
 * @returns True if the desired value for booster and the card's booster value match.
 */
function filterBooster(cardBooster, booster) {

    if (cardBooster === booster) {
        return true;
    }
    return false;
}

/**
 * Sorts a list of MTG Arena cards 
 * @param {Array} cardList The array containing the cards to be sorted.
 * @returns An array of cards sorted by converted mana cost, then alphabetically within each cmc group.
 */
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

/**
 * Searches card for specified search term (includes partial matches).
 * - If advanced is specified, and is true, an advanced search is performed.
 * - Advanced search searches only the card section specified by the string in advancedSearchType.
 * @param {Object} card Card object to search. Only uses name, type_line, oracle_text, and card_faces properties.
 * @param {string} term The search term to match.
 * @param {boolean} advanced Regular search if unspecified or false, advanced search if true.
 * @param {string} advancedSearchType "name", "type_line", and "oracle_text" are the allowed advanced search types.
 * Indicates specific card section to search.
 * @returns 
 */
function filterByTerm(card, term, advanced=false, advancedSearchType=null) {

    // Normal search
    if (!advanced) {

        // Check name
        if ( match(card.name) ) {
            return true;
        }
    
        // Check type line
        if ( match(card.type_line) ) {
            return true;
        }
    
        // Check oracle text
        if (card.oracle_text && match(card.oracle_text)) {
            return true;
        }
    
        // Need to check card faces in order to find some cards
        if (card.card_faces) {
    
            // Check oracle_text for each face
            for (const face of card.card_faces) {
    
                if ( face.oracle_text && match(face.oracle_text) ) {
                    return true;
                }
            }
        }
    }

    // Advanced search
    else {
        switch (advancedSearchType) {

            case "name":
                // Check name only
                if ( match(card.name) ) {
                    return true;
                }
                return false;

            case "type_line":
                // Check type line only
                if ( match(card.type_line) ) {
                    return true;
                }
                return false;

            case "oracle_text": {
                // Check oracle text
                if (card.oracle_text && match(card.oracle_text)) {
                    return true;
                }

                // Need to check card faces in order to find some cards
                if (card.card_faces) {
            
                    // Check oracle_text for each face
                    for (const face of card.card_faces) {
            
                        if ( face.oracle_text && match(face.oracle_text) )
                            return true;
                    }
                }
                return false;
            }

            default:
                return false;
        }
    }
    // False if no match found above
    return false;

    // Helper function to make comparing the search term less verbose. Compares input to search term
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

// Helper function that filters out alternate art
function filterAltArt(cardList) {
    let newCardList = [];

    for (const card of cardList) {

        // Problem cards that require a special filter
        // Realmwalker and Orah buy-a-box promos that also appear in the regular set
        // Special alt art of Reflections of Littjara doesn't appear in-game but has arena_id for some reason
        if (card.arena_id === 75382 || card.arena_id === 75910 || card.arena_id === 75381) {
            // Don't add
            continue;
        }

        // Check if the card has promo types
        if ( card.promo_types ) {

            // TODO: For special sets this might not work (eg mystical archives)
            // if the card doesn't have boosterfun in promo types --> keep it
            if ( card.promo_types.includes("boosterfun") === false ) {

                newCardList.push(card);
            }
        }
        // The card doesn't have promo_types
        else {          

            // Keep the card and push it into the list
            newCardList.push(card);
        }
    }
    
    // Return newCardList
    return newCardList;
}

// export default findCards;
module.exports = findCards;