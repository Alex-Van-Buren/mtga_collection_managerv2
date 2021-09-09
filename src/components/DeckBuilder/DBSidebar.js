import React from 'react';
import { useDispatch } from 'react-redux';

import DBCardFilters from './DBCardFilters';
import DBDeckOptions from './DBDeckOptions';
import { setCurrentDragOver } from '../../actions';
import '../../css/DBSidebar.css';

/**
 * The sidebar for the Deckbuilder
 * @returns JSX for sidebar
 */
function DBSidebar() {
    const dispatch = useDispatch();
    return (
        <div id="DBSidebar" 
            onDragEnter={() => dispatch(setCurrentDragOver())}
        >
            <DBCardFilters />
            <DBDeckOptions />
        </div>
    );
}

export default DBSidebar;
