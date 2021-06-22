import React from 'react';
import { useState } from 'react';


import Modal from '../Templates/Modal';
import '../../css/AdvancedOptions.css';

function AdvancedOptions() {
    const [modalOpen, setModalOpen ]= useState(false)

    console.log(modalOpen);

    const modalContent = ( 
        <div className="advancedOptionsModal">
            This is the advanced Options Modal!!
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