import React, { useState, useEffect } from 'react';

import '../../css/DarkModeToggle.css'
/**
 * Uses a css class "darkMode" and toggles the class in the body of the document to update css variables to change the look of the site
 * from lightmode to darkmode. Also stores a users preference so that subsequent visits to the site are rendered with preference of the user.
 * @returns DarkMode Toggler
 */
function DarkModeToggle() {
    // The state of darkMode - set to true because all users should know the superior mode as default
    const [darkModeEnabled, setDarkModeEnabled] = useState(true);
    
    useEffect( () => {

        // Check the user's preference for darkMode in localstorage
        const userPreference = window.localStorage.getItem('darkMode');

        // If they prefer to be blinded and shun the ways of darkMode - let them
        if (userPreference === 'off') {
            setDarkModeEnabled(false);
            document.body.classList.remove('darkMode');
        }
        // If they don't ever stray from the path of darkMode they will never have a localStorage preference
        else {
            setDarkModeEnabled(true);
            document.body.classList.add('darkMode');
        }
    }, []);

    // The function that changes darkMode and sets the localStorage value for it so subsequent visits keep their preference - even if they do prefer lightmode
    function toggleDarkMode(darkModeEnabled) {

        // Can't just do a simple simple setDarkModeEnabled(!darkModeEnabled) since we need to update localStorage 
        // Check the status of darkMode and change it was well as the update localstorage and update the classList of the page
        if (darkModeEnabled) {
            setDarkModeEnabled(false);
            window.localStorage.setItem('darkMode', 'off');
            document.body.classList.remove('darkMode');
        }
        else {
            setDarkModeEnabled(true);
            window.localStorage.setItem('darkMode', 'on');
            document.body.classList.add('darkMode');
        }
    }

    return (
        <div
            // Accessibility
            className="darkmodeToggle heading" tabIndex="0"
            onKeyDown={ e => {if (e.key === "Enter") toggleDarkMode(darkModeEnabled)} }
            onClick={ () => toggleDarkMode(darkModeEnabled) }
            role="checkbox" aria-checked={darkModeEnabled} aria-label="Dark Mode Toggle"
        >
            {/* Sun icon */}
            <i className={`sun icon ${darkModeEnabled ? 'grey' : 'yellow'}`}/>

            {/* Darkmode Toggle */}
            <div className="ui fitted toggle checkbox">
                <input 
                    type="checkbox" name="DarkModeToggle" id="DarkModeToggle" tabIndex="-1"
                    checked={darkModeEnabled} readOnly
                />
                <label tabIndex="-1"></label>
            </div>

            {/* Moon icon */}
            <i className={`moon icon ${darkModeEnabled ? 'blue' : 'grey'}`}/>
        </div>
    );
}

export default DarkModeToggle;