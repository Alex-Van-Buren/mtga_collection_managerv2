import React, { useState } from 'react';

import '../../css/CustomDropDown.css';

function CustomDropDown({items, firstSelection}) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(firstSelection);

    // Map the Items
    const dropDownItems = items.map((item) => {
        return (
            <div className='dropDown-item' onClick={() =>{setSelected(item); setOpen(false)} }>{item}</div>
        )
    });
    // Closed dropdown classes
    let iconClass = 'icon chevron down';
    let itemsClass = 'dropDown-items dropDown-closed';
    let selectedClass = 'dropDown-selected dropDown-closed'

    // Change classes if dropDown is open
    if (open) {
        iconClass = 'icon chevron up';
        itemsClass = 'dropDown-items';
        selectedClass = 'dropDown-selected'
    }

    return (
        <div className="dropDown">
            <div className={selectedClass} onClick={() => setOpen(!open)}>{selected} <span><i className={iconClass}></i></span></div>
            <div className={itemsClass}>{dropDownItems}</div>
        </div>
    )
}

export default CustomDropDown;