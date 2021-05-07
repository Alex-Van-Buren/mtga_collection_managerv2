import React from 'react';

/**
 * The help page.
 * @returns 
 */
function Help() {

    /* Template:
    <label htmlFor="" className="helpLabel">

        </label>
        <div id="" className="helpDiv">
            
        </div>
    */

    return (<>

        <label htmlFor="useage" className="helpLabel">
            How to use
        </label>
        <div id="useage" className="helpDiv">
            {/* For MTG Arena.  */}
            {/* Upload player log for set progress tracking, packs/drafts needed to complete set, deck builder, ... */}
            {/* Toggle between standard/historic sets */}
            {/* Selecting a set: click on set tag or select from dropdown */}
            {/* Detail Card Filters, Packs, and Drafts tabs. Include full useage details */}
            {/* Enlarge card: click. Use keyboard or arrows to navigate */}
            {/* Using on mobile:  */}
            {/* Supported browsers:  */}
        </div>


        <label htmlFor="uploading" className="helpLabel">
            Finding your player log file
        </label>
        <div id="uploading" className="helpDiv">
            <h3>Player logs typically found at:</h3>
            <p>Windows filepath: %USERPROFILE%\AppData\LocalLow\Wizards Of The Coast\MTGA</p>
            <h4>Example:</h4>
            <p>C:\Users\UserName\AppData\LocalLow\Wizards Of The Coast\MTGA</p>

            {/* Enable detailed logs (images?) */}
        </div>


        <label htmlFor="upcomingFeatures" className="helpLabel">
            Upcoming Features
        </label>
        <div id="upcomingFeatures" className="helpDiv">
            {/* Planned/upcoming features:  */}
        </div>


        <label htmlFor="accessibility" className="helpLabel">
            Accessibility Options
        </label>
        <div id="accessibility" className="helpDiv">
            {/* Navigate between cards with left and right arrow keys. Escape closes. Spacebar flips. */}
        </div>


        <label htmlFor="faqs" className="helpLabel">
            FAQS
        </label>
        <div id="faqs" className="helpDiv">
            <ul>
                {/* How soon after a new set is released do you update? */}
            </ul>
        </div>


        <label htmlFor="cookiesAndTracking" className="helpLabel">
            Cookies and Tracking
        </label>
        <div id="cookiesAndTracking" className="helpDiv">
            {/* Details about cookies and tracking (TBD) */}
        </div>


        <label htmlFor="contactUs" className="helpLabel">
            Contact us or report a problem:
        </label>
        <div id="contactUs" className="helpDiv">
            {/* How to report a problem:  */}
            {/* Contact/message us:  */}
            {/* Request features:  */}
            {/* Github link? Don't know if we want to share our code or not */}
        </div>
    </>);
}

export default Help;