import { 
    SELECT_COLOR, SELECT_RARITY, SET_SHOWCARDS, SET_SEARCH_TERM, UPDATE_IMAGE_LIST, SELECT_DETAILS_MENU
 } from '../actions/types';

const INITIAL_STATE = {
    colors: {
        white: false,
        blue: false,
        black: false,
        red: false,
        green: false,
        multi: false,
        colorless: false
    },

    rarity: { common: false, uncommon: false, rare: false, mythic: false },
    
    showCards: "all",

    searchTerm: "",

    imageList: [],

    cardCount: 0,

    activeTab: "Card Filters"
}

export default function displayOptionsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SELECT_COLOR: {

            // Copy state
            let newState = {...state, colors: { ...state.colors }};

            const { color, newValue } = action.payload;

            // If multicolored is true set colorless to false
            if ( color === "multi" && newValue ){
                newState.colors.colorless = false;
            }
            // If colorless is true set multi to false
            if ( color === "colorless" && newValue) {
                newState.colors.multi = false;
            }

            // Set selected color to true
            newState.colors[color] = newValue;

            return newState;
        }

        // Rarity can be any of: { common, uncommon, rare, mythic }
        case SELECT_RARITY: {
            const newState = {...state};

            // Flip value of the input rarity
            newState.rarity[action.payload] = !newState.rarity[action.payload];

            return newState;
        }

        // showCards must be one of: { unowned, owned, all }
        case SET_SHOWCARDS: {
            return { ...state, showCards: action.payload };
        }

        // Set the search term from the search bar
        case SET_SEARCH_TERM: {
            return { ...state, searchTerm: action.payload };
        }

        // Set the active card images
        case UPDATE_IMAGE_LIST: {
            return { ...state, imageList: action.payload, cardCount: action.payload.length };
        }

        // Set active details menu tab
        case SELECT_DETAILS_MENU: {
            return { ...state, activeTab: action.payload };
        }

        default:
            return state;
    }
}