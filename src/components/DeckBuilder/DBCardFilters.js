import React from 'react';

import SearchBar from '../Templates/SearchBar';
import ColorCheckboxes from '../SetDetails/ColorCheckboxes';
function DBCardFilters() {
    return (
        <div className="DBCardFilters">
            <SearchBar />
            <ColorCheckboxes />
        </div>
    )
}

export default DBCardFilters;