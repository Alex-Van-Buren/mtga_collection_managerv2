import { SHOW_CARD_MODAL, SET_CARD_MODAL_CONTENT, SHOW_HEADER_MODAL, SET_HEADER_MODAL_CONTENT } from '../actions/types';

const INITIAL_STATE = {
    showCardModal: false,
    cardContent: null,
    showHeaderModal: false,
    headerContent: null
};

function modalReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case SHOW_CARD_MODAL: {
            return { ...state, showCardModal: action.payload };
        }
        case SET_CARD_MODAL_CONTENT: {
            return { ...state, cardContent: action.payload };
        }
        case SHOW_HEADER_MODAL: {
            return { ...state, showHeaderModal: action.payload };
        }
        case SET_HEADER_MODAL_CONTENT: {
            return { ...state, headerContent: action.payload };
        }
        default:
            return state;
    }
}

export default modalReducer;