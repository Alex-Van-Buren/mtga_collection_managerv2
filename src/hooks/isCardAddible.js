/**
 * A function that checks if a card is able to be added to a deck.
 * Checks if there are max copies of a card already in the decklist as well as if the card is legal in the desired deckType.
 * @param {object} card The card Object attempting to be added. Should contain at least name, and legalities.
 * @param {Array} deckList The decklist array of cards currently in the deck.
 * @param {string} deckType String of deck type being created. e.g. "standard", "historic"
 * @returns {boolean} True if card can be added. False if it cannot be added
 */
export default function isCardAddible(card, deckList, deckType) {

    // First check if the card is legal in the desired deckType
    // If not legal in Format return false
    // Count the number of copies of the card already in deck
    // Get the max number of copies allowed in a deck for this decktype
    // Some cards have special rules for how many are allowed in a deck, those exceptions will need to be explicit
    // If number of copies currently in deck < max copies allowed --> return true, Otherwise false
}