import React from 'react';
import { useState } from 'react';

import Modal from '../Templates/Modal';
import SearchBar from '../Templates/SearchBar';
import ColorCheckboxes from '../SetDetails/ColorCheckboxes';
import RarityButtons from '../SetDetails/RarityButtons';
import NumberOwnedDropdown from '../SetDetails/NumberOwnedDropdown';
import BoosterDropdown from '../SetDetails/BoosterDropdown';
import CMCDropdowns from '../SetDetails/CMCDropdowns';
import Reset from '../SetDetails/Reset';
import '../../css/AdvancedOptions.css';

/**
 * The button to open the advanced options modal and the modal if modal open is true
 * @returns JSX for the button and modal
 */
function AdvancedOptions() {
    // State of the modal
    const [modalOpen, setModalOpen ]= useState(false)

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
                    <CMCDropdowns header="Select Mana Cost:"/>
                    <Reset />
                </div>
            </div>

        </div>
    );

    // If moddalOpen is true --> render the modal, false --> null
    const renderedModal = modalOpen ? <Modal content={modalContent} show={modalOpen} showModal={setModalOpen} /> : null;

    return (
        <> 
            <button className="advancedOptionsButton" onClick={() => setModalOpen(!modalOpen)}
            title="Advanced Options"
            >
                <i className="icon cogs"></i>
            </button>
            {renderedModal}            
        </>
    )
}

export default AdvancedOptions;