import React, {useState, useEffect } from 'react';

import '../../css/HeaderDropDown.css'

function HeaderDropDown(props) {
    // State for if dropdown is open or closed
    const [open, setOpen] = useState(false);

    let titleClass = "dd-title " + props.titleClass;
    if (open) {
        titleClass +=" active";
    }

    // Close Dropdown on all clicks outside of dropdown
    useEffect(() => {
        document.body.addEventListener('click', () => setOpen(false));

        return () => {
            document.body.removeEventListener('click', () => setOpen(false));
        }
    }, []);
   
    // Define all the items within the dropdown from props.children
    const items = (
    <div className={open ? `dd-items ${props.itemsClass}` : `dd-items hidden ${props.itemsClass}`} >
        {props.children}
    </div>)

    return (
        <>        
            <div className={titleClass} onClick={(e) => {e.stopPropagation(); setOpen(!open)}} tabIndex='0'>
                {props.title} <i className={open ? "icon chevron up" : "icon chevron down"}></i>                
            </div>
            {items}
        </>
    )
}

export default HeaderDropDown;