import React, {useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import useResizeWidth from '../../hooks/useResizeWidth';
import '../../css/DropDown.css'

function HeaderDropDown(props) {
    // State for if dropdown is open or closed
    const [open, setOpen] = useState(false);

    let titleClass = "dd-title " + props.titleClass;
    if (open) {
        titleClass +=" active";
    }

    // Closes the dropdown when location changes
    const location = useLocation();
    useEffect(() => {
        setOpen(false);
    },[location])
   
    // Define all the items within the dropdown from props.children
    const items = (
    <div className={open ? `dd-items ${props.itemsClass}` : `dd-items hidden ${props.itemsClass}`} >
        {props.children}
    </div>)

    /*  The items need to be put inside or outside the title div for css ease
        so one variable contains the items while the other is set to null based on the screen width.
    */
    let hamburgerItems, normalItems ;
    const width = useResizeWidth();
    if ( width <= 739 ) {
        hamburgerItems = items;
        normalItems = null;
    } else {
        hamburgerItems = null;
        normalItems = items;
    }

    return (
        <>        
            <div className={titleClass} onClick={() => setOpen(!open)}>{props.title} <i className={open ? "icon chevron up" : "icon chevron down"}></i>
                {normalItems}
            </div>
            {hamburgerItems}
        </>
    )
}

export default HeaderDropDown;