import React, { useState, useEffect } from 'react';

import '../../css/DarkModeToggle.css'

function DarkModeToggle() {
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    
    useEffect( () => {
        const userPreference = window.localStorage.getItem('darkMode');
        if (userPreference === 'on') {
            setDarkModeEnabled(true);
            document.body.classList.add('darkMode');
        }
        else {
            setDarkModeEnabled(false);
            document.body.classList.remove('darkMode');
        }
    }, []);

    function toggleDarkMode(darkModeEnabled) {

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
            role="checkbox" aria-checked={darkModeEnabled} aria-label="Dark Mode Toggle"
        >
            {/* Sun icon */}
            <i className={`sun icon ${darkModeEnabled ? 'grey' : 'yellow'}`}/>

            {/* Darkmode Toggle */}
            <div className="ui fitted toggle checkbox">
                <input 
                    type="checkbox" name="DarkModeToggle" id="DarkModeToggle" tabIndex="-1"
                    checked={darkModeEnabled} onChange={() => toggleDarkMode(darkModeEnabled)}
                />
                <label tabIndex="-1"></label>
            </div>

            {/* Moon icon */}
            <i className={`moon icon ${darkModeEnabled ? 'blue' : 'grey'}`}/>
        </div>
    );
}

export default DarkModeToggle;