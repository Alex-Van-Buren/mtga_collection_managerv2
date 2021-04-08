import { SELECT_COLOR, SELECT_RARITY } from '../actions/types';

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

    rarity: "all"
}

export default function selectDetailsOptionsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SELECT_COLOR: {

            // Copy state
            let newState = {...state, colors: { ...state.colors }};

            const { color, newValue } = action.payload;

            // If multicolored or colorless, set all other colors to false
            if (color === "multi" || color === "colorless") {
                Object.keys(newState.colors).forEach( c => {
                    newState.colors[c] = false;
                });
            }
            // Otherwise multicolored and colorless must be set to false
            else {
                newState.colors.multi = false;
                newState.colors.colorless = false;
            }

            // Set selected color to true
            newState.colors[color] = newValue;

            return newState;
        }

        // Rarity must be one of: { common, uncommon, rare, mythic, all }
        case SELECT_RARITY: {
            return { ...state, rarity: action.payload };
        }

        default:
            return state;
    }
}