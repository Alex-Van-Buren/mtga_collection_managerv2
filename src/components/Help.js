import React from 'react';

import '../css/Help.css';
import optionsImg from '../images/arena/options.png';
import accountImg from '../images/arena/Account.png';
import detailedLogsImg from '../images/arena/detailedLogs.png';
import Accordion from './Templates/Accordion';
import NoInventoryFound from '../components/Errors/NoInventoryFound';

/**
 * The help page.
 * @returns 
 */
function Help() {

    // Frequently asked questions array of {question: "", answer: ""}
    const FAQs = [
        {
            question:'What does "Collection Manager" do with my log file/info?',
            answer: "When a user uploads their log file, they are allowing their own internet browser to analyze it. " + 
            "We do NOT keep your log file or information."
        },
        {
            question:"How do I upload my log file on mobile?",
            answer: 'While "Collection Manager" can be used on mobile, the mobile application for MTG Arena does not seem ' + 
            'to generate a log file that "Collection Manager" can parse. If you wish, you could copy a log file to your phone' +
            ' from the desktop application.'
        }
    ]

    // Map the FAQs to JSX
    const renderFAQs = FAQs.map((FAQ, index) => {
        return (
            <li key={index}>{FAQ.question}
                <ul>
                    <li>{FAQ.answer}</li>
                </ul>
            </li>            
        )
    });

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
                <NoInventoryFound help={true}/>
                <p>Some folders may be hidden and you will need to unhide them in order to access them.</p>
            </Accordion>
        </div>

        <div className="detailedLogs">
            <Accordion>
                <h2>Enabling Detailed Logs</h2>
                <p>In order for this application to work properly, detailed logs need to enabled in MTG Arena. 
                This can be found at:   
                </p>
                <p>Options ➞ Account ➞ Detailed Logs</p>
                <div className="detailedLogImages">
                    <img src={optionsImg} alt="Find Options" title="Find Options" aria-label="Find Options" />
                    <img src={accountImg} alt="Find Account" title="Find Account" aria-label="Find Account" />
                    <img src={detailedLogsImg} alt="Enable Detailed Options" title="Enable Detailed Options" aria-label="Enable Detailed Options"/>
                </div>
            </Accordion>
        </div>

        <div className="FAQ">
            <Accordion>
                <h2>FAQ's</h2>
                <ol className="FAQList">
                    {renderFAQs}
                </ol>
            </Accordion>

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