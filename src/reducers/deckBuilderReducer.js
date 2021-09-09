import {
    ADD_CARD_TO_DECK, REMOVE_CARD_FROM_DECK, SET_DECK, SELECT_DECK_TYPE, TOGGLE_ADD_BASICS, SET_ADD_TYPE, ADD_CARD_TO_SIDEBOARD, 
    REMOVE_CARD_FROM_SIDEBOARD, CHANGE_COMMANDER, CHANGE_COMPANION, SET_SIDEBOARD, SET_DRAG_CARD, DROP_CARD, LIMITED_SORT, SET_CURRENT_DRAG_OVER
} from '../actions/types';

const INITIAL_STATE = {
    // Array of card columns, each corresponds to cmc value 0-7, >7 mapped to 7
    deck: [ [], [], [], [], [], [], [], [] ],
    // Contains card names, ids, and number of copies
    deckMap: {}, // key: card.name, value: { key: card.arendId, value: { key: copies, key: set, key: col_num } }
    sideboard: [ [], [], [], [], [], [], [], [] ],
    sideboardMap: {}, // key: card.name, value: { key: card.arendId, value: { key: copies, key: set, key: col_num } }
    commander: null,
    companion: null,
    deckType: "standard", 
    addBasics: false,
    addType: "deck", // Valid types: "deck", "sideboard", "commander", "companion"
    dragCard: null,
    limitedSort: 'cmc',
    currentDragOver: {section: 'collection', col: null, row: null}
};

export default function deckbuilderReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        // Add card to be added or removed to redux
        case ADD_CARD_TO_DECK: {

            const card = action.payload;

            // Find which column to add card to
            const i = colNumberCMC(card.cmc);

            // Copy current state
            const newDeck = [ ...state.deck ];
            const newDeckMap = { ...state.deckMap };

            // Add card to deck
            newDeck[i].push(card);

            // Add card to deckMap 
            addCardToCardMap(newDeckMap, card);

            // Update state
            return { ...state, deck: newDeck, deckMap: newDeckMap };
        }

        case REMOVE_CARD_FROM_DECK: {

            const card = action.payload.card;

            // Find which column/row to remove card from
            const col = action.payload.col;
            const row = action.payload.row

            // Copy current state
            const newDeck = [ ...state.deck ];
            let newDeckMap = { ...state.deckMap };

            // Remove card from deck
            newDeck[col].splice(row, 1);

            // Remove card from deckMap
            removeCardFromCardMap(newDeckMap, card);

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
                const i = colNumberCMC(card.cmc);
    
                // Add card to deck
                newDeck[i].push(card);
    
                // Add card to deckMap 
                addCardToCardMap(newDeckMap, card);
            }

            // Return updated state
            return { ...state, deck: newDeck, deckMap: newDeckMap };
        }

        case ADD_CARD_TO_SIDEBOARD: {

            // Alias the card to an easier name
            const card = action.payload;

            // Find which column to add card to
            let i = 0;
            if ( state.limitedSort === 'cmc') {
                i = colNumberCMC(card.cmc);
            }
            else if ( state.limitedSort === 'color') {
                i = colNumberColor(card.color_identity);
            }

            // Copy current state
            const newSideboard = [ ...state.sideboard ];
            const newSideboardMap = { ...state.sideboardMap };

            // Add card to sideboard
            newSideboard[i].push(card);

            // Add card to sideboard map
            addCardToCardMap(newSideboardMap, card);

            // Update state
            return { ...state, sideboard: newSideboard, sideboardMap: newSideboardMap };
        }

        case REMOVE_CARD_FROM_SIDEBOARD: {
            
            const { card, col, row } = action.payload;

            // Copy sideboard
            let newSideboard = [ ...state.sideboard ];
            let newSideboardMap = { ...state.sideboardMap };
            
            // Remove card
            newSideboard[col].splice(row, 1);

            // Remove card from sideboard map
            removeCardFromCardMap(newSideboardMap, card);

            // Update state
            return { ...state, sideboard: newSideboard, sideboardMap: newSideboardMap };
        }

        case SET_SIDEBOARD: {

            const newSideboard = [ [], [], [], [], [], [], [], [] ];
            const newSideboardMap = {};

            for (const card of action.payload) {  

                // Find which column to add card to
                let i = 0;  
                if ( state.limitedSort === 'cmc') {
                    i = colNumberCMC(card.cmc);
                }
                else if ( state.limitedSort === 'color' ) {
                    i = colNumberColor(card.color_identity)
                }

                // Place card in specific sideboard column
                newSideboard[i].push(card);

                addCardToCardMap(newSideboardMap, card);
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
            return { ...state, addType: action.payload };
        }

        case SET_DRAG_CARD: {
            return {...state, dragCard: action.payload}
        }

        case DROP_CARD: {
            // Check if dragCard has no data and return if true
            if (!state.dragCard) {
                return state;
            }

            // Copy Deck + Sideboard
            let newDeck = [...state.deck]
            let newDeckMap = { ...state.deckMap };
            let newSideboard = [...state.sideboard];
            let newSideboardMap = {...state.sideboardMap};
            let newCompanion = {...state.companion};
            let newCommander = {...state.commander};

            // Destructure the card info from state.dragCard
            const { card } = state.dragCard;

            // Get old section and location data from state.dragCard
            const oldSection = state.dragCard.section;
            const oldLoc = state.dragCard.loc

            // Remove card from old Section
            switch (oldSection) {
                case 'deck':
                    newDeck[oldLoc.col].splice(oldLoc.row, 1);
                    removeCardFromCardMap(newDeckMap, card);
                    break;

                case 'sideboard':
                    newSideboard[oldLoc.col].splice(oldLoc.row, 1);
                    removeCardFromCardMap(newSideboardMap, card);
                    break;
            
                case 'companion':
                    newCompanion = null;
                    break;

                case 'commander':
                    newCommander = null;
                    break;

                default:
                    break;
            }

            // Get new section and location data from action.payload
            const newSection = action.payload.section;
            const newLoc = action.payload.loc;

            // Add Card to new Section and location
            switch (newSection) {
                case 'deck':
                    // Check if card is either changing sections or columns
                    if ( oldSection !== 'deck' || newLoc.col !== oldLoc.col ){
                        newDeck[newLoc.col].splice(newLoc.row + 1, 0, card);
                    } else {

                        // When moving a card within its column check whether its index is increasing/decreasing.
                        // Since a card was removed, all of the indecies succeeding it decrease by 1, so no need to add 1.
                        if(newLoc.row < oldLoc.row) { 
                        newDeck[newLoc.col].splice(newLoc.row + 1, 0, card);
                        } else{
                            newDeck[newLoc.col].splice(newLoc.row , 0, card);
                        }
                    }
                    addCardToCardMap(newDeckMap, card);
                    break;
                
                case 'sideboard':
                    // Check if card is either changing sections or columns
                    if ( oldSection !== 'sideboard' || newLoc.col !== oldLoc.col ) {
                        newSideboard[newLoc.col].splice(newLoc.row + 1, 0, card);
                    } else {

                        if (newLoc.row < oldLoc.row) {
                        newSideboard[newLoc.col].splice(newLoc.row +1 , 0, card);
                        } else {
                            newSideboard[newLoc.col].splice(newLoc.row, 0, card);
                        }
                    }

                    addCardToCardMap(newSideboardMap, card);
                    break;

                case 'companion':
                    newCompanion = card;
                    break;

                case 'commander':
                    newCommander = card;
                    break;

                default : 
                    break;
            }
            // Check if the newCompanion and newCommander Objects are empty and set to Null if they are
            if ( newCommander !== null && Object.keys(newCommander).length === 0){
                newCommander = null;
            }
            if ( newCompanion !==null  && Object.keys(newCompanion).length === 0){
                newCompanion = null;
            }
            return {...state, deck: newDeck, deckMap: newDeckMap, sideboard: newSideboard, sideboardMap: newSideboardMap, companion: newCompanion, commander: newCommander, dragCard: null};
        }

        case LIMITED_SORT: {
            const sideboardCards = [...state.sideboard].flat();
            const newSideboard = [ [], [], [], [], [], [], [], [] ];

            for (const card of sideboardCards) {  

                // Find which column to add card to
                let i = 0;  
                if ( action.payload === 'cmc') {
                    i = colNumberCMC(card.cmc);
                }
                else if ( action.payload === 'color' ) {
                    i = colNumberColor(card.color_identity)
                }

                // Place card in specific sideboard column
                newSideboard[i].push(card);

            }
            return {...state, limitedSort: action.payload, sideboard: newSideboard };
        }

        case SET_CURRENT_DRAG_OVER: {
            return {...state, currentDragOver: action.payload } ;
        }

        default:
            return state;
    }
}

