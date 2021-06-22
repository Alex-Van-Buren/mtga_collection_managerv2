import React from 'react';

import SearchBar from '../Templates/SearchBar';
import ColorCheckboxes from '../SetDetails/ColorCheckboxes';
import RarityButtons from '../SetDetails/RarityButtons';
import AdvancedOptions from './AdvancedOptions';
import '../../css/DBCardFilters.css';

function DBCardFilters() {
    return (
        <div className="DBCardFilters">
            <SearchBar />
            <RarityButtons header="Select Rarity/Rarities to Show: "/>
            <ColorCheckboxes header="Select Color/Colors to Show:" />
            <AdvancedOptions />
        </div>
    )
}

export default DBCardFilters;