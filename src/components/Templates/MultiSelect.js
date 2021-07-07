import React, { useState, useEffect } from 'react';

import '../../css/MultiSelect.css';

/**
 * A dropdown that allows for multiple selections
 * 
 * @prop {Array} options An Array of the options that can be selected. Each option is an object that has text and val as keys
 * @prop {String} [noneSelectedText='Select...'] String to show when nothing is currently selected. Defaults to "Select..."
 * @prop {Boolean} [useValForSelected=false] A boolean that determines whether to use the val to represent the rendered button when that option selected. False by default
 * @prop {Array} [initialSelected=[]] Initially selected options. If using state management (eg redux), set this value to that state.
 * @prop {Function} [selectedFn=undefined] A function to run when the selected options change.
 * @returns JSX for multiselectable dropdown
 */
function MultiSelect({ options, noneSelectedText = 'Select...', useValForSelected = false, initialSelected = [], selectedFn = undefined }) {

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

    // Helper function to add an option to selected if is not there already
    function addToSelected(option) {
        // initialize add to selected to be true
        let addOption = true;

        // Check each option currently selected and see if the option to be added is already selected
        for (const selectedOption of selected) {
            if (selectedOption.text === option.text && selectedOption.val === option.val) {
                addOption = false;
                break;
            }
        }

        // If the option passed and wasn't already selected --> Add it 
        if (addOption) {
            const newState = [...selected, option];

            // Update local state and use extra function if provided
            setSelected(newState);
            if (selectedFn) {
                selectedFn(newState);
            }
        }
    }

    // Map all of the options with add function
    const dropdownOptions = options.map((option) => {
        return (
            <div className="multi-option"
                onClick={(e) => { e.stopPropagation(); addToSelected(option) }}
                key={option.val}
            >
                {option.text}
            </div>
        );
    });

    // Helper function to remove an option from selected
    function removeFromSelected(event, option) {
        event.stopPropagation();
        const newState = selected.filter(current => current !== option);

        // Update local state and use extra function if provided
        setSelected(newState);
        if (selectedFn) {
            selectedFn(newState);
        }
    }

    // Initialize top-level multiselect contents
    let topLabelContents;

    // If nothing is selected, render "Select..." or provided text
    if (selected.length === 0) {
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

    // Class definitions that change if dropdown is open
    let chevronClass = "icon chevron down";
    let dropdownOptionsClass = "options";
    let selectedClass = "selected";

    if (open) {
        chevronClass = "icon chevron up";
        dropdownOptionsClass = "options active";
        selectedClass = "selected active";
    }

    return (
        <div className="multi-dropdown">
            <div className={selectedClass} onClick={(e) => { e.stopPropagation(); setOpen(!open) }}>
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
