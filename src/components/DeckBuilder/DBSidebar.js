import React from 'react';

import DBCardFilters from './DBCardFilters';
import '../../css/DBSidebar.css';

/**
 * The sidebar for the Deckbuilder
 * @returns JSX for sidebar
 */
function DBSidebar() {
    return (
        <div id="DBSidebar">
            <DBCardFilters />
        </div>
    );
}

export default DBSidebar;
