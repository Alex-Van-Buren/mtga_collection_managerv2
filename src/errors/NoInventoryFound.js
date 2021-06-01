import { useState, useRef } from 'react';

import makeKeyboardClickable from '../hooks/makeKeyboardClickable';

/**
 * Helper function to create button to copy path to keyboard
 * @param {string} text Button text
 * @param {function} setText Set button text function
 * @param {ref} ref Button ref
 * @param {string} path Path to copy
 */
function renderPathButton(text, setText, ref, path) {
    return (
        <button className="errorButton" tabindex="0" ref={ref} onKeyDown={e => makeKeyboardClickable(e, ref)}
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

export default function NoInventoryFound() {
    const [windowsButton, setWindowsButton] = useState("Copy Path");
    const [macButton, setMacButton] = useState("Copy Path");

    const ref = useRef();

    const windowsPath = "%USERPROFILE%\\AppData\\LocalLow\\Wizards Of The Coast\\MTGA";
    const macPath = "~/Library/Logs/Wizards Of The Coast/MTGA";

    return (
        <div className="errorMessage">
            <h1 className="errorTitle">No inventory Data found!</h1>
            <h2>Ensure file is a valid Player Log with "Detailed Logs" enabled.</h2>

            <div className="errorSublist">
                <div>
                    Detailed Logs can be found in MTG Arena under:
                    <div className="errorText">Options ➞ Account ➞ Detailed Logs</div>
                </div>
                
            </div>
            <br />
            <div className="errorSublist">
                <div>
                    Windows users will typically find their ".log" files at:

                    <div className="errorText">C:\Users\<span className="yourUserName">(Your User Name)</span>\AppData\LocalLow\Wizards Of The Coast\MTGA</div>
                </div>

                <div>{renderPathButton(windowsButton, setWindowsButton, ref, windowsPath)}</div>

            </div>
            <br />
            <div className="errorSublist">
                <div>
                    Mac users will typically find their ".log" files at:

                    <div className="errorText">Macintosh HD/Users/<span className="yourUserName">(Your User Name)</span>/Library/Logs/Wizards Of The Coast/MTGA</div>

                </div>

                <div>{renderPathButton(macButton, setMacButton, ref, macPath)}</div>
            </div>
        </div>
    );
}