import React, { useState } from 'react';

import '../../css/MultiSelect.css';

function MultiSelect({options}) {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);

    function addToSelected(option) {
        if (!selected.includes(option)) {
            setSelected([...selected, option])
        }
    }

    const dropdownOptions = options.map((option) => {
        return (
            <div className="multi-option"
            onClick={() => addToSelected(option)}
            key={option}
            >
                {option}
            </div>
        )
    }) 

    function removeFromSelected(event,option) {
        event.stopPropagation();
        setSelected( selected.filter( current => current !== option) )
    } 
    
    let topLabel;

    if ( selected.length === 0 ) {
        topLabel = <div className="selected" onClick={() => setOpen(!open)}>Select...</div>
    }
    else {
        const topLabelContents = selected.map((option) => {
            return (
                <button key={option} onClick={(e) => removeFromSelected(e, option)}>{option}</button>
            );
        });

        topLabel = <div className="selected" onClick={() => setOpen(!open)}>{topLabelContents}</div>
    }

    console.log(selected)
    return (
        <div className="multi-dropdown">
            {topLabel}
            <div className={open ? "options active" : "options"}>
                {dropdownOptions}
            </div>
        </div>
    )
}

export default MultiSelect;