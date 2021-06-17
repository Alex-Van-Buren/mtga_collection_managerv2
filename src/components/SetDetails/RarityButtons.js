import React from 'react';
import { useSelector } from 'react-redux';

import { selectRarity } from '../../actions';
import CustomButton from '../Templates/CustomButton';

function RarityButtons() {
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

    return (
        <>
            {/* Buttons that select rarity: Mythic, Rare, Uncommon, Common */}
            <label className="rarityLabel">Select Rarity/Rarities to Show:</label>
            <div className="showList">
                {renderRarityButtons}
            </div>
        </>
    )
}

export default RarityButtons;