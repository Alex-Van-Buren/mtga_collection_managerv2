import React, { useState } from 'react';

import Modal from '../Templates/Modal';
import '../../css/Announcements.css';

/**
 * Creates a Modal pop-up using session storage to relay announcements to users. Will display on each new session.
 */
function Announcements() {

    const [modalOpen, setModalOpen] = useState(true);

    // Check if announcement has been made this session
    if (window.sessionStorage.getItem("seenAnnouncements") === "true") {

        // Don't show this modal when announcements have been seen this session
        return null;
    } 
    // Update that the user has seen current announcements this session
    if (!modalOpen) {

        window.sessionStorage.setItem("seenAnnouncements", "true");
    }

    const announceList = <div id="announce">

        <div className="announceHeader">

            <div id="announcementSpacer" className="invisible"></div>

            <h1>Announcements:</h1>

            {/* Modal Close */}
            <div className="closeModalButton">
                <button onClick={() => setModalOpen(!modalOpen)}><i className="close icon"/></button>
            </div>
        </div>

        {/* Current announcements that show up when loading the home page */}
        <div id="announceList">
            <ol>
                <li>
                    <strong>This site is in pre-release!</strong>
                </li>
                <li>
                    <strong>Log Files are still broken</strong>
                    <p>We will update Collection Manager as soon as MTG Arena updates their log files!</p>
                </li>
                <li>
                    <strong>Check out the deck builder</strong>
                </li>
            </ol>
        </div>
        <br /><br />
    </div>;

    const renderedModal = modalOpen ? <Modal content={announceList} show={modalOpen} setShow={setModalOpen} /> : null;

    return renderedModal;
}

export default Announcements;
