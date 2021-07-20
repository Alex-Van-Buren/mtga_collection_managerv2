import React from 'react';

import DBCardFilters from './DBCardFilters';
import DBDeckOptions from './DBDeckOptions';
import ImportExportModal from './ImportExportModal';
import '../../css/DBSidebar.css';

/**
 * The sidebar for the Deckbuilder
 * @returns JSX for sidebar
 */
function DBSidebar() {
    return (
        <div id="DBSidebar">
            <DBCardFilters />
            <DBDeckOptions />
            <ImportExportModal />
        </div>
    );
}

export default DBSidebar;
