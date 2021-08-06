import {
    GET_CARD_COLLECTION, GET_PLAYER_INVENTORY, PROCESS_SET_COLLECTION, SELECT_COLOR, SELECT_RARITY, SET_SHOWCARDS,
    SET_SEARCH_TERM, SHOW_CARD_MODAL, SET_CARD_MODAL_CONTENT, SHOW_HEADER_MODAL, SET_HEADER_MODAL_CONTENT, UPDATE_IMAGE_LIST,
    SELECT_DETAILS_MENU, SELECT_BOOSTER, RESET, SET_CMC_MIN, SET_CMC_MAX, SELECT_SET, SET_SEARCH_TYPE, ADD_CARD_TO_DECK,
    REMOVE_CARD_FROM_DECK, SET_DECK, SELECT_DECK_TYPE, TOGGLE_ADD_BASICS,ADD_CARD_TO_SIDEBOARD, REMOVE_CARD_FROM_SIDEBOARD,
    CHANGE_COMMANDER, CHANGE_COMPANION, SELECT_CARD_TYPES, SET_SIDEBOARD, SET_ADD_TYPE, SET_DRAG_CARD, MOVE_CARD
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

export function setSearchType(searchType) {
    return {
        type: SET_SEARCH_TYPE,
        payload: searchType
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

export function addCardToDeck(card) {
    return {
        type: ADD_CARD_TO_DECK,
        payload: card
    };
}

export function removeCardFromDeck(card) {
    return {
        type: REMOVE_CARD_FROM_DECK,
        payload: card
    };
}

/**
 * Replace current deck with this array of cards
 * @param {array} cards Array of cards to make into new deck
 * @typedef cards: [{ name, cmc, arenaId, set, imgs, collector_number, type_line }, ...]
 */
export function setDeck(cards) {
    return {
        type: SET_DECK,
        payload: cards
    };
}

/**
 * Add this card to the sideboard.
 * @param {object} card 
 * @typedef card: { name, cmc, arenaId, set, imgs, collector_number, type_line }
 */
export function addCardToSideboard(card) {
    return {
        type: ADD_CARD_TO_SIDEBOARD,
        payload: card
    };
}

/**
 * Remove this card from the sideboard
 * @param {object} card 
 * @typedef card: { name, cmc, arenaId, set, imgs, collector_number, type_line }
 */
export function removeCardFromSideboard(card) {
    return {
        type: REMOVE_CARD_FROM_SIDEBOARD,
        payload: card
    };
}

/**
 * Set sideboard to an array of cards
 * @param {Array} cards Array of card objects. Each card is {name, cmc, arenaId, set, imgs, collector_number, type_line} 
 */
export function setSideboard(cards) {
    return {
        type: SET_SIDEBOARD,
        payload: cards
    }
}

/**
 * Make this card (or null) your commander. Default value is null (removes commander).
 * @param {object} [card=null]
 * @typedef card: { name, cmc, arenaId, set, imgs, collector_number, type_line }
 */
export function changeCommander(card=null) {
    return {
        type: CHANGE_COMMANDER,
        payload: card
    };
}

/**
 * Make this card (or null) your companion. Default value is null (removes companion).
 * @param {object} [card=null]
 * @typedef card: { name, cmc, arenaId, set, imgs, collector_number, type_line }
 */
export function changeCompanion(card=null) {
    return {
        type: CHANGE_COMPANION,
        payload: card
    };
}

export function selectDeckType(type) {
    return {
        type: SELECT_DECK_TYPE,
        payload: type
    };
}

export function toggleAddBasics() {
    return {
        type: TOGGLE_ADD_BASICS
    }
}

export function selectCardTypes(cardTypes) {
    return {
        type: SELECT_CARD_TYPES,
        payload: cardTypes
    };
}

export function setAddType(addType) {
    return {
        type: SET_ADD_TYPE,
        payload: addType
    }
}

export function setDragCard(card, loc) {
    return {
        type: SET_DRAG_CARD,
        payload:{card: card, loc: {section: loc.section, index: loc.index}}
    };
}

export function moveCard(endloc) {
    return {
        type: MOVE_CARD, 
        payload: endloc
    }
}