// import allArenaCards from './arenaCards20210427172602.json';
const allArenaCards = require('./arenaCards20210525161144.json');

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

    // Filter out Alternate Art for cards
    cardList = filterAltArt(cardList);

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

    // Check if everything is false, if so do nothing and return original cardlist
    if (!(searchColors.white || searchColors.blue || searchColors.black || searchColors.red || searchColors.green || searchColors.colorless || searchColors.multi)) {
        return cardList;
    }
    // if multi AND colorless are true, return zero cards
    if ( searchColors.multi && searchColors.colorless ) {
        return newCardList;
    }

    // Check each card
    for (const card of cardList) {
        
        // Check if multi is false
        if ( !searchColors.multi ) {
            // Multi false
            // Check if the card contains any of the WUBRG colors that are being searched for
            if ((searchColors.white && card.color_identity.includes('W')) || (searchColors.blue && card.color_identity.includes('U')) ||
                (searchColors.black && card.color_identity.includes('B')) || (searchColors.red  && card.color_identity.includes('R')) ||
                (searchColors.green && card.color_identity.includes('G'))) {

                // Add to newCardList and go to next card
                newCardList.push(card);
                continue;
            }

            // Check if colorless is true and if the card is colorless
            if ( searchColors.colorless && (card.color_identity.length === 0) ) {

                // Add to newCardList and go to next card
                newCardList.push(card);
                continue;
            }
    
        }
        // Multi true
        else {
            // Check if card has more than one color in color identity
            if ( card.color_identity.length < 2 ) {

                // Don't add card and move on to next card
                continue;
            }
            
            // Check if multi is the only color option that is true
            if (searchColors.multi && !(searchColors.white || searchColors.blue || searchColors.black || searchColors.red || searchColors.green || searchColors.colorless)){

                // Add card to cardlist and move on to next card
                newCardList.push(card);
                continue;
            }

            // Card must include ALL of the other colors but may include addtional colors
            let addCard = true;
            const colors = [{name:'white' , symbol: 'W' }, 
                            {name:'blue'  , symbol: 'U' }, 
                            {name:'black' , symbol: 'B' }, 
                            {name:'red'   , symbol: 'R' }, 
                            {name:'green' , symbol: 'G' }];
            
            for (const color of colors) {
                
                // Check if searching for particular color and if the card does NOT include that color
                if ( searchColors[color.name] && !card.color_identity.includes(color.symbol)) {

                    // Make addCard false and break loop on first mismatch
                    addCard = false;
                    break;
                } 
            }
            // Add the card that match the criteria
            if ( addCard ) {
                newCardList.push(card);
                continue;
            }
        }
    };

        
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

    cardList.forEach((card) => {
        if (card.booster === booster){
            newCardList.push(card);
        }
    });

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