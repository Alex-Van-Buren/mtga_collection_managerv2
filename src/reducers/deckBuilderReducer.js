import { ADD_CARD_TO_DECK } from '../actions/types';

const INITIAL_STATE = {
    add: null
};

export default function deckbuilderReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        // Add card to be added or removed to redux
        case ADD_CARD_TO_DECK: {
            return { ...state, add: action.payload };
        }
        default:
            return state;
    }
}
