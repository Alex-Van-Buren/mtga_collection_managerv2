import React, { useState } from 'react';

import ExportDeck from './ExportDeck';
import ImportDeck from './ImportDeck';
import Modal from '../Templates/Modal';
import '../../css/ImportExportDeck.css';

/**
 * The import and export deck buttons and their modal
 * @returns JSX for the buttons and modal
 */
function ImportExportModal() {

    // Import/export modal is open/closed
    const [modalOpen, setModalOpen] = useState(false);

    // Determine whether to show the import or export functions (defaults to export)
    const [isImport, setIsImport] = useState(false);

    // JSX in the modal --> only viewable if modalOpen is true
    const modalContent = (
        <div className="importExportModal darkMode">
            {isImport ? <ImportDeck setModalOpen={setModalOpen} /> : <ExportDeck setModalOpen={setModalOpen} />}
        </div>
    );

    // If moddalOpen is true --> render the modal, false --> null
    const renderedModal = modalOpen ? <Modal content={modalContent} show={modalOpen} setShow={setModalOpen} /> : null;

    return (
        <div id='importExportButtons'>
            <button className="importExportButton" title="Import Deck Button"
                onClick={() => {
                    // Select import and open modal
                    setIsImport(true);
                    setModalOpen(!modalOpen);
                }}
            >
                Import Deck
            </button>
            
            <button className="importExportButton" title="Export Deck Button"
                onClick={() => {
                    // Select export and open modal
                    setIsImport(false);
                    setModalOpen(!modalOpen);
                }}
            >
                Export Deck
            </button>

            {/* Open Modal only when buttons clicked */}
            {renderedModal}            
        </div>
    );
}

export default ImportExportModal;
