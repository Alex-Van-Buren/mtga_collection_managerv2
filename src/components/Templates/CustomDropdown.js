import React, { useState, useEffect } from 'react';

import '../../css/CustomDropdown.css';

/**
 * Creates a dropdown menu where the selected item is displayed
 * @prop {Array} items An array of strings that are the different options that can be selected
 * @prop {Array} labels An array corresponding with items. items determines the value passed to the selectfn, while
 * labels determines what text is shown in the dropdown, if that label is defined. Only the specific labels that should
 * be overwritten need to be defined.
 * @example (with only one overwritten label): const labels = []; labels[4] = "historic brawl";
 * @prop {String} firstSelection The string of the default selection. Should be one of the strings in the items array.
 * @prop {Function} [selectfn=undefined] An additional callback function that uses the item selected as an argument.
 * @prop {String} [ariaLabel=undefined] An aria-label.
 * @returns Custom dropdown JSX.
 */
function CustomDropdown({ items, labels=[], firstSelection, selectfn=undefined, ariaLabel=undefined }) {
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
    function dropdownItems() {
        const temp = [];

        for (let i=0; i<items.length; i++) {
            const item = items[i];

            // The displayed label may be different from the item
            const label = labels[i] ? labels[i] : items[i];

            temp.push(<div 
                className='dropdown-item' key={item} tabIndex='0' 
                onKeyDown={(e) => { if (e.key === 'Enter') clickItem(item) }} 
                onClick={() => clickItem(item)}
                role='button' 
            >
                {label}
            </div>);
        }

        return temp;
    }

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

    const index = items.indexOf(selected);

    return (
        <div className="dropdown">
            <div
                className={selectedClass} tabIndex='0' 
                onKeyDown={(e) => { if (e.key === 'Enter') toggleDropdown(e) }} 
                onClick={(e) => toggleDropdown(e)}
                role='button' aria-expanded={open} aria-label={ariaLabel}
            >
                {labels[index] ? labels[index] : items[index]} <span><i className={iconClass}/></span>

            </div>
            <div className={itemsClass}>{dropdownItems()}</div>
        </div>
    );
}

export default CustomDropdown;
