import React, { useState } from 'react';

function SetDetailsOptions() {

    const [showCards, setShowCards] = useState("all");

    const checkColor = (event) => {
        console.log(event.target.name);
    }

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
        <div>
            <label htmlFor="color">Color(s):</label>
            <span>
                <label htmlFor="white">White</label>
                <input type="checkbox" name="white" id="white" onClick={(e) => checkColor(e)}/>
                <label htmlFor="blue">Blue</label>
                <input type="checkbox" name="blue" id="blue" onClick={(e) => checkColor(e)}/>
                <label htmlFor="black">Black</label>
                <input type="checkbox" name="black" id="black" onClick={(e) => checkColor(e)}/>
                <label htmlFor="red">Red</label>
                <input type="checkbox" name="red" id="red" onClick={(e) => checkColor(e)}/>
                <label htmlFor="green">Green</label>
                <input type="checkbox" name="green" id="green" onClick={(e) => checkColor(e)}/>
                <label htmlFor="multicolored">All Multicolored</label>
                <input type="checkbox" name="multicolored" id="multicolored" onClick={(e) => checkColor(e)}/>
                <label htmlFor="colorless">Colorless</label>
                <input type="checkbox" name="colorless" id="colorless" onClick={(e) => checkColor(e)}/>
            </span>
        </div>

            {/* Automatically uncheck all other boxes when "All Multicolored" or "Colorless" selected */}


        {/* Checkboxes for rarity: Mythic, Rare, Uncommon, Common */}


        {/* Pass options into Redux via Action Creator */}

    </>);

    return JSXLayout;
}

export default SetDetailsOptions;