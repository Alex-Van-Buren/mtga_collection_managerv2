import {
    ADD_CARD_TO_DECK, REMOVE_CARD_FROM_DECK, SET_DECK, SELECT_DECK_TYPE, TOGGLE_ADD_BASICS, SET_ADD_TYPE,
    ADD_CARD_TO_SIDEBOARD, REMOVE_CARD_FROM_SIDEBOARD, CHANGE_COMMANDER, CHANGE_COMPANION, SET_SIDEBOARD, SET_DRAG_CARD, DROP_CARD
} from '../actions/types';

const INITIAL_STATE = {
    // Array of card columns, each corresponds to cmc value 0-7, >7 mapped to 7
    deck: [ [], [], [], [], [], [], [], [] ],
    // Contains card names, ids, and number of copies
    deckMap: {}, // key: card.name, value: { key: card.arendId, value: { key: copies, key: set, key: col_num } }
    sideboard: [],
    sideboardMap: {}, // key: card.name, value: { key: card.arendId, value: { key: copies, key: set, key: col_num } }
    commander: null,
    companion: null,
    deckType: "standard", 
    addBasics: false,
    addType: "deck", // Valid types: "deck", "sideboard", "commander", "companion"
    dragCard: null,
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
                newDeckMap[card.name][card.arenaId].copies++;
            }
            // Else initialize arenaId for card name
            else {
                newDeckMap[card.name][card.arenaId] = { copies: 1, set: card.set, col_num: card.collector_number };
            }

            /* End adding to deckMap */

            // Update state
            return { ...state, deck: newDeck, deckMap: newDeckMap };
        }

        case REMOVE_CARD_FROM_DECK: {

            const card = action.payload.card;

            // Find which column/row to remove card from
            const col = action.payload.loc.col;
            const row = action.payload.loc.row

            // Copy current state
            const newDeck = [ ...state.deck ];
            const newDeckMap = { ...state.deckMap };

            // Remove card from deck
            newDeck[col].splice(row, 1);

            /* Remove card from deckMap */

                // Decrement card count
                newDeckMap[card.name][card.arenaId].copies--;

                // Check if arenaId needs to be removed
                if (newDeckMap[card.name][card.arenaId].copies <= 0) {
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

        // Take an array of cards and build deck and deckMap
        case SET_DECK: {
            
            // Clear old deck and create new state
            const newDeck = [ [], [], [], [], [], [], [], [] ];
            const newDeckMap = {};

            for (const card of action.payload) {

                // Find which column to add card to
                const i = colNumber(card.cmc);
    
                // Add card to deck
                newDeck[i].push(card);
    
                /* Add card to deckMap */
    
                // Initialize specific card name in deckMap if necessary
                if (!newDeckMap[card.name]) {
                    newDeckMap[card.name] = {};
                }

                // Increment count if specific arenaId declared under card name
                if (newDeckMap[card.name][card.arenaId]) {
                    newDeckMap[card.name][card.arenaId].copies++;
                }
                // Else initialize arenaId for card name
                else {
                    newDeckMap[card.name][card.arenaId] = { copies: 1, set: card.set, col_num: card.collector_number };
                }
    
                /* End adding to deckMap */
            }

            // Return updated state
            return { ...state, deck: newDeck, deckMap: newDeckMap };
        }

        case ADD_CARD_TO_SIDEBOARD: {

            // Alias the card to an easier name
            const card = action.payload;

            // Copy current state
            const newSideboard = [ ...state.sideboard ];
            const newSideboardMap = { ...state.sideboardMap };

            // Add card to sideboard
            newSideboard.push(card);

            /* Add card to sideboardMap */

            // Initialize specific card name in sideboardMap if necessary
            if (!newSideboardMap[card.name]) {
                newSideboardMap[card.name] = {};
            }

            // Increment count if specific arenaId declared under card name
            if (newSideboardMap[card.name][card.arenaId]) {
                newSideboardMap[card.name][card.arenaId].copies++;
            }
            // Else initialize arenaId for card name
            else {
                newSideboardMap[card.name][card.arenaId] = { copies: 1, set: card.set, col_num: card.collector_number };
            }

            /* End adding to sideboardMap */

            // Update state
            return { ...state, sideboard: newSideboard, sideboardMap: newSideboardMap };
        }

        case REMOVE_CARD_FROM_SIDEBOARD: {
            const card = action.payload;

            // Copy sideboard
            let newSideboard = [ ...state.sideboard ];
            let newSideboardMap = { ...state.sideboardMap };
            
            // Remove card
            newSideboard.splice(newSideboard.indexOf(card), 1);

            /* Remove card from sideboardMap */

                // Decrement card count
                newSideboardMap[card.name][card.arenaId].copies--;

                // Check if arenaId needs to be removed
                if (newSideboardMap[card.name][card.arenaId].copies <= 0) {
                    delete newSideboardMap[card.name][card.arenaId];
                }

                // Check if card name needs to be removed
                if (Object.keys(newSideboardMap[card.name]).length <= 0) {
                    delete newSideboardMap[card.name];
                }

            /* End removing from deckMap */

            // Update state
            return { ...state, sideboard: newSideboard, sideboardMap: newSideboardMap };
        }

        case SET_SIDEBOARD: {

            const newSideboard = action.payload;
            const newSideboardMap = {};

            for (const card of newSideboard) {
    
                // Initialize specific card name in newSideboardMap if necessary
                if (!newSideboardMap[card.name]) {
                    newSideboardMap[card.name] = {};
                }

                // Increment count if specific arenaId declared under card name
                if (newSideboardMap[card.name][card.arenaId]) {
                    newSideboardMap[card.name][card.arenaId].copies++;
                }
                // Else initialize arenaId for card name
                else {
                    newSideboardMap[card.name][card.arenaId] = { copies: 1, set: card.set, col_num: card.collector_number };
                }
            }

            return { ...state, sideboard: newSideboard, sideboardMap: newSideboardMap }
        }

        case CHANGE_COMMANDER: {
            return { ...state, commander: action.payload };
        }
        
        case CHANGE_COMPANION: {
            return { ...state, companion: action.payload };
        }

        case SELECT_DECK_TYPE: {
            
            return { ...state, deckType: action.payload };
        }

        case TOGGLE_ADD_BASICS: {

            return { ...state, addBasics: !state.addBasics }
        }

        case SET_ADD_TYPE: {

            // Input validation
            if (
                !["deck", "sideboard", "commander", "companion"].includes(action.payload) || // Check if invalid
                action.payload === state.addType // Check if current value
            ) {
                return state;
            }

            return { ...state, addType: action.payload };
        }

        case SET_DRAG_CARD: {
            return {...state, dragCard: action.payload}
        }

        case DROP_CARD: {
            // Copy Deck 
            let newDeck = [...state.deck]
            // Case for moving a card within the deckList
            if ( state.dragCard.section === 'deck' && action.payload.section === 'deck') {
                const indexToRemove = {...state.dragCard.loc};
                
                newDeck[indexToRemove.col].splice(indexToRemove.row,1);
    
                const indexToAdd = action.payload.endloc;
                // If the card is being moved around in the same column, just put the card at the index to add
                if (indexToAdd.col === indexToRemove.col) {
                    newDeck[indexToAdd.col].splice(indexToAdd.row, 0, state.dragCard.card);
                } else {
                    // If it is changing columns then the index to Add needs +1
                    newDeck[indexToAdd.col].splice(indexToAdd.row + 1 , 0, state.dragCard.card);
    
                }
            }
            return {...state, deck: newDeck};
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
