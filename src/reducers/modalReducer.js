import { SHOW_MODAL, SET_MODAL_CONTENT } from '../actions/types';

const INITIAL_STATE = {
    showModal: false,
    content: null
};

function modalReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case SHOW_MODAL: {
            return { ...state, showModal: action.payload };
        }
        case SET_MODAL_CONTENT: {
            return { ...state, content: action.payload };
        }
        default:
            return state;
    }
}

export default modalReducer;