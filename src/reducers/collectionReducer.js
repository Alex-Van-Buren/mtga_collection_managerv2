import { GET_CARD_COLLECTION, GET_PLAYER_INVENTORY, PROCESS_SET_COLLECTION } from '../actions/types';

const INITIAL_STATE = {};

export default function collectionReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_CARD_COLLECTION:
            return {...state, cardCollection: action.payload};
        
        case PROCESS_SET_COLLECTION:
            return {...state, set: action.payload};
        
        case GET_PLAYER_INVENTORY:
            return {...state, player: action.payload};

        default:
            return state;
    }
}