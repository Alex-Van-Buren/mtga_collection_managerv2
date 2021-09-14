import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from '../Templates/Modal';
import SearchBar from '../Templates/SearchBar';
import ColorCheckboxes from '../SetDetails/ColorCheckboxes';
import RarityButtons from '../SetDetails/RarityButtons';
import NumberOwnedDropdown from '../SetDetails/NumberOwnedDropdown';
import BoosterDropdown from '../SetDetails/BoosterDropdown';
import CMCDropdowns from '../SetDetails/CMCDropdowns';
import SelectSet from './SelectSet';
import CardTypeDropdown from '../SetDetails/CardTypeDropdown';
import Reset from '../SetDetails/Reset';
import '../../css/AdvancedOptions.css';

/**
 * The advanced options button and its modal
 * @returns JSX for the button and modal
 */
function AdvancedOptions() {

    // Advanced options modal is open/closed
    const [modalOpen, setModalOpen] = useState(false);
    const { rarity, showCards, booster, set, cmcs, searchType, cardTypes} = useSelector(state => state.displayOptions);

    // Boolean for if advanced Options are being used
    let inUse = false;
    // Check if any of the advanced Options are not their defaults
    if (showCards !== 'Show All Cards' || booster !=='Show All Cards' || set.length > 0 || cardTypes.length > 0 || searchType !== null ||
        Object.values(rarity).includes(true) || cmcs.length > 0
    ) {
        inUse = true;
    }

    // JSX in the modal --> only viewable if modalOpen is true
    const modalContent = ( 
        <div className="advancedOptionsModal darkMode">
            <div className="closeModalButton">
                <button onClick={() => setModalOpen(!modalOpen)}><i className="close icon"></i></button>

            </div>
            <div>
                <SearchBar />
                <div className="advancedOptionsSection">
                    <RarityButtons header="Select Rarity/Rarities to Show:"  />
                    <ColorCheckboxes header="Select Color/Colors to Show:" />
                </div>
                <div className="advancedOptionsSection">
                    <NumberOwnedDropdown header="Number You Own:"/>
                    <BoosterDropdown header="In Booster Packs?"  />
                    <CMCDropdowns header="Select Mana Costs:"/>
                </div>
                <div className="advancedOptionsSection">
                    <SelectSet />
                    <CardTypeDropdown />
                    <Reset />
                </div>
            </div>

        </div>
    );

    // If moddalOpen is true --> render the modal, false --> null
    const renderedModal = modalOpen ? <Modal content={modalContent} show={modalOpen} setShow={setModalOpen} /> : null;

    return (
        <> 
        {/* Add inUse flag to class if some option ONLY in advanced options is being used */}
            <button className={inUse ? 'advancedOptionsButton inUse': 'advancedOptionsButton'} onClick={() => setModalOpen(!modalOpen)}
            title="Advanced Options"
            >
                <i className="icon cogs"></i>
            </button>
            {renderedModal}            
        </>
    );
}

export default AdvancedOptions;
