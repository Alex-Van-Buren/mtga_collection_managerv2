import React, { useState } from 'react';

import ColorCheckboxes from './ColorCheckboxes';

function SetDetailsOptions() {

    const [showCards, setShowCards] = useState("unowned");

    // TODO: Fix. Currently suppressing warning
    if (false) console.log(showCards);

    const JSXLayout = (<div className="setDetailsOptions">
        {/* Buttons for: All Cards, Owned, Unowned */}
        <div>
            <label htmlFor="showCards" className="showLabel">Show:</label>

            <input type="button" className="showButton" value="Unowned Cards" onClick={() => setShowCards("unowned")}/>
            <input type="button" className="showButton" value="Owned Cards" onClick={() => setShowCards("owned")}/>
            <input type="button" className="showButton" value="All Cards" onClick={() => setShowCards("all")}/>
        </div>

        {/* Checkboxes for color: White, Blue, Black, Red, Green, All Multicolored, Colorless */}
        <ColorCheckboxes/>

        {/* Checkboxes for rarity: Mythic, Rare, Uncommon, Common */}


        {/* Pass options into Redux via Action Creator */}

    </div>);

    return JSXLayout;
}

export default SetDetailsOptions;