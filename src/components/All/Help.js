import React from 'react';
import { useLocation } from 'react-router-dom';

import optionsImg from '../../images/arena/options.png';
import accountImg from '../../images/arena/Account.png';
import detailedLogsImg from '../../images/arena/detailedLogs.png';
import Accordion from '../Templates/Accordion';
import NoInventoryFoundHelp from '../Errors/NoInventoryFoundHelp';
import '../../css/Help.css';

/**
 * The help page.
 */
function Help() {
    // Gets the query string from the URL
    const query = new URLSearchParams(useLocation().search);
    const openSection = query.get("openSection");

    // Object that has the open props for all of the Accordions
    let openAccordion = {
        findLogfile: false, detailedLogs: false, usingDraftCalculator: false, FAQ: false, bugs: false
    };

    // Set openSection of openAccordion to true
    if (openAccordion.hasOwnProperty(openSection)){
        openAccordion[openSection] = true;
    }

    // Frequently asked questions array of {question: "", answer: ""}
    const FAQs = [
        {
            question: "Uploading my log file doesn't do anything, why?",
            answer: "The developers removed the info from log files that we used to extract which cards you own. We don't " +
            "know if or when they'll put it back."
        },
        {
            question: 'What does uploading my "log file" do?',
            answer: "Your log file contains the IDs of all the cards you own, as well as your vault progress, gold, gems, " +
            "wildcards, etc. Collection Manager grabs this information and shows you what cards you own, how many drafts or" +
            " packs you need to complete each set, your current vault progress, and more."
        },
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
        },
        {
            question:"How many packs/drafts do I need to open/do to get all the cards in a set?",
            answer:"On each set's page, there is a tab to calculate how many additional packs you need to complete the rares or " +
            "mythics of a set as well as a tab to calculate how many drafts you will need to complete the rares or mythics of " +
            "a set."
        }
    ];

    // Known Bugs
    const bugs = [
        {
            text: "Resizing the window can prevent lists of images from loading. Scrolling through the list of images " +
            "may fix the problem. If this doesn't work, reloading will fix the issue."
        },
        {
            text: "Log files update gold/gems/wildcards, but nothing else since Wizards of the Coast removed inventory " + 
            "info from log files."
        }
    ];

    // Map the Bugs to JSX
    const renderBugs = bugs.map((bug, index) => {
        return <li key={`bug${index}`}>{bug.text}</li>;
    });
    
    // Map the FAQs to JSX
    const renderFAQs = FAQs.map((FAQ, index) => {
        return (
            <li key={index}>{FAQ.question}
                <ul>
                    <li>{FAQ.answer}</li>
                </ul>
            </li>            
        );
    });

    return (
    <>
    <h1 className='helpTitle'>Help</h1>
    <div className=' ui container helpPage'>
       
        <div className='findLogFile' id='findLogFile'>
            <Accordion open={openAccordion.findLogfile}>
                <h2>Finding Your Log file </h2>
                <p>Your log file is an automatically generated file created by MTG Arena named "Player.log". It is typically 
                    found at one of the following locations:
                </p>
                <NoInventoryFoundHelp help={true}/>
                <p>Some folders may be hidden and you will need to unhide them in order to access them.</p>
            </Accordion>
        </div>

        <div className="detailedLogs" id="detailedLogs">
            <Accordion open={openAccordion.detailedLogs}>
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

        <div className="usingDraftCalculator" id="usingDraftCalculator">
            <Accordion open={openAccordion.usingDraftCalculator}>
                <h2>How to Use the Draft Calculator</h2>
                <p>The draft calculator (located under the drafts tab on each set's page) calculates how many drafts it will take to complete a 
                    user's rare or mythic collection for that particular set. It uses a method where the user takes advantage of the duplicate protection
                    in Arena and waits until they are done drafting to open their packs. To use:
                </p>
                <ol>
                    <li>Choose your preferred draft type (Quick, Premier, Traditional).</li>
                    <li>Input your match win rate.
                        <ul>
                            <li>This is the percentage of time you win a given match.</li>
                            <li>For traditional best-of-three make sure the win rate is for the match and not individual games within a match.</li>
                        </ul>
                    </li>
                    <li>Input your average number of new cards picked for both rares and mythics.
                        <ul>
                            <li>This is how many new cards get added to your collection when you are picking the cards to play in draft. When you have few rares/mythics 
                                this number may be higher but as your collection grows it may go down. An average value should be used.
                            </li>
                            <li>Wait to open your reward packs until you are done drafting. This takes advantage of duplicate protection and keeps this number higher.</li>
                        </ul>
                    </li>
                    <li>When the drafts needed hits 0, it's time to open your packs!
                        <ul>
                            <li>For most users, completing rares is the primary goal, so open your packs when the drafts needed for rares hits 0.</li>
                            <li>If your goal is to complete mythics, only open your packs when the drafts needed for mythics hits 0.</li>
                        </ul>
                    </li>
                </ol>
            </Accordion>
        </div>

        <div className="FAQ" id="FAQ">
            <Accordion open={openAccordion.FAQ}>
                <h2>FAQ's</h2>
                <ol className="FAQList">
                    {renderFAQs}
                </ol>
            </Accordion>
        </div>

        <div className="FAQ">
            <Accordion open={openAccordion.bugs}>
                <h2>Known Bugs</h2>
                <ol className="FAQList">
                    {renderBugs}
                </ol>
            </Accordion>
        </div>

        <div className="contact" id="contact">
            <h2>Contact Us</h2>
            <div id="contact_discord">
                <p>Comments, questions, or suggestions? Contact us on Discord or Reddit:</p>
                
                <div id="contactLinks">
                    {/* Discord Link */}
                    <a href="https://discord.gg/H2cTG8nekF" target="_blank" rel="noreferrer">Join the Discord</a>

                    {/* Reddit Link */}
                    <a href="https://reddit.com/r/CollectionManager/" target="_blank" rel="noreferrer">Join the Subreddit</a>
                </div>
            </div>
        </div>
    </div>
    </>
    );
}

export default Help;