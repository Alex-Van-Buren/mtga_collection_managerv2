import { useState, useRef } from 'react';

import makeKeyboardClickable from '../../hooks/makeKeyboardClickable';

/**
 * Button to copy path to keyboard
 * @param {string} text Button text
 * @param {function} setText Set button text function
 * @param {ref} ref Button ref
 * @param {string} path Path to copy
 */
function renderPathButton(text, setText, ref, path) {
    return (
        <button className="errorButton" tabIndex="0" ref={ref} onKeyDown={e => makeKeyboardClickable(e, ref)}
            onClick={() => {
                // Write path to clipboard
                navigator.clipboard.writeText(path);

                // Update button text without state
                setText("Copied!");
            }}
        >
            {text}
        </button>
    );
}

/**
 * Return JSX for NoInventoryFound or InvalidFile Errors.
 * @param {boolean} props.invalidFile (Optional) Parameter that allows most of this code to be reused for the InvalidFile error.
 * Value of true will return InvalidFile instead of NoInventoryFound (very similar errors).
 * @returns Error JSX
 */
export default function NoInventoryFound({invalidFile=false, help=false}) {
    const [windowsButton, setWindowsButton] = useState("Copy Path");
    const [macButton, setMacButton] = useState("Copy Path");

    const wRef = useRef();
    const mRef = useRef();

    const windowsPath = "%USERPROFILE%\\AppData\\LocalLow\\Wizards Of The Coast\\MTGA";
    const macPath = "~/Library/Logs/Wizards Of The Coast/MTGA";

    // Choose error header to show
    let errorTop;
    let helpClass = "";
    
    if (help) {
        errorTop = null;
        helpClass = "helpErrorText";
    
    } else if (invalidFile) {
        errorTop = (<>
            <br/>
            <h1 className="errorTitle">File not recognized!</h1>
        </>);
    } else {
        errorTop = (<>
            <br/>
            <h1 className="errorTitle">No inventory Data found!</h1>
            <div className="errorSubtitle">File must be a Player Log with <strong>Detailed Logs</strong> enabled.</div>
    
            <div className="errorSublist">
                <div>
                    Detailed Logs can be found in MTG Arena under:
                    <div className="errorText">Options ➞ Account ➞ Detailed Logs</div>
                </div>
            </div>
        </>);
    }

    return (
        <div className={`errorMessage ${helpClass}`}>

            {errorTop}
            
            <div className="errorSublist">
                <div>
                    Windows
                    <div className="errorText">Default filepath for ".log" files:</div>
                    <div className="errorText">C:\Users\<span className="yourUserName">(Your User Name)</span>\AppData\LocalLow\Wizards Of The Coast\MTGA</div>
                </div>

                <div>{renderPathButton(windowsButton, setWindowsButton, wRef, windowsPath)}</div>

            </div>
            <br />
            <div className="errorSublist">
                <div>
                    Mac
                    <div className="errorText">Default filepath for ".log" files:</div>
                    <div className="errorText">Macintosh HD/Users/<span className="yourUserName">(Your User Name)</span>/Library/Logs/Wizards Of The Coast/MTGA</div>

                </div>

                <div>{renderPathButton(macButton, setMacButton, mRef, macPath)}</div>
            </div>
            <br />
        </div>
    );
}