import { GET_CARD_COLLECTION, PROCESS_SET_COLLECTION, SELECT_COLOR, SELECT_RARITY } from './types';
import totalOwned from '../data/totalOwned';

const sets = ['eld', 'thb', 'iko', 'm21', 'znr', 'khm'];

export function getCollection(collection) {
    return {
        type: GET_CARD_COLLECTION,
        payload: collection
    }
}

export function processSetCollection(collection) {
    let payload = {};

    sets.forEach( (set) => {
        payload[set] = {
            mythic: totalOwned(set, collection, 'mythic'),
            rare: totalOwned(set, collection, 'rare'),
            uncommon: totalOwned(set, collection, 'uncommon'),
            common: totalOwned(set, collection, 'common')
        };
    });

    return {
        type: PROCESS_SET_COLLECTION, 
        payload: payload
    }
}

export function selectColor(color, newValue) {
    return {
        type: SELECT_COLOR,
        // Return the selected color and its boolean value in payload
        payload: { color, newValue }
    }
}

export function selectRarity(rarity, newValue) {
    return {
        type: SELECT_RARITY,
        // Return the selected rarity in payload
        payload: { rarity }
    }
}