/**
     * Converts cmc into column number 0-7
     */
 function colNumberCMC(cmc) {
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

function colNumberColor(color) {

    const colorMap = ['W', 'U', 'B', 'R', 'G'];
    
    // Multicolored are stored in column 5
    if (color.length > 1 ){
        return 5;
    }
    // Colorless are stored in column 5
    if (color.length === 0){
        return 6;
    }
    // Match the color to the colorMap to determine the column
    return colorMap.indexOf(color[0]);
}

/**
 * Helper function for adding a card to either deckMap or sideboardMap
 * @param {*} cardMap The cardMap that a card needs to be added to. eg a copy of deckMap or sideboardMap
 * @param {*} card The card object that is being added
 */
function addCardToCardMap(cardMap, card) {
    // Initialize specific card name in newSideboardMap if necessary
    if (!cardMap[card.name]) {
        cardMap[card.name] = {};
    }

    // Increment count if specific arenaId declared under card name
    if (cardMap[card.name][card.arenaId]) {
        cardMap[card.name][card.arenaId].copies++;
    }
    // Else initialize arenaId for card name
    else {
        cardMap[card.name][card.arenaId] = {copies: 1, set: card.set, col_num: card.collector_number };
    }
}

/**
 * Helper function for removing a card to either deckMap or sideboardMap
 * @param {*} cardMap The cardMap that a card needs to be removed to. eg a copy of deckMap or sideboardMap
 * @param {*} card The card object that is being removed
 */
function removeCardFromCardMap(cardMap, card) {
    // Decrement card count
    cardMap[card.name][card.arenaId].copies--;

    // Check if arenaId needs to be removed
    if (cardMap[card.name][card.arenaId].copies <= 0) {
        delete cardMap[card.name][card.arenaId];
    }

    // Check if card name needs to be removed
    if (Object.keys(cardMap[card.name]).length <= 0) {
        delete cardMap[card.name];
    }
}