/**
 * A function that checks if a card is able to be added to a deck.
 * Checks if there are max copies of a card already in the decklist as well as if the card is legal in the desired deckType.
 * @param {object} card The card Object attempting to be added. Should contain at least name, type_line, and  legalities.
 * @param {Object} deckObj The decklist object of cards currently in the deck.
 * @param {string} deckType String of deck type being created. e.g. "standard", "historic"
 * @returns {boolean} True if card can be added. False if it cannot be added
 */
export default function isCardAddible(card, deckObj, deckType) {
    // First check if the card is legal in the desired deckType
    // For Custom and Limited, all cards are legal so skip this step
    if (!(deckType === 'custom' || deckType === 'limited')) {

        // If not legal in Format return false
        if (card.legalities[deckType] !== 'legal'){
            return false;
        }
    }

    // Count the number of copies of the card already in deck

    // TODO: Make sure to count copies in the sideboard when that is made
    let copiesInDeck = 0; // Initialize
    
    // Check if the deck has any copies of the card
    if ( deckObj[card.name] ) {

        // Add up all versions of the card with the same name 
        for (const arenaId in deckObj[card.name]) {
            copiesInDeck += deckObj[card.name][arenaId];
        }
    }

    // Get the max number of copies allowed in a deck for this decktype
    let maxCopies; 
    switch (deckType) {
        case 'brawl':
            maxCopies = 1;
            break;
        case 'limited':
            maxCopies = 250; // Really it is unlimited but Arena has a total deck size limit of 250;
            break;
        default:
            maxCopies = 4;
            break;
    }
    // Some cards have special rules for how many are allowed in a deck, those exceptions will need to be explicit
    switch ( card.name ) {
        case "Dragon's Approach":
            maxCopies = 250;
            break;
        case "Persistent Petitioners":
            maxCopies = 250;
            break;
        case "Rat Colony":
            maxCopies = 250;
            break;
        case "Seven Dwarves":
            maxCopies = 7;
            break;
        default:
            break;
    }

    // Decks can have any number of basic lands
    if (card.type_line.includes('Basic') && card.type_line.includes('Land')) {
        maxCopies = 250;
    }

    // If number of copies currently in deck < max copies allowed --> return true, Otherwise false
    if (copiesInDeck < maxCopies) {
        return true;
    } else {
        return false;
    }
}