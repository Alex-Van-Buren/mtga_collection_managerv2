import React, { useState, useEffect } from 'react';

import '../../css/CustomDropdown.css';

/**
 * Creates a dropdown menu where the selected item is displayed
 * @param {Array} props.items An array of strings that are the different options that can be selected
 * @param {String} props.firstSelection The string of the default selection. Should be one of the strings in the items array.
 * @param {Function} props.selectfn Optional. An additional callback function that uses the item selected as an argument.
 * @param {String} props.ariaLabel Optional. An aria-label.
 * @returns Custom dropdown JSX.
 */
function CustomDropdown({ items, firstSelection, selectfn=undefined, ariaLabel=undefined }) {
    const [open, setOpen] = useState(false);

    // In some cases keeping track of selected might be redundant
    const [selected, setSelected] = useState(firstSelection);
    
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
    const dropdownItems = items.map((item) => {

        return (
            <div 
                className='dropdown-item' key={item} tabIndex='0' 
                onKeyDown={(e) => { if (e.key === 'Enter') clickItem(item) }} 
                onClick={() => clickItem(item)}
                role='button' 
            >
                {item}
            </div>
        )
    });

    // Closed dropdown classes
    let iconClass = 'icon chevron down';
    let itemsClass = 'dropdown-items dropdown-closed';
    let selectedClass = 'dropdown-selected dropdown-closed'

    // Change classes if dropdown is open
    if (open) {
        iconClass = 'icon chevron up';
        itemsClass = 'dropdown-items';
        selectedClass = 'dropdown-selected';
    }

    function toggleDropdown(event) {
        event.stopPropagation();
        setOpen(!open);
    }

    return (
        <div className="dropdown">
            <div
                className={selectedClass} tabIndex='0' 
                onKeyDown={(e) => { if (e.key === 'Enter') toggleDropdown(e) }} 
                onClick={(e) => toggleDropdown(e)}
                role='button' aria-expanded={open} aria-label={ariaLabel}
            >
                {selected} <span><i className={iconClass}/></span>

            </div>
            <div className={itemsClass}>{dropdownItems}</div>
        </div>
    )
}

export default CustomDropdown;
