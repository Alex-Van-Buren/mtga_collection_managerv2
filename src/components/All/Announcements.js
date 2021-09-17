import React, { useState, useEffect } from 'react';

import Modal from '../Templates/Modal';
import { setCookie, getCookies } from '../../hooks/cookies';
import getTime from '../../hooks/getTime';
import '../../css/Announcements.css';

/**
 * Creates a Modal pop-up using session storage to relay announcements to users. Will display on each new session.
 */
function Announcements() {

    // Specify date of newest announcement. Announcements hidden after this date won't be shown.
    const newestAnnouncement = 20210917000000; // YYYY + MM + DD + 000000

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

            <h1>v0.6.2 Announcements:</h1>

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
                    <strong>Innistrad: Midnight Hunt is now available!</strong>
                    <p>The game mode legalities for the MID set has not been fully updated.</p>
                    <p>Set the game mode to "future" if you wish to use the deck builder with the MID set.</p>
                </li>
                <li>
                    <strong>MTG Arena's log file are still completely broken.</strong>
                    <p>We thought there might've been a somewhat workable solution, but it turns out that the log files are just really poorly constructed!</p>
                </li>
                <li>
                    <strong>New card legalities available</strong>
                    <p>Historic Brawl and Future legalities are now available as Game Modes in the Deck Builder!</p>
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
