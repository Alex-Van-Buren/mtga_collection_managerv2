import React from 'react';

import '../css/Help.css';
import optionsImg from '../images/arena/options.png';
import accountImg from '../images/arena/Account.png';
import detailedLogsImg from '../images/arena/detailedLogs.png';

/**
 * The help page.
 * @returns 
 */
function Help() {

    return (
    <div className=' ui container helpPage'>
       
        <div>
            <h2>Finding Your Log file</h2>
            <p>Your log file is an automatically generated file created by MTG Arena named "Player.log". It can be 
                found at one of the following locations inside the drive where Arena is installed:
            </p>
            <ul>
                <li>Windows filepath: %USERPROFILE%\AppData\LocalLow\Wizards Of The Coast\MTGA</li>
                <li>Mac OS filepath: ~/Library/Logs/Wizards Of The Coast/MTGA</li>
            </ul>
            <p>Some folders may be hidden and you will need to unhide them in order to access them.</p>
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

        </div>

    </ div>);
}

export default Help;