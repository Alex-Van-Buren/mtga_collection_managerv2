import React, { useState } from 'react';

import Modal from '../Templates/Modal';
import '../../css/Announcements.css';

/**
 * Creates a Modal pop-up using session storage to relay announcements to users. Will display on each new session.
 */
function Announcements() {

    const [modalOpen, setModalOpen] = useState(true);

    // Check if announcement has been made this session
    // eslint-disable-next-line eqeqeq
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

            <div className="invisible closeModalButton"><i className="close icon"/></div>

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
                    <p>The site URL will soon be moving to a permanent domain (i.e. <strong>NOT</strong> https://alex-van-buren.github.io/)</p>
                    <p>Performance optimizations: cards now load only once they're about to enter the screen. This should speed up the site.</p>
                    <p>Further performance optimizations will come once the permanent site is established.</p>
                </li>
                <li>
                    <strong>The Deck Builder is finally here... But it's not done yet!</strong>
                    <p>The deck builder is in active development. Some features are missing, but most features work on the desktop version.</p>
                    <p>Use the Filters on the left side to change which cards you see, advanced filters are available under the three-cogs icon.</p>
                    <p>Click or drag & drop cards into your deck, sideboard, commander, or companion.</p>
                    <p>Import or export a deck from/to file or clipboard.</p>
                    <p>Some drag & drop features do not currently work in "Limited" mode.</p>
                </li>
                <li>
                    <strong>Log Files are currently broken!</strong>
                    <p>The recent update removed your currently owned cards from the log files, so we can't show you which cards you currently own.</p>
                    <p>Features related to your currently owned cards will be reimplemented as soon as a relevant patch is released.</p>
                </li>
                <li>
                    <strong>Jumpstart: Historic Horizons is here!</strong>
                    <p>Card images are currently "Placeholder Images". But will be updated once Scryfall updates their data.</p>
                </li>
            </ol>
        </div>
        <br /><br />
    </div>;

    const renderedModal = modalOpen ? <Modal content={announceList} show={modalOpen} setShow={setModalOpen} /> : null;

    return renderedModal;
}

export default Announcements;
