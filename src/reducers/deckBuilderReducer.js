import { ADD_CARD_TO_DECK, REMOVE_CARD_FROM_DECK, SELECT_DECK_TYPE } from '../actions/types';

const INITIAL_STATE = {
    // Array of card columns, each corresponds to cmc value 0-7, >7 mapped to 7
    deck: [ [], [], [], [], [], [], [], [] ],
    // Contains card names, ids, and number of copies
    deckMap: {}, // key: card.name, value: { key: card.arendId, value: number in deck }
    deckType: "standard"
};

export default function deckbuilderReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        // Add card to be added or removed to redux
        case ADD_CARD_TO_DECK: {

            const card = action.payload;

            // Find which column to add card to
            const i = colNumber(card.cmc);

            // Copy current state
            const newDeck = [ ...state.deck ];
            const newDeckMap = { ...state.deckMap };

            // Add card to deck
            newDeck[i].push(card);

            /* Add card to deckMap */

                // Initialize specific card name in deckMap if necessary
                if (!newDeckMap[card.name]) {
                    newDeckMap[card.name] = {};
                }

                // Increment count if specific arenaId declared under card name
                if (newDeckMap[card.name][card.arenaId]) {
                    newDeckMap[card.name][card.arenaId]++;
                }
                // Else initialize arenaId for card name
                else {
                    newDeckMap[card.name][card.arenaId] = 1;
                }

            /* End adding to deckMap */

            // Update state
            return { ...state, deck: newDeck, deckMap: newDeckMap };
        }
        case REMOVE_CARD_FROM_DECK: {

            const card = action.payload;

            // Find which column to add card to
            const i = colNumber(card.cmc);

            // Copy current state
            const newDeck = [ ...state.deck ];
            const newDeckMap = { ...state.deckMap };

            // Remove card from deck
            newDeck[i].splice(newDeck[i].indexOf(card), 1);

            /* Remove card from deckMap */

                // Decrement card count
                newDeckMap[card.name][card.arenaId]--;

                // Check if arenaId needs to be removed
                if (newDeckMap[card.name][card.arenaId] <= 0) {
                    delete newDeckMap[card.name][card.arenaId];
                }

                // Check if card name needs to be removed
                if (Object.keys(newDeckMap[card.name]).length <= 0) {
                    delete newDeckMap[card.name];
                }

            /* End removing from deckMap */

            // Update state
            return { ...state, deck: newDeck, deckMap: newDeckMap };
        }
        case SELECT_DECK_TYPE: {
            
            return { ...state, deckType: action.payload };
        }
        default:
            return state;
    }
}

/**
     * Converts cmc into column number 0-7
     */
 function colNumber(cmc) {
    if (typeof cmc === 'string') {
        cmc = parseInt(cmc);
    }
    // Minimum value of cmc is 0 and map undefined/null to 0
    if (!cmc || cmc < 0) {
        cmc = 0;
    }
    // Max cmc value is 7
    else if (cmc > 7) {
        cmc = 7;
    }
    return cmc;
}
