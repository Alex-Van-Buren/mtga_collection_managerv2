import React from 'react';
import { useDispatch } from 'react-redux';

import ColorCheckboxes from './ColorCheckboxes';
import { selectRarity, setShowCards } from '../../actions';
import '../../css/SetDetailsOptions.css';

function SetDetailsOptions() {

    // Access redux dispatcher
    const dispatch = useDispatch();

    const JSXLayout = (<div className="setDetailsOptions">
        {/* Buttons for: All Cards, Owned, Unowned */}
        <label className="showLabel">Number Owned:</label>
        
        <div>
            <input type="button" className="showButton" value="None"
                onClick={() => dispatch(setShowCards("=0"))} />

            <input type="button" className="showButton" value="Own at least 1"
                onClick={() => dispatch(setShowCards(">0"))} />

            <input type="button" className="showButton" value="Missing at least 1"
                onClick={() => dispatch(setShowCards("<4"))} />

            <input type="button" className="showButton" value="Full Playset"
                onClick={() => dispatch(setShowCards("=4"))} />

            <input type="button" className="showButton" value="Show All Cards"
                onClick={() => dispatch(setShowCards("all"))} />
        </div>

        {/* Checkboxes for color: White, Blue, Black, Red, Green, All Multicolored, Colorless */}
        <ColorCheckboxes/>

        {/* Checkboxes for rarity: Mythic, Rare, Uncommon, Common */}
        <label className="rarityLabel">Rarity:</label>
        
        <div>
            <input type="button" className="rarityButton" value="Mythic"
                onClick={() => dispatch( selectRarity("mythic") )} />
            <input type="button" className="rarityButton" value="Rare"
                onClick={() => dispatch( selectRarity("rare") )} />
            <input type="button" className="rarityButton" value="Uncommon"
                onClick={() => dispatch( selectRarity("uncommon") )} />
            <input type="button" className="rarityButton" value="Common"
                onClick={() => dispatch( selectRarity("common") )} />
            <input type="button" className="rarityButton" value="All"
                onClick={() => dispatch( selectRarity("all") )} />
        </div>

        {/* Pass options into Redux via Action Creator */}

    </div>);

    return JSXLayout;
}

export default SetDetailsOptions;