/**
 * Return JSX for NoInventoryFound or InvalidFile Errors.
 * @param {boolean} props.invalidFile (Optional) Parameter that allows most of this code to be reused for the InvalidFile error.
 * Value of true will return InvalidFile instead of NoInventoryFound (very similar errors).
 * @returns Error JSX
 */
export default function NoInventoryFound({invalidFile=false}) {

    // Choose error header to show
    let errorTop;

    if (invalidFile) {
        errorTop = (<>
            <h1 className="errorTitle">File not recognized!</h1>
            <div className="errorSubtitle">To view your card inventory, you must select a Player Log file.</div>
    
            <div className="errorSublist">
                <div>
                    See the <a href='/help'>help page</a> if you need help finding your player logs.
                </div>
            </div>
            <br/>
            <br/>
        </>);
    } else {
        errorTop = (<>
            <h1 className="errorTitle">No inventory Data found!</h1>
            <div className="errorSubtitle">The selected file must be a Player Log with <strong>Detailed Logs</strong> enabled.</div>
    
            <div className="errorSublist">
                <div>
                    See the <a href='/help'>help page</a> if you need help finding your player logs or enabling detailed logs.
                </div>
            </div>
            <br/>
            <br/>
        </>);
    }

    return (
        <div className={`errorMessage`}>
            {errorTop}
        </div>
    );
}