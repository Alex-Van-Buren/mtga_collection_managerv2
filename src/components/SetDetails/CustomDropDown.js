import React, { useState, useEffect } from 'react';

import '../../css/CustomDropDown.css';

/**
 * Creates a dropdown menu where the selected item is displayed
 * @param {Array} props.items An array of strings that are the different options that can be selected
 * @param {String} props.firstSelection The string of the default selection. Should be one of the strings in the items array.
 * @param {Function} props.selectfn Optional. An additional callback function that uses the item selected as an argument.
 * 
 */
function CustomDropDown({items, firstSelection, selectfn=undefined}) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(firstSelection);

    // Close Dropdown on all clicks outside of dropdown
    useEffect(() => {   
        document.body.addEventListener('click', () => setOpen(false));

        return () => {
            document.body.removeEventListener('click', () => setOpen(false));
        }
    }, []);

    // Call the additional selection function on first render if it exists (for initializing redux states)
    // TODO: This use case might be unwanted
    useEffect(()=> {
        if ( selectfn ) {
            selectfn(firstSelection);
            setSelected(firstSelection);
        }
    },[firstSelection, selectfn])

    // Helper function for clicking an item in the dropdown
    function clickItem(item) {
        setSelected(item);
        setOpen(false);

        // Some Uses of dropdown may have additional things to do when selecting an option (like dispatch redux)
        if (selectfn) {
            selectfn(item);
        }
    }

    // Map the Items
    const dropDownItems = items.map((item) => {
        return (
            <div className='dropDown-item' key={item} onClick={() =>clickItem(item)}>{item}</div>
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

    function toggleDropdown(event) {
        event.stopPropagation();
        setOpen(!open);
    }

    return (
        <div className="dropDown">
            <div className={selectedClass} onClick={(e) => toggleDropdown(e)}>{selected} <span><i className={iconClass}></i></span></div>
            <div className={itemsClass}>{dropDownItems}</div>
        </div>
    )
}

export default CustomDropDown;