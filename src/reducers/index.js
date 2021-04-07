import { combineReducers } from 'redux';

import collectionReducer from './collectionReducer';
import selectDetailsOptionsReducer from './selectDetailsOptionsReducer';

export default combineReducers({
    inventory: collectionReducer,
    detailsOptions: selectDetailsOptionsReducer
});