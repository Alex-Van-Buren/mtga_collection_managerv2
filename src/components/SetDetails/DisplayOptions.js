import React from 'react';

import NumberOwnedDropdown from './NumberOwnedDropdown';
import BoosterDropdown from './BoosterDropdown';
import CMCDropdowns from './CMCDropdowns';
import ColorCheckboxes from './ColorCheckboxes';
import Reset from './Reset';
import SearchBar from '../Templates/SearchBar';
import RarityButtons from './RarityButtons';
import '../../css/DisplayOptions.css';

function DisplayOptions() {
    return (
    <div className="DisplayOptions">
        <SearchBar/>
        <RarityButtons header="Select Rarity/Rarities to Show:" />

        {/* Checkboxes for color: White, Blue, Black, Red, Green, All Multicolored, Colorless */}
        <ColorCheckboxes header="Select Color/Colors to Show:"/>

        {/* DropDowns that select cards to show based on number in inventory and whether they are in boosters*/}
        <div className="display-options-dropdowns">
            <NumberOwnedDropdown header="Number You Own:" />
            <BoosterDropdown header="In Booster Packs?" />
            <CMCDropdowns header="Select Mana Cost:"/>
            <Reset />
        </div>
    </div>);
}

export default DisplayOptions;