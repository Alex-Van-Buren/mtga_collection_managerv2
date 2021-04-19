import React from 'react';
import { Link } from 'react-router-dom';

import DarkModeToggle from './DarkModeToggle';
import GetFile from './GetFile';
import '../../css/Header.css';

/**
 * Header Component displayed on every page in App.
 * - Displays Links to different Components
 * TODO: Hamburgerize at small screen size (that rhymes)
 */
function Header() {
    return (

        // NOTE: ADD "bordered" CLASS TO ALL ITEMS IN THIS COMPONENT TO ENSURE THEIR BORDER
        // APPEARS PROPERLY IN DARK MODE

        <div className="ui stackable menu">
            {/* Options on Left Side */}
            <Link to='/' className="bordered item">Home</Link>
            <div className="bordered item">Another thing</div> {/* Here for testing only */}

            {/* Options on Right Side */}
            <div className="right menu">

                {/* File Selector */}
                <div className="bordered ui input">
                    <GetFile />
                </div>

                {/* Help Menu */}
                <div className="bordered item">Help</div>

                {/* Dark Mode Toggle */}
                <div className="bordered item">
                    <DarkModeToggle />
                </div>
            </div>
        </div>           
    );
}

export default Header;