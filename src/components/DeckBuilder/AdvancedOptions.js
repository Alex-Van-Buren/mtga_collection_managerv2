import React from 'react';
import { useState } from 'react';


import Modal from '../Templates/Modal';
import SearchBar from '../Templates/SearchBar';
import ColorCheckboxes from '../SetDetails/ColorCheckboxes';
import RarityButtons from '../SetDetails/RarityButtons';
import NumberOwnedDropdown from '../SetDetails/NumberOwnedDropdown';
import BoosterDropdown from '../SetDetails/BoosterDropdown';
import CMCDropdowns from '../SetDetails/CMCDropdowns';
import '../../css/AdvancedOptions.css';

function AdvancedOptions() {
    const [modalOpen, setModalOpen ]= useState(false)

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
                </div>
            </div>

        </div>
    )

    const renderedModal = modalOpen ? <Modal content={modalContent} show={modalOpen} showModal={setModalOpen} /> : null;
    return (
        <> 
            <button onClick={() => setModalOpen(!modalOpen)}>AdvancedOptions</button>
            {renderedModal}            
        </>
    )
}

export default AdvancedOptions;