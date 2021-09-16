import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomDropdown from '../Templates/CustomDropdown';
import ImportExportModal from './ImportExportModal';
import { selectDeckType, setDeck, setSideboard, changeCommander, changeCompanion } from '../../actions';
import '../../css/DBDeckOptions.css';

/**
 * Options that affect the deck in the deck builder. Includes the deck type (e.g. standard, limited, etc.), import and
 * export buttons, and clear/reset deck button.
 */
function DBDeckOptions() {
    
    const dispatch = useDispatch();
    const { deckType, deck, sideboard } = useSelector(state => state.deckBuilder);
    
    // Deck/game type
    const items = [ "standard", "historic", "limited", "brawl", "historicbrawl", "future", "custom" ];
    const labels = []; labels[4] = "historic brawl";
    const renderGameType = <CustomDropdown
        items={items} labels={labels} firstSelection={deckType}
        selectfn={(item) => dispatch(selectDeckType(item))}
        ariaLabel="Select deck type"
    />

    // Reset deck
    function clearDeck() {

        // Check the deckType
        if (deckType === 'limited' ){

            // If creating limited deck --> move all cards from deck to sideboard, then clear deck, companion and commander
            dispatch(setDeck([]));
            dispatch(setSideboard(deck.concat(sideboard).flat()));
            dispatch(changeCommander(null));
            dispatch(changeCompanion(null));

        } else {

            // Clear deck, sideboard, companion, and commander
            dispatch(setDeck([]));
            dispatch(setSideboard([]));
            dispatch(changeCommander(null));
            dispatch(changeCompanion(null));
        }
    }

    const clearButton = (
        <button className="clearDeck"
            onClick={() => clearDeck()}
        >
            {deckType === "limited" ? "Reset to Sideboard" : "Clear Deck"}
        </button>
    );

    return (
        <div id="DBDeckOptions">

            <label htmlFor="gameTypeDropDown">Game Mode:</label>
            <div id="gameTypeDropDown">
                {renderGameType}
            </div>

            <ImportExportModal />
            {clearButton}
        </div>
    );
}

export default DBDeckOptions;
