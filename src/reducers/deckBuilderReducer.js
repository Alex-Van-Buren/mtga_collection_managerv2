import { ADD_CARD_TO_DECK, REMOVE_CARD_FROM_DECK } from '../actions/types';

const INITIAL_STATE = {
    deckList: []
};

export default function deckbuilderReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        // Copy old deckList, add new card, and then return new deckList
        case ADD_CARD_TO_DECK: {
            const newDeckList = [...state.deckList, action.payload];
            return { ...state, deckList: newDeckList };
        }
        case REMOVE_CARD_FROM_DECK: {
            const newDeckList = [ ...state.deckList ];
            const removeIndex = newDeckList.indexOf(action.payload);

            if (removeIndex !== -1) {
                // Remove the card from the array
                newDeckList.splice(removeIndex, 1);
            } else {
                // Or log an error
                console.error("Attempted to remove a card that wasn't found in the deck.");
            }
            return { ...state, deckList: newDeckList };
        }
        default:
            return state;
    }
}