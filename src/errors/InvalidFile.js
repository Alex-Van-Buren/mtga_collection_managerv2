export default function InvalidFile() {
    return (
        <div className="errorMessage">
            <h1 className="errorTitle">File not recognized!</h1>
            <ul>
                <li>
                    <div>Windows users will typically find their ".log" files at:</div>
                    <div>&emsp;&emsp;C:\Users\<span class="yourUserName">(Your User Name)</span>\AppData\LocalLow\Wizards Of The Coast\MTGA</div>
                </li>
                <br />
                <li>
                    <div>Mac users will typically find their ".log" files at:</div>
                    <div>&emsp;&emsp;C:/Users/<span class="yourUserName">(Your User Name)</span>/Library/Logs/Wizards Of The Coast/MTGA</div>
                </li>
            </ul>
        </div>
    );
}