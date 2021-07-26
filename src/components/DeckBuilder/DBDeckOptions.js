import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectDeckType } from '../../actions';
import CustomDropdown from '../Templates/CustomDropdown';
import ImportExportModal from './ImportExportModal';
import { setDeck, setSideboard, changeCommander, changeCompanion } from '../../actions'
import '../../css/DBDeckOptions.css';

function DBDeckOptions() {
    
    const dispatch = useDispatch();
    const selectedDeckType = useSelector(state => state.deckBuilder.deckType);
    const currentDeck      = useSelector(state => state.deckBuilder.deck);
    const currentSideboard = useSelector(state => state.deckBuilder.sideboard);
    
    // Deck/game type
    const items = [ "standard", "historic", "limited", "brawl", "custom" ];
    const renderGameType = <CustomDropdown
        items={items} firstSelection={selectedDeckType}
        selectfn={(item) => dispatch(selectDeckType(item))}
        ariaLabel="Select deck type"
    />

    // Reset deck
    function clearDeck() {
        // Check the deckType
        if (selectedDeckType === 'limited' ){
            // If creating limited deck --> move all cards from deck to sideboard, then clear deck, companion and commander
            const newSideboard = currentDeck.flat().concat(currentSideboard);
            dispatch(setDeck([]));
            dispatch(setSideboard(newSideboard));
            dispatch(changeCommander(null));
            dispatch(changeCompanion(null));

        } else {
            // Otherwise clear main deck, sideboard, companion, and commander
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
            Clear Deck
        </button>
    )

    return (
        <div id="DBDeckOptions">
            <label htmlFor="gameTypeDropDown">Deck Type:</label>
            <div id="gameTypeDropDown">
                {renderGameType}
            </div>
            <ImportExportModal />
            {clearButton}
        </div>
    );
}

export default DBDeckOptions;