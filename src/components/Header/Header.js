import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import DarkModeToggle from './DarkModeToggle';
import DropDown from '../DropDown';
import GetFile from './GetFile';
import '../../css/Header.css';

/**
 * Header Component displayed on every page in App.
 * - Displays Links to different Components
 * TODO: Hamburgerize at small screen size (that rhymes)
 */
function Header() {

    const [hamburgerClicked, setHamburgerClicked] = useState(false);

    // Icon is an x when hamburger expanded, and 3 bars when collapsed
    const hamburgerClass = hamburgerClicked? "x" : "bars";

    // Hide menu at mobile sizes when hamburger isn't clicked
    const hideMenu = hamburgerClicked? "" : "hideMenu";

    return (<div id="headerMarginBottom">

        <div id="header">

            {/* Options on Left Side */}
            <div className={hideMenu} id="leftOptions">
                <Link to='/' className="heading">Home</Link>

                
                <DropDown title="Sets" extraClass="heading">
                    
                </DropDown>
                
            </div>

            {/* Options on Right Side */}
            <div className={hideMenu} id="rightOptions">

                {/* File Selector */}
                <GetFile />

                {/* Help Menu */}
                <div className="heading">
                    Help
                </div>

                {/* Dark Mode Toggle */}
                <DarkModeToggle className="heading" />
            </div>

        </div>

        {/* Hamburger menu */}
        <div id="hamburger"
            onClick={(e) => setHamburgerClicked(!hamburgerClicked)}
        >
            <i className={`hamburger icon ${hamburgerClass}`} />
        </div>
    </div>);
}

export default Header;