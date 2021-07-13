import { ADD_CARD_TO_DECK, REMOVE_CARD_FROM_DECK, SELECT_DECK_TYPE } from '../actions/types';

const INITIAL_STATE = {
    deck: [ [], [], [], [], [], [], [], [] ],
    deckType: "standard"
};

export default function deckbuilderReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        // Add card to be added or removed to redux
        case ADD_CARD_TO_DECK: {

            const cardToAdd = action.payload;

            // Find which column to add card to
            const i = colNumber(cardToAdd.cmc);

            // Copy current state
            const newDeck = [ ...state.deck ];

            // Add card to state
            newDeck[i].push(cardToAdd);

            // Update state
            return { ...state, deck: newDeck };
        }
        case REMOVE_CARD_FROM_DECK: {

            const cardToRemove = action.payload;

            // Find which column to add card to
            const i = colNumber(cardToRemove.cmc);

            // Copy current state
            const newDeck = [ ...state.deck ];

            // Remove card from state
            newDeck[i].splice(newDeck[i].indexOf(cardToRemove), 1);

            // Update state
            return { ...state, deck: newDeck };
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
