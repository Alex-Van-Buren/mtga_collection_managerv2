import {
    GET_CARD_COLLECTION, GET_PLAYER_INVENTORY, PROCESS_SET_COLLECTION, SELECT_COLOR, SELECT_RARITY, SET_SHOWCARDS,
    SET_SEARCH_TERM, SHOW_CARD_MODAL, SET_CARD_MODAL_CONTENT, SHOW_HEADER_MODAL, SET_HEADER_MODAL_CONTENT, UPDATE_IMAGE_LIST,
    SELECT_DETAILS_MENU, SELECT_BOOSTER, RESET, SELECT_SET, SET_SEARCH_TYPE, ADD_CARD_TO_DECK,
    REMOVE_CARD_FROM_DECK, SET_DECK, SELECT_DECK_TYPE, TOGGLE_ADD_BASICS,ADD_CARD_TO_SIDEBOARD, REMOVE_CARD_FROM_SIDEBOARD,
    CHANGE_COMMANDER, CHANGE_COMPANION, SELECT_CARD_TYPES, SET_SIDEBOARD, SET_ADD_TYPE, SET_DRAG_CARD, DROP_CARD, 
    LIMITED_SORT, SET_CURRENT_DRAG_OVER, SELECT_CMCS, ADD_CARD_TO_COLLECTION, REMOVE_CARD_FROM_COLLECTION,
    SET_PACK_NUMBER
} from './types';

export function getCardCollection(collection) {
    return {
        type: GET_CARD_COLLECTION,
        payload: collection
    };
}

export function processSetCollection(collection) {

    return {
        type: PROCESS_SET_COLLECTION, 
        payload: collection
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
    };
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

export function selectCMCS(cmcs) {
    return {
        type: SELECT_CMCS,
        payload: cmcs
    };
}

export function addCardToDeck(card) {
    return {
        type: ADD_CARD_TO_DECK,
        payload: card
    };
}

export function removeCardFromDeck(card, col, row) {
    return {
        type: REMOVE_CARD_FROM_DECK,
        payload: { card, col, row }
    };
}

/**
 * Replace current deck with this array of cards
 * @param {array} cards Array of cards to make into new deck
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
 */
export function removeCardFromSideboard(card, col, row) {
    return {
        type: REMOVE_CARD_FROM_SIDEBOARD,
        payload: { card, col, row }
    };
}

/**
 * Set sideboard to an array of cards
 * @param {Array} cards Array of card objects.
 */
export function setSideboard(cards) {
    return {
        type: SET_SIDEBOARD,
        payload: cards
    };
}

/**
 * Make this card (or null) your commander. Default value is null (removes commander).
 * @param {object} [card=null]
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
    };
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
    };
}
/**
 * Action that sets which card is being dragged
 * @param {*} card The card object that is being dragged
 * @param {String} section A string that describes the section the card is being dragged from. eg 'deck', 'sideboard', 'collection'
 * @param {*} loc The index/indecies that describe the location within the section where the card is being dragged from.
 * @returns 
 */
export function setDragCard(card, section, loc) {
    // Set payload to null if card is not provided
    if (!card) {
        return {
            type: SET_DRAG_CARD,
            payload: null
        }
    }
    return {
        type: SET_DRAG_CARD,
        payload: { card: card, section, loc }
    };
}

/**
 * Action that drops the card being dragged
 * @param {String} section A string tat describes the section the card is being dropped into. eg 'deck', 'sideboard', 'collection'
 * @param {*} endloc the index/indecies that describe the location within the section where the card is being dragged from.
 * @returns 
 */
export function dropCard(section, loc) {
    return {
        type: DROP_CARD, 
        payload: { section, loc }
    };
}

export function limitedSort(sortType) {
    return {
        type: LIMITED_SORT,
        payload: sortType
    };
}

/**
 * 
 * @param {string} section 'deck', 'invalid', 'sideboard', 'commander', 'companion'. Defaults to 'invalid'
 * @param {number} col column index. Defaults to null.
 * @param {number} row row index. Defaults to null.
 * @returns 
 */
export function setCurrentDragOver(section='invalid', col=null, row=null) {
    return {
        type: SET_CURRENT_DRAG_OVER, 
        payload: {section, col, row}
    };
}

/**
 * Adds a single card to owned card collection.
 * @param {Object} card 
 */
export function addCardToCollection(card) {
    return {
        type: ADD_CARD_TO_COLLECTION,
        payload: card
    };
}

/**
 * Removes a single card from the owned card collection.
 * @param {Object} card 
 */
export function removeCardFromCollection(card) {
    return {
        type: REMOVE_CARD_FROM_COLLECTION,
        payload: card
    };
}

/**
 * Set number of booster packs owned
 * @param {Number} number
 * @param {string} set
 */
export function setPackNumber(number, set) {
    return {
        type: SET_PACK_NUMBER,
        payload: {number, set}
    };
}
