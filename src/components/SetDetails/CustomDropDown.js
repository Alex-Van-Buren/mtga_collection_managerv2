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
    const itemsClass = open ? 'dropDown-items' : 'dropDown-items dropDown-closed';
    return (
        <div className="dropDown">
            <div className="dropDown-selected" onClick={() => setOpen(!open)}>{selected}</div>
            <div className={itemsClass}>{dropDownItems}</div>
        </div>
    )
}

export default CustomDropDown;