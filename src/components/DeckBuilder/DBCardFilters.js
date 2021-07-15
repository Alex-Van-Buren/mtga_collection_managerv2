import React from 'react';

import SearchBar from '../Templates/SearchBar';
import ColorCheckboxes from '../SetDetails/ColorCheckboxes';
import RarityButtons from '../SetDetails/RarityButtons';
import AdvancedOptions from './AdvancedOptions';
import Reset from '../SetDetails/Reset';
import '../../css/DBCardFilters.css';

/**
 * The Card filters for DBSidebar
 * @returns JSX for card filtering options
 */
function DBCardFilters() {
    return (
        <div className="DBCardFilters">
            <SearchBar advanced={false}/>
            <RarityButtons header="Select Rarity/Rarities to Show: "/>
            <ColorCheckboxes header="Select Color/Colors to Show:" />
            <div className="advancedAndReset">
                <AdvancedOptions />
                <Reset />
            </div>
        </div>
    );
}

export default DBCardFilters;
