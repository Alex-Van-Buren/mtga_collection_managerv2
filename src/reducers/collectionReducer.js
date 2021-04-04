const INITIAL_STATE = {};

export default function collectionReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "GET_CARD_COLLECTION":
            return {...state, cardCollection: action.payload};
        
        case 'PROCESS_SET_COLLECTION':
            return {...state, set: action.payload};

        default:
            return state;
    }
}