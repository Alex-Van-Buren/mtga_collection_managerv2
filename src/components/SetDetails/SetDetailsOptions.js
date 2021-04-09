import React from 'react';

import ColorCheckboxes from './ColorCheckboxes';
import CustomButton from './CustomButton';
import { selectRarity, setShowCards } from '../../actions';
import '../../css/SetDetailsOptions.css';

function SetDetailsOptions() {

    return (<div className="setDetailsOptions">
        
        {/* Buttons that select cards to show based on number in inventory */}
        <label className="showLabel">Number Owned:</label>
        <div className="showList">
            <CustomButton action={setShowCards} className="showButton" value="=0" text="None"/>
            <CustomButton action={setShowCards} className="showButton" value=">0" text="Own at least 1"/>
            <CustomButton action={setShowCards} className="showButton" value="<4" text="Missing at least 1"/>
            <CustomButton action={setShowCards} className="showButton" value="=4" text="Full Playset"/>
            <CustomButton action={setShowCards} className="showButton" value="all" text="Show All Cards"/>
        </div>

        {/* Checkboxes for color: White, Blue, Black, Red, Green, All Multicolored, Colorless */}
        <ColorCheckboxes/>

        {/* Buttons that select rarity: Mythic, Rare, Uncommon, Common */}
        <label className="rarityLabel">Rarity:</label>
        <div className="showList">
            <CustomButton action={selectRarity} className="rarityButton" value="mythic"/>
            <CustomButton action={selectRarity} className="rarityButton" value="rare"/>
            <CustomButton action={selectRarity} className="rarityButton" value="uncommon"/>
            <CustomButton action={selectRarity} className="rarityButton" value="common"/>
            <CustomButton action={selectRarity} className="rarityButton" value="all"/>
        </div>
    </div>);
}

export default SetDetailsOptions;