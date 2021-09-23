import React, { useState, useEffect } from 'react';

import Modal from '../Templates/Modal';
import { setCookie, getCookies } from '../../hooks/cookies';
import getTime from '../../hooks/getTime';
import '../../css/Announcements.css';

/**
 * Creates a Modal pop-up using session storage to relay announcements to users. Will display on each new session.
 */
function Announcements() {

    const version = 'v0.6.3';

    // Specify date of newest announcement. Announcements hidden after this date won't be shown.
    const newestAnnouncement = 20210922000000; // YYYY + MM + DD + 000000

    const [modalOpen, setModalOpen] = useState(true);

    // Check if these announcements have been hidden
    useEffect(() => {

        const { hide } = getCookies();
        if (parseInt(hide) > newestAnnouncement) {
            setModalOpen(false);
        }
    }, []);

    const announceList = <div id="announce">

        <div className="spacedModalHeader">

            <div className="invisible closeButtonSpacer"/>

            <h1>{version} Announcements:</h1>

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
                    <strong>Your card collection is now stored in your browser!</strong>
                    <p>Clearing your cookies + site data for "all time" will also clear your collection! (Clearing less than "all time" is safe though)</p>
                </li>
                <li>
                    <strong>Manual Collection Tracking is now available!</strong>
                    <p>Log files are still broken, so automatic tracking via uploading a log file is still unavailable.</p>
                    <p>Directions:</p>
                    <ul>
                        <li>Click on the set you want to track</li>
                        <li>Find the card that you want to update by either scrolling to it or using card filters</li>
                        <li>Hover over the number owned (X/4)</li>
                        <li>The buttons to change how many you own will appear!</li>
                    </ul>
                </li>
                <li>
                    <strong>This site is in pre-release!</strong>
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
