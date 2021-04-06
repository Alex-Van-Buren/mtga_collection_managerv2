import React from 'react';



function SetDetailsOptions() {
    const JSXLayout = (<>
        {/* Radio buttons for: All Cards, Owned, Unowned */}
        <div className="ui form">
            <div className="inline fields">
                <label>Show</label>
                <div className="field">
                    <div className="ui radio checkbox">
                        <input type="radio" name="showRadio" checked="checked" id="allCards"/>
                        <label htmlFor="allCards">All Cards</label>
                    </div>
                </div>
                <div className="field">
                    <div className="ui radio checkbox">
                        <input type="radio" name="showRadio" id="owned"/>
                        <label htmlFor="owned">Owned</label>
                    </div>
                </div>
                <div className="field">
                    <div className="ui radio checkbox">
                        <input type="radio" name="showRadio" id="unowned"/>
                        <label htmlFor="unowned">Unowned</label>
                    </div>
                </div>
            </div>
        </div>

        {/* Checkboxes for color: White, Blue, Black, Red, Green, All Multicolored, Colorless */}

            {/* Automatically uncheck all other boxes when "All Multicolored" or "Colorless" selected */}


        {/* Checkboxes for rarity: Mythic, Rare, Uncommon, Common */}


        {/* Pass options into Redux via Action Creator */}

    </>);

    return JSXLayout;
}

export default SetDetailsOptions;