import { 
    GET_CARD_COLLECTION, GET_PLAYER_INVENTORY, PROCESS_SET_COLLECTION, 
    ADD_CARD_TO_COLLECTION, REMOVE_CARD_FROM_COLLECTION, SET_PACK_NUMBER
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
            if (booster === setInfo[set].booster) {

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
            if (booster === setInfo[set].booster) {

                newSet[set][rarity].ownedTotal--;
            }

            // Update cardCollection in local storage
            window.localStorage.setItem("cardCollection", JSON.stringify(newCollection));

            return { ...state, cardCollection: newCollection, set: newSet };
        }

        case SET_PACK_NUMBER: {

            // Get number and set of booster packs to change
            let { number, set } = action.payload;
            number = parseInt(number);
            set = set.toUpperCase();

            // Get existing booster packs owned
            let newPlayer = { ...state.player };
            let newBoosters = newPlayer.Boosters;
            // const example = {
                // CollationId: 1000000,
                // SetCode: "ccc",
                // Count: 5 
            // }

            // Check if set already exists in booster list
            let boosterObj = newBoosters.find( obj => obj.SetCode === set );

            // Set doesn't exist in Booster list
            if (boosterObj === undefined) {

                // If number is 0, do nothing, return original state
                if (number === 0) {
                    return state;
                }

                // Get CollationId from setInfo and create new booster object
                newBoosters.push({
                    CollationId: setInfo[set.toLowerCase()].collationId,
                    SetCode: set,
                    Count: number
                });
            }

            // Set does exist
            else {

                // If number is 0, delete this booster object from the Booster array
                if (number === 0) {
                    newBoosters = newBoosters.filter( obj => obj.SetCode !== set );
                }
    
                // Alter booster count
                else {
                    boosterObj.Count = number;
                }
            }
            
            // Return new state with state.player.Boosters updated
            return { ...state, player: newPlayer };
        }

        default:
            return state;
    }
}