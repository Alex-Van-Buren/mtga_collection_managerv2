import React from 'react';
import { Link } from 'react-router-dom';

import DarkModeToggle from './DarkModeToggle';
import GetFile from './GetFile';
import '../css/Header.css';

/**
 * Header Component displayed on every page in App.
 * - Displays Links to different Components
 * TODO: Hamburgerize at small screen size (that rhymes)
 */
function Header() {
    return (
        <div className="ui stackable menu">
            {/* Options on Left Side */}
            <Link to='/' className="item">Home</Link>
            <div className="item">Another thing</div> {/* Here for testing only */}

            {/* Options on Right Side */}
            <div className="right menu">

                {/* File Selector */}
                <div className="ui input">
                    <GetFile />
                </div>

                {/* Help Menu */}
                <div className="item">Help</div>

                {/* Dark Mode Toggle */}
                <div className="item">
                    <DarkModeToggle />
                </div>
            </div>
        </div>           
    );
}

export default Header;