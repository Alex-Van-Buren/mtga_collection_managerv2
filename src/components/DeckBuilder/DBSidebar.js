import React from 'react';

import DBCardFilters from './DBCardFilters';
import '../../css/DBSidebar.css';

function DBSidebar() {
    return (
        <div id="DBSidebar">
            <DBCardFilters />
        </div>
    )
}

export default DBSidebar;