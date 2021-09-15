import React, { useState, useEffect } from 'react';

import Modal from '../Templates/Modal';
import { setCookie, getCookies } from '../../hooks/cookies';
import getTime from '../../hooks/getTime';
import '../../css/Announcements.css';

// Specify date of newest announcement. Announcements hidden after this date won't be shown.
const newestAnnouncement = 20210915000000; // YYYY + MM + DD + 000000

/**
 * Creates a Modal pop-up using session storage to relay announcements to users. Will display on each new session.
 */
function Announcements() {

    const [modalOpen, setModalOpen] = useState(true);

    // Check if these announcements have been hidden
    useEffect(() => {

        const { hide } = getCookies();
        if (parseInt(hide) > newestAnnouncement) {
            setModalOpen(false);
        }
    }, []);

    const announceList = <div id="announce">

        <div className="announceHeader">

            <div id="announcementSpacer" className="invisible"></div>

            <h1>Announcements:</h1>

            {/* Modal Close */}
            <div className="closeModalButton">
                <button onClick={() => setModalOpen(!modalOpen)}><i className="close icon"/></button>
            </div>
        </div>

        {/* 
            Current announcements that show up when loading the home page
            - structured as an li containing a strong tag as the title and optional p tags with additional info
        */}
        <div id="announceList">
            <ol>
                <li>
                    <strong>This site is in pre-release!</strong>
                </li>
                <li>
                    <strong>Log Files are still broken</strong>
                    <p>We will update Collection Manager as soon as MTG Arena updates their log files.</p>
                </li>
                <li>
                    <strong>The deck builder is here!</strong>
                    <p>...and frankly, it's lookin' pretty good.</p>
                </li>
            </ol>
        </div>

        <div className="announcementButtons">
            <button 
                onClick={() => {
                    // Hide current announcements for 2 weeks (will show any new announcements)
                    setCookie('hide', getTime(), 14);
                    setModalOpen(false);
                }} className="ui green button"
            >
                Dismiss
            </button>
        </div>

    </div>;

    return modalOpen ? <Modal content={announceList} show={modalOpen} setShow={setModalOpen} /> : null;
}

export default Announcements;
