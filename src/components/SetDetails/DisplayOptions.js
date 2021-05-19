import React from 'react';
import { useSelector } from 'react-redux';

import NumberOwnedDropdown from './NumberOwnedDropdown';
import BoosterDropDown from './BoosterDropDown';
import ColorCheckboxes from './ColorCheckboxes';
import CustomButton from './CustomButton';
import SearchBar from './SearchBar';
import { selectRarity } from '../../actions';
import '../../css/DisplayOptions.css';

function DisplayOptions() {

    const rarities  = useSelector(state => state.displayOptions.rarity);
    
    // Create array of rarity buttons
    const renderRarityButtons = [];

    // Loop through each rarity and check whether it's currently selected
    for (const rarity in rarities) {
        let buttonClass = `ui button primary rarityButton ${rarity}`;

        // If the rarity isn't currently selected, add "basic" to its class
        if ( !rarities[rarity] )
            buttonClass += ' basic';
        
        // Then push that rarity button to the array
        renderRarityButtons.push(<CustomButton action={selectRarity} className={buttonClass} value={rarity} key={rarity} />);
    }

    return (<div className="DisplayOptions">
        <SearchBar/>
        
        {/* Checkboxes for color: White, Blue, Black, Red, Green, All Multicolored, Colorless */}
        <ColorCheckboxes/>

        {/* Buttons that select rarity: Mythic, Rare, Uncommon, Common */}
        <label className="rarityLabel">Rarity:</label>
        <div className="showList">
            {renderRarityButtons}
        </div>

        {/* DropDowns that select cards to show based on number in inventory and whether they are in boosters*/}
        <div className="showList">            
            <NumberOwnedDropdown />
            <BoosterDropDown/>
        </div>
    </div>);
}

export default DisplayOptions;