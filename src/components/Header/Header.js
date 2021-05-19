import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { setInfo , historicSets } from '../../data/setInfo';
import DarkModeToggle from './DarkModeToggle';
import HeaderDropDown from './HeaderDropDown';
import PlayerInventory from './PlayerInventory';
import GetFile from './GetFile';
import HeaderModal from './HeaderModal';
import '../../css/Header.css';

/**
 * Header Component displayed on every page in App.
 * - Displays Links to different Components
 */
function Header() {

    const [hamburgerClicked, setHamburgerClicked] = useState(false);

    // Icon is an x when hamburger expanded, and 3 bars when collapsed
    const hamburgerClass = hamburgerClicked? "x" : "bars";

    // Hide menu at mobile sizes when hamburger isn't clicked
    const hideMenu = hamburgerClicked? "" : "hideMenu";

    const setLinks = historicSets.map((setId) => {
        const title = setInfo[setId].name;   
        return (
            <Link className="dd-item" key={setId} to={'/set/'+setId}>{title}</Link>
        )
    });
    
    return (<>
        <HeaderModal />

        <div id="headerMarginBottom">

            <div id="header">

                {/* Options on Left Side */}
                <div className={`${hideMenu} leftOptions`}>
                    <Link to='/' className="heading" id="home">Home</Link>

                    
                    <HeaderDropDown title="Sets" titleClass="heading" itemsClass="sets">
                        {setLinks}
                    </HeaderDropDown>
                    
                </div>

                {/* Options on Right Side */}
                <div className={`${hideMenu} rightOptions`}>

                    {/* File Selector */}
                    <GetFile />

                    {/* Help Menu */}
                    <Link to='/help' className="heading" id="help">Help</Link>


                    {/* Dark Mode Toggle */}
                    <DarkModeToggle />
                </div>

            </div>

            {/* Hamburger menu */}
            <div id="hamburger"
                onClick={(e) => setHamburgerClicked(!hamburgerClicked)}
            >
                <i className={`hamburger icon ${hamburgerClass}`} />
            </div>

            {/* Player Inventory */}
            <PlayerInventory />
        </div>
    </>);
}

export default Header;