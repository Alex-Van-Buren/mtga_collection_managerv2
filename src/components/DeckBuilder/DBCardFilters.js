import React from 'react';

import SearchBar from '../Templates/SearchBar';
import ColorCheckboxes from '../SetDetails/ColorCheckboxes';
import AdvancedOptions from './AdvancedOptions';
import Reset from '../SetDetails/Reset';
import AddBasicsButton from './AddBasicsButton';
import '../../css/DBCardFilters.css';

/**
 * The Card filters for DBSidebar
 * @returns JSX for card filtering options
 */
function DBCardFilters() {
    return (
        <div className="DBCardFilters">
            <SearchBar advanced={false}/>
            <ColorCheckboxes header="Select Color/Colors to Show:" />
            <AddBasicsButton />
            <div className="advancedAndReset">
                <AdvancedOptions />
                <Reset />
            </div>
        </div>
    );
}

export default DBCardFilters;
