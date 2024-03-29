import arenaCards from "./arenaCards";

//  const allArenaCards = require('./arenaCards20210719155815.json')
/**
 * 
 * @param {*} searchOptions Object of options to filter the cards on Arena. Define as an object eg{set:'setId', name:'cardName', color: ['W', 'G'] 
 * (color also accepts 'colorless' or 'multi'), rarity: ['rarity1','rarity2'], booster: boolean}
 * @param {*} returnOptions An Array of addtional properties to retrieve eg ['image_uris', 'set', 'cmc', etc]
 * @param {} searchCards Optional. A List of card objects to search. Defaults to all cards on arena.
 * @param {boolean} sort Optional. Boolean to sort the found cards. Defaults to true.
 * @returns An array of the cards found
 */
function findCards(searchOptions, searchCards=arenaCards, sort=true) {

    // Destructure search options
    const { set, color, rarity, booster, term, advancedSearchType=null, excludeBasicLands=true, cmcs, deckType, cardTypes, addType } = searchOptions;

    /**
     * An array of ananymous functions to be called on each card
     * - Each function must take ONLY the card as a parameter.
     * @param {Object} card The card to be tested.
     */
    const filterFunctions = [];

/* DETERMINE WHICH FUNCTIONS NEED TO BE CALLED ON EACH CARD */

    // Only show Companions if requested
    if (addType === "companion") {
        filterFunctions.push( (card) => filterCompanions(card.keywords));
    }

    // Only show Commanders if requested
    if (addType === "commander") {
        filterFunctions.push( (card) => filterCommanders(card.type_line));
    }

    // Filter by set if needed
    if (set) {
        filterFunctions.push( (card) => filterSet(card.set, set) );
    }

    // Filter by name if needed
    if (term) {
        filterFunctions.push( (card) => filterByTerm(card, term, advancedSearchType) );
    }

    // Filter by color if needed
    if (color) {

        // If all colors are false, don't filter by color
        if (!(color.white || color.blue || color.black || color.red || color.green || color.colorless || color.multi)) {
            // Don't add function

        }
        // If multi AND colorless are selected, 0 cards returned from findCards function
        else if ( color.multi && color.colorless ) {
            
            // Exit filterFunction definition and return empty array
            return [];

        } else {
            filterFunctions.push( (card) => filterColor(card.color_identity, color) );
        }
    }

    // Filter by rarity if needed
    if (rarity) {
        filterFunctions.push( (card) => filterRarity(card.rarity, rarity) );
    }

    // Filter Out Basic Lands OR only show basic lands
    filterFunctions.push( (card) => filterBasicLands(card.type_line, excludeBasicLands) );

    // Filter booster if needed
    if (booster !== undefined) {
        filterFunctions.push( (card) => filterBooster(card.booster, booster) );
    }

    // Filter cmc if needed
    if (cmcs) {      
        filterFunctions.push( (card) => filterCMC(card.cmc, cmcs) );
    }

    // Filter Card legality if needed
    if ( deckType ) {
        filterFunctions.push( (card) => filterLegality( deckType, card.legalities));
    }

    // Filter Card Types if needed
    if ( cardTypes ) {
        filterFunctions.push( (card) => filterCardTypes(card.type_line, cardTypes));
    }

/* Call each chosen filter function on each card */

    // Card list will hold chosen cards
    let cardList = [];

    for (const card of searchCards) { // Loop over cards
        let addCard = true;

        for (let i=0; i<filterFunctions.length; i++) { // Loop over filter functions

            // Call filter function on card and stop calling filter functions if one returns false
            if (!filterFunctions[i](card)) {
                addCard = false;
                break;
            }
        }
        
        // Decide whether to add card to card list
        if (addCard) {

            // Push card with desired properties to card list
            cardList.push(card);
        }
    }

    // Sort the cards 
    if (sort) {
        sortCards(cardList);
    }

    return cardList;
}

/**
 * Filter cards not in specified set.
 * @param {String} cardSet Set code of the card
 * @param {any} set Either a string that is the desired Set or an array of the desired 3 letter set codes
 * @returns True if cardSet and set match or if cardSet is included in array, false otherwise.
 */
 function filterSet(cardSet, set) {

    // Filter cards not in the set
    if (set === cardSet || ( Array.isArray(set) && set.includes(cardSet) )) {
        return true;
    }

    return false;
}

/**
 * We either wnat to filter out basic lands from our search or only show basic lands
 * Filters out Basic Lands if excludeBasicLands is true.
 * If excludeBasicLands is false. Will filter out anything that is NOT a basic land.
 * @param {String} cardTypeLine The type line of the card to check
 * @param {boolean} excludeBasicLands True to filter out basic lands, false to filter out cards that are NOT basic lands
 * @returns Returns true if the card should be included in findCards array, false if it shouldn't
 */
