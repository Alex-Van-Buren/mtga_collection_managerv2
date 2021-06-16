import {
    GET_CARD_COLLECTION, GET_PLAYER_INVENTORY, PROCESS_SET_COLLECTION, SELECT_COLOR, SELECT_RARITY, SET_SHOWCARDS,
    SET_SEARCH_TERM, SHOW_CARD_MODAL, SET_CARD_MODAL_CONTENT, SHOW_HEADER_MODAL, SET_HEADER_MODAL_CONTENT, UPDATE_IMAGE_LIST, 
    SELECT_DETAILS_MENU, SELECT_BOOSTER, RESET, SET_CMC_MIN, SET_CMC_MAX, SELECT_SET
} from './types';
import totalOwned from '../data/totalOwned';

export function getCollection(collection) {
    return {
        type: GET_CARD_COLLECTION,
        payload: collection
    };
}

export function processSetCollection(collection) {

    return {
        type: PROCESS_SET_COLLECTION, 
        payload: totalOwned(collection)
    };
}

export function selectColor(color, newValue) {
    return {
        type: SELECT_COLOR,
        // Return the selected color and its boolean value in payload
        payload: { color, newValue }
    };
}

export function selectRarity(rarity) {
    return {
        type: SELECT_RARITY,
        // Return the selected rarity in payload
        payload: rarity
    };
}

export function setShowCards(showCards) {
    return {
        type: SET_SHOWCARDS,
        // Return the selection of which cards to show
        payload: showCards
    };
}

export function selectBooster(booster) {
    return {
        type: SELECT_BOOSTER,
        // Return the selection of whether to show cards in/not in booster
        payload: booster
    };
}

export function selectSet(set) {
    return {
        type: SELECT_SET,
        payload: set
    };
}

export function setSearchTerm(searchTerm) {
    return {
        type: SET_SEARCH_TERM,
        payload: searchTerm
    };
}

export function resetDisplayOptions() {
    return {
        type: RESET
    };
}
 
export function updateImageList(list) {
    return {
        type: UPDATE_IMAGE_LIST,
        payload: list
    }
}

export function showCardModal(showBoolean) {
    return {
        type: SHOW_CARD_MODAL,
        payload: showBoolean
    };
}

export function setCardModalContent(content) {
    return {
        type: SET_CARD_MODAL_CONTENT,
        payload: content
    };
}
export function showHeaderModal(showBoolean) {
    return {
        type: SHOW_HEADER_MODAL,
        payload: showBoolean
    };
}

export function setHeaderModalContent(content) {
    return {
        type: SET_HEADER_MODAL_CONTENT,
        payload: content
    };
}

export function selectDetailsMenu(tab) {
    return {
        type: SELECT_DETAILS_MENU,
        payload: tab
    };
}

export function getPlayerInventory(inventory) {
    return {
        type: GET_PLAYER_INVENTORY,
        payload: inventory
    };
}

export function setCMCMin(cmc) {
    return {
        type: SET_CMC_MIN,
        payload: cmc
    };
}

export function setCMCMax(cmc) {
    return {
        type: SET_CMC_MAX,
        payload: cmc
    };
}