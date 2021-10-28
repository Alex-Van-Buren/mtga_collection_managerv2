import React, { useState, useEffect } from 'react';

import Modal from '../Templates/Modal';
import { setCookie, getCookies } from '../../hooks/cookies';
import getTime from '../../hooks/getTime';
import '../../css/Announcements.css';

/**
 * Creates a Modal pop-up using session storage to relay announcements to users. Will display on each new session.
 */
function Announcements() {

    const version = 'v1.0.1';

    // Specify date of newest announcement. Announcements hidden after this date won't be shown.
    const newestAnnouncement = 20211028000000; // YYYY + MM + DD + 000000

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
                    <strong>Full version of Collection Manager released</strong>
                    <p>We will continue to add new sets as they are released, but have no plans to work on new features.</p>
                    <p>
                        Until WotC adds your owned cards back to log files, the original point of this website, being an 
                        outside-of-game auto-tracker, doesn't work.
                    </p>
                    <p>
                        Viewing sets, manual tracking, deck building, and the draft calculator all still work, but
                        are less useful without automatic tracking.
                    </p>
                </li>
            </ol>
        </div>

        <div className="announcementButtons">
            <button 
                onClick={() => {
                    // Hide current announcements for 2 weeks (will show any new announcements)
                    setCookie('hide', getTime(), 366);
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
