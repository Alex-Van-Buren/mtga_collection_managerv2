import { 
    SELECT_COLOR, SELECT_RARITY, SET_SHOWCARDS, SELECT_BOOSTER, SET_SEARCH_TERM, RESET, UPDATE_IMAGE_LIST, SELECT_DETAILS_MENU, SET_CMC_MIN, SET_CMC_MAX
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

    rarity: { mythic: false, rare: false, uncommon: false, common: false },
    
    showCards: "Show All Cards",

    booster: "Show All Cards",

    cmc: {min: "Any", max: "Any"},

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
            const rarity = {...state.rarity};

            // Flip value of the input rarity
            rarity[action.payload] = !rarity[action.payload];

            return {...state, rarity};
        }

        // showCards must be one of: { unowned, owned, all }
        case SET_SHOWCARDS: {
            return { ...state, showCards: action.payload };
        }

        // 
        case SELECT_BOOSTER: {
            return {...state, booster: action.payload }
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

        // Reset button
        case RESET: {

            return (
                {
                    ...state, colors: {
                    white: false,
                    blue: false,
                    black: false,
                    red: false,
                    green: false,
                    multi: false,
                    colorless: false
                },
                rarity: { mythic: false, rare: false, uncommon: false, common: false },
                showCards: "Show All Cards",
                booster: "Show All Cards",
                cmc: {min: "Any", max: "Any"},
                searchTerm: ""
            });
        }

        case SET_CMC_MIN: {
            let cmc = {...state.cmc};
            cmc.min = action.payload;

            return {...state, cmc}
        }

        case SET_CMC_MAX: {
            let cmc = {...state.cmc};
            cmc.max = action.payload;

            return {...state, cmc}
        }

        default:
            return state;
    }
}