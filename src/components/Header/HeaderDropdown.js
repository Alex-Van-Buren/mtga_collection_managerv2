import React, {useState, useEffect } from 'react';

import '../../css/HeaderDropdown.css'

function HeaderDropdown(props) {
    // State for if dropdown is open or closed
    const [open, setOpen] = useState(false);

    let titleClass = "dd-title " + props.titleClass;
    if (open) {
        titleClass +=" active";
    }

    // Close Dropdown on all clicks outside of dropdown
    useEffect(() => {
        function closeOnOutsideClick() {
            setOpen(false);
        }
        document.body.addEventListener('click', closeOnOutsideClick);

        return () => {
            document.body.removeEventListener('click', closeOnOutsideClick);
        }
    }, []);
   
    // Define all the items within the dropdown from props.children
    const items = (
    <div className={open ? `dd-items ${props.itemsClass}` : `dd-items hidden ${props.itemsClass}`} >
        {props.children}
    </div>)

    function keyboardToggle(event) {
        if (event.key === "Enter") {
            setOpen(!open);
        }
    }

    return (
        <div className="headerDropdown heading">        
            <div className={titleClass} 
            onClick={(e) => {e.stopPropagation(); setOpen(!open)}} 
            tabIndex='0' role="button" aria-expanded={open}
            onKeyDown={(e)=> keyboardToggle(e)}>
                <span>{props.title} &nbsp;  <i className={open ? "icon chevron up" : "icon chevron down"}></i> </span>               
            </div>
            {items}
        </div>
    )
}

export default HeaderDropdown;
