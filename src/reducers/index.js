import { combineReducers } from 'redux';

import collectionReducer from './collectionReducer';
import displayOptionsReducer from './displayOptionsReducer';
import modalReducer from './modalReducer';

export default combineReducers({
    inventory: collectionReducer,
    displayOptions: displayOptionsReducer,
    modal: modalReducer
});