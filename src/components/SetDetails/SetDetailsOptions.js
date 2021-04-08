import React from 'react';
import { useDispatch } from 'react-redux';

import ColorCheckboxes from './ColorCheckboxes';
import { selectRarity /*, setShowCards*/ } from '../../actions';
import '../../css/SetDetailsOptions.css';

function SetDetailsOptions() {

    // Access redux dispatcher
    const dispatch = useDispatch();

    const JSXLayout = (<div className="setDetailsOptions">
        {/* Buttons for: All Cards, Owned, Unowned */}
        <div>
            <label className="showLabel">Show:</label>

            <input type="button" className="showButton" value="Unowned Cards" 
                /*onClick={() => dispatch(setShowCards("unowned"))}*/ />
            <input type="button" className="showButton" value="Owned Cards"
                /*onClick={() => dispatch(setShowCards("owned"))}*/ />
            <input type="button" className="showButton" value="All Cards"
                /*onClick={() => dispatch(setShowCards("all"))}*/ />
        </div>

        {/* Checkboxes for color: White, Blue, Black, Red, Green, All Multicolored, Colorless */}
        <ColorCheckboxes/>

        {/* Checkboxes for rarity: Mythic, Rare, Uncommon, Common */}
        <div>
            <label className="rarityLabel">Rarity:</label>

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