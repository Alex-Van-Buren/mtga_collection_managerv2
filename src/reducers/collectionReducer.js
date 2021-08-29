import { GET_CARD_COLLECTION, GET_PLAYER_INVENTORY, PROCESS_SET_COLLECTION } from '../actions/types';

const INITIAL_STATE = {
    player: {
        Gems: 0, Gold: 0, TotalVaultProgress: 0, wcTrackPosition: 0, WildCardCommons: 0, WildCardUnCommons: 0, 
        WildCardRares: 0, WildCardMythics: 0, DraftTokens: 0, SealedTokens: 0, CustomTokens: {}, Boosters: []
    },
};

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