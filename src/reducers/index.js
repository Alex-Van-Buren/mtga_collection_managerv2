import { combineReducers } from 'redux';

import collectionReducer from './collectionReducer';

export default combineReducers({
    inventory: collectionReducer
});