export const NO_INVENTORY_FOUND = (
    <div className="errorMessage">
        <h1 className="errorTitle">No inventory Data found!</h1>
        <p>Ensure file is a valid Player Log with "Detailed Logs" enabled.</p>
        <ul>
            <li>
                <div>Detailed Logs can be found in MTG Arena under:</div>
                <div>&emsp;&emsp;Options ➞ Account ➞ Detailed Logs</div>
            </li>
            <br />
            <li>
                <div>Windows users will typically find their ".log" files at:</div>
                <div>&emsp;&emsp;C:\Users\<span id="yourUserName">(Your User Name)</span>\AppData\LocalLow\Wizards Of The Coast\MTGA</div>
            </li>
        </ul>
        
    </div>
);

export const INVALID_FILE = (
    <div className="errorMessage">
        <h1 className="errorTitle">File not recognized!</h1>
        <p>Windows users will typically find their ".log" files at:</p>
        <p>&emsp;&emsp;C:\Users\<span id="yourUserName">(Your User Name)</span>\AppData\LocalLow\Wizards Of The Coast\MTGA</p>
    </div>
);