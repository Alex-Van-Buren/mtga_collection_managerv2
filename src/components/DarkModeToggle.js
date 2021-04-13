import React, { useState, useEffect } from 'react';

import '../css/DarkModeToggle.css'

function DarkModeToggle() {
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    
    useEffect(() => {
        const userPreference = window.localStorage.getItem('darkMode');
        if(userPreference === 'on') {
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
        <>
            {/* Sun icon */}
            <i className={`sun icon ${darkModeEnabled ? 'grey' : 'yellow'}`}/>

            {/* Darkmode Toggle */}
            <div className="ui fitted toggle checkbox">
                <input 
                    type="checkbox" name="DarkModeToggle" id="DarkModeToggle" 
                    checked={darkModeEnabled} onChange={() => toggleDarkMode(darkModeEnabled)}/>
                <label></label>
            </div>

            {/* Moon icon */}
            <i className={`moon icon ${darkModeEnabled ? 'blue' : 'grey'}`}/>
        </>
    )
}

export default DarkModeToggle;