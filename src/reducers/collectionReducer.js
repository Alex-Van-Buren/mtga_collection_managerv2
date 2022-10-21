import { 
    GET_CARD_COLLECTION, GET_PLAYER_INVENTORY, PROCESS_SET_COLLECTION, ADD_CARD_TO_COLLECTION, REMOVE_CARD_FROM_COLLECTION
} from '../actions/types';
import totalOwned from '../data/totalOwned';
import { setInfo } from '../data/setInfo';

const INITIAL_STATE = {
    cardCollection: {},
    set: {},
    player: {
        Gems: 0, Gold: 0, TotalVaultProgress: 0, wcTrackPosition: 0, WildCardCommons: 0, WildCardUnCommons: 0, 
        WildCardRares: 0, WildCardMythics: 0, DraftTokens: 0, SealedTokens: 0, CustomTokens: {}, Boosters: []
    },
};

export default function collectionReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_CARD_COLLECTION: {

            // Update cardCollection in local storage
            window.localStorage.setItem("cardCollection", JSON.stringify(action.payload));

            return {...state, cardCollection: action.payload};
        }
        
        case PROCESS_SET_COLLECTION:
            return {...state, set: totalOwned(action.payload)};
        
        case GET_PLAYER_INVENTORY:
            return {...state, player: action.payload};

        case ADD_CARD_TO_COLLECTION: {
            const { arenaId, set, rarity, booster } = action.payload; // action.payload is a card
            const newCollection = { ...state.cardCollection };
            const newSet = { ...state.set };
            const cardCount = newCollection[arenaId];

            // Do nothing if max amount
            if (cardCount >= 4) {
                return state;
            }

            // If id doesn't exist in collection, initialize
            if (cardCount === undefined) {
                newCollection[arenaId] = 1;
            }

            // Increment card count owned
            else {
                newCollection[arenaId]++;
            }

            // Update set
            if (booster == setInfo[set].booster) {

                newSet[set][rarity].ownedTotal++;
            }

            // Update cardCollection in local storage
            window.localStorage.setItem("cardCollection", JSON.stringify(newCollection));

            return { ...state, cardCollection: newCollection, set: newSet };
        }

        case REMOVE_CARD_FROM_COLLECTION: {
            const { arenaId, set, rarity, booster } = action.payload;
            const newCollection = { ...state.cardCollection };
            const newSet = { ...state.set };
            const cardCount = newCollection[arenaId];

            // If id doesn't exist in collection, don't change
            if (cardCount === undefined) {
                return state;
            }
            
            // Remove ids from collection with counts below 1
            if (cardCount <= 1) {
                delete newCollection[arenaId];
            }

            // Decrement card count owned
            else {
                newCollection[arenaId]--;
            }

            // Update set
            if (booster == setInfo[set].booster) {

                newSet[set][rarity].ownedTotal--;
            }

            // Update cardCollection in local storage
            window.localStorage.setItem("cardCollection", JSON.stringify(newCollection));

            return { ...state, cardCollection: newCollection, set: newSet };
        }

        default:
            return state;
    }
}