function filterBasicLands(cardTypeLine, excludeBasicLands) {

    if ( excludeBasicLands ) {
        // Skip basic lands
        if ( cardTypeLine.includes('Basic') && cardTypeLine.includes('Land') ){
            return false;
        }
        
        return true;
    }
    // excludeBasicLands === false
    // The same code as above but the return boolean is flipped
    if ( cardTypeLine.includes('Basic') && cardTypeLine.includes('Land') ){
        return true;
    }
    
    return false;
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

        // No multi-color match found
        return false;
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
}

/**
 * Searches card for specified search term (includes partial matches).
 * - If advancedSearchType is specified, an advanced search is performed.
 * - An advanced search searches only the card section specified by the string in advancedSearchType.
 * @param {Object} card Card object to search. Only uses name, type_line, oracle_text, and card_faces properties.
 * @param {string} term The search term to match.
 * @param {string} advancedSearchType Regular search if unspecified. If specified, creates an advanced search.
 * "name", "type_line", and "oracle_text" are the allowed advanced search types, indicating the specific card section to search.
 * @returns True if the card contains the search term, false otherwise. (Or matches advanced search options if specified)
 */
 function filterByTerm(card, term, advancedSearchType=null) {

    // Normal search
    if (!advancedSearchType) {

        if (
            // Check name
            match(card.name) ||
    
            // Check type line
            match(card.type_line) ||
        
            // Check oracle text if it exists
            ( card.oracle_text && match(card.oracle_text) ) ||

            // Check printed_name if it exists
            ( card.printed_name && match(card.printed_name) )
        ) {
            return true;
        }
    
        // Need to check card faces in order to find some cards
        if (card.card_faces) {
    
            // Check for oracle_text match on either face
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
                if ( match(card.name) || (card.printed_name && match(card.printed_name))) {
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
            
                    // Check for oracle_text match on either face
                    for (const face of card.card_faces) {
            
                        if ( face.oracle_text && match(face.oracle_text) ) {
                            return true;
                        }
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

/**
 * Checks if a card should be kept in the finalCards array based on the cmc of the card and selected CMCs
 * @param {Number} cardCMC The converted mana cost of card
 * @param {*} selectedCMCs Array of values of cmcs to be accepted. 
 * @returns Returns true if the card should be kept. False if not
 */
function filterCMC(cardCMC, selectedCMCs) {

    for (const selectedCMC of selectedCMCs) {
        // Check if the value is '8+'
        if ( selectedCMC === '8+' ) {
            if ( cardCMC >= 8 ) {
                return true;
            }

        } else {
            if (selectedCMC === cardCMC){
                return true;
            }
        }
    }
    
    return false;
}

/**
 * Checks if a card is legal in the format given
 * @param {string} deckType The desired decktype format to check.
 * @param {object} cardLegalities The legalities object of the card to check
 * @returns {boolean} Returns true if the card should be kept. False if not
 */
function filterLegality(deckType, cardLegalities) {
    // Check the card legality of the given decktype
    if ( cardLegalities[deckType] === 'legal'){
        return true;
    }
    return false;
}

/**
 * Checks if the card is a wanted type. 
 * @param {string} cardTypeLine The type_line of the individual card to be checked.
 * @param {*} cardTypes Array of card types to keep
 * @returns Returns true if the card should be kept. False if not
 */
function filterCardTypes(cardTypeLine, cardTypes) {
    let keepCard = false // Initialize return boolean to false;

    for (const cardType of cardTypes) {
        if ( cardTypeLine.includes(cardType)) {
            keepCard = true;
            break;
        }
    }
    return keepCard
}

/**
 * Determines whether this card is a companion.
 * @param {array} keywords The key words for the card. Will contain "Companion" if this card is a companion.
 * @returns True if the card is a Companion.
 */
function filterCompanions(keywords) {
    if (keywords.includes("Companion")) {
        return true;
    }
    return false;
}

/**
 * Determines whether this card is a commander.
 * @param {string} typeline The type line for the card. Will contain "Legendary" + ("Creature" OR "Planeswalker") if valid.
 * @returns True if the card is a Commander.
 */
function filterCommanders(typeline) {
    typeline = typeline.toLowerCase();
    if (typeline.includes("legendary") && ( typeline.includes("creature") || typeline.includes("planeswalker") )) {
        return true;
    }
    return false;
}

export default findCards;
