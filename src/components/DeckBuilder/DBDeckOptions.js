import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectDeckType } from '../../actions';
import CustomDropdown from '../Templates/CustomDropdown';
import '../../css/DBDeckOptions.css';

function DBDeckOptions() {
    
    const dispatch = useDispatch();
    
    // Deck/game type
    const items = [ "standard", "historic", "limited", "brawl", "custom" ];
    const renderGameType = <CustomDropdown
        items={items} firstSelection={useSelector(s => s.deckBuilder.deckType)}
        selectfn={(item) => dispatch(selectDeckType(item))}
        ariaLabel="Select deck type"
    />

    // Import/export from file/clipboard


    // Reset deck


    return (
        <div id="DBDeckOptions">
            <label htmlFor="gameTypeDropDown">Deck Type:</label>
            <div id="gameTypeDropDown">
                {renderGameType}
            </div>
        </div>
    );
}

export default DBDeckOptions;