import React, { useState, useEffect } from 'react';

import '../../css/MultiSelect.css';

function MultiSelect({ options, noneSelectedText = 'Select...', useValForSelected=false, initialSelected= [], selectedfn = undefined} ) {

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

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(initialSelected);

    // A function to fire every time "selected" changes. Needed for redux state
    useEffect(() => {
        if (selectedfn) {
            selectedfn(selected)
        }
    },[selected, selectedfn])

    // Helper function to add an option to selected if is not there already
    function addToSelected(option) {
        if (!selected.includes(option)) {
            setSelected([...selected, option])
        }
    }

    // Map all of the options with add function
    const dropdownOptions = options.map((option) => {
        return (
            <div className="multi-option"
            onClick={(e) =>{e.stopPropagation(); addToSelected(option)}}
            key={option.val}
            >
                {option.text}
            </div>
        )
    }) 

    // Helper function to remove an option from selected
    function removeFromSelected(event,option) {
        event.stopPropagation();
        setSelected( selected.filter( current => current !== option) )
    } 
    
    // Initialize top element contents
    let topLabelContents;

    // If nothing is selected, render "Select..."
    if ( selected.length === 0 ) {
        topLabelContents = noneSelectedText;
    }

    // Else map all selected options and render them
    else {
        topLabelContents = selected.map((option) => {
            return (
                <button key={option.val} onClick={(e) => removeFromSelected(e, option)}>
                    {useValForSelected ? option.val : option.text}
                    <i className="delete icon"></i>
                </button>
            );
        });
    }

    let chevronClass = "icon chevron down";
    let dropdownOptionsClass = "options ";
    let selectedClass = "selected";

    if (open) {
        chevronClass = "icon chevron up";
        dropdownOptionsClass = "options active";
        selectedClass = "selected active";
    }

    return (
        <div className="multi-dropdown">
            <div className={selectedClass}onClick={(e) =>{e.stopPropagation(); setOpen(!open)}}>
                {topLabelContents}
                <i className={chevronClass}></i>
            </div>
            <div className={dropdownOptionsClass}>
                {dropdownOptions}
            </div>
        </div>
    )
}

export default MultiSelect;