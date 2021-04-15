import { combineReducers } from 'redux';

import collectionReducer from './collectionReducer';
import selectDetailsOptionsReducer from './selectDetailsOptionsReducer';
import modalReducer from './modalReducer';

export default combineReducers({
    inventory: collectionReducer,
    detailsOptions: selectDetailsOptionsReducer,
    modal: modalReducer
});