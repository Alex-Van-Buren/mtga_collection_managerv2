import React from 'react';

import '../css/Help.css';
import optionsImg from '../images/arena/options.png';
import accountImg from '../images/arena/Account.png';
import detailedLogsImg from '../images/arena/detailedLogs.png';
import Accordion from './Templates/Accordion';

/**
 * The help page.
 * @returns 
 */
function Help() {

    return (
    <>
    <h1 className='helpTitle'>Help</h1>
    <div className=' ui container helpPage'>
       
        <div className='findLogFile'>
            <Accordion>
                <h2>Finding Your Log file </h2>
                <p>Your log file is an automatically generated file created by MTG Arena named "Player.log". It can be 
                    found at one of the following locations inside the drive where Arena is installed:
                </p>
                <ul>
                    <li>Windows filepath: %USERPROFILE%\AppData\LocalLow\Wizards Of The Coast\MTGA</li>
                    <li>Mac OS filepath: ~/Library/Logs/Wizards Of The Coast/MTGA</li>
                </ul>
                <p>Some folders may be hidden and you will need to unhide them in order to access them.</p>
            </Accordion>
        </div>

        <div className="detailedLogs">
            <h2>Enabling Detailed Logs</h2>
            <p>In order for this application to work properly, detailed logs need to enabled in MTG Arena. 
            This can be found at:   
            </p>
            <p>Options ➞ Account ➞ Detailed Logs</p>
            <div className="detailedLogImages">
                <img src={optionsImg} alt="" />
                <img src={accountImg} alt="" />
                <img src={detailedLogsImg} alt="" />
            </div>
        </div>

        <div className="FAQ">
            <h2>FAQ's</h2>
            <ol>
                <li>What does "Collection Manager" do with my log file/info?
                    <ul>
                        <li>When a user uploads their log file, they are allowing their own browser to analzye it. We do NOT keep
                        your log file or information.</li>
                    </ul>
                </li>
                <li>How do I upload my log file on mobile?
                    <ul>
                        <li>While "Collection Manager" can be used on mobile, the mobile application for MTG Arena does not seem to 
                        generate a log file that "Collection Manager" can parse.</li>
                    </ul>
                </li>
            </ol>

        </div>

        <div className="contact">
            <h2>Contact Us</h2>
            <p>If you have any questions/concerns feel free to message us at: <span className='contactInfo'>ADD ACTUAL CONTACT INFO</span></p>
        </div>

    </ div>
    </>
    );
}

export default Help;