import React, { useState } from 'react';

import ColorCheckboxes from './ColorCheckboxes';

function SetDetailsOptions() {

    const [showCards, setShowCards] = useState("all");

    const JSXLayout = (<>
        {/* Buttons for: All Cards, Owned, Unowned */}
        <div>
            <label htmlFor="showCards">Show:</label>
            <span id="showCards" className="showCards">
                <input type="button" value="All Cards" onClick={() => setShowCards("all")}/>
                <input type="button" value="Owned Cards" onClick={() => setShowCards("owned")}/>
                <input type="button" value="Unowned Cards" onClick={() => setShowCards("unowned")}/>
            </span>
        </div>

        {/* Checkboxes for color: White, Blue, Black, Red, Green, All Multicolored, Colorless */}
        <ColorCheckboxes/>

            {/* Automatically uncheck all other boxes when "All Multicolored" or "Colorless" selected */}


        {/* Checkboxes for rarity: Mythic, Rare, Uncommon, Common */}


        {/* Pass options into Redux via Action Creator */}

    </>);

    return JSXLayout;
}

export default SetDetailsOptions;