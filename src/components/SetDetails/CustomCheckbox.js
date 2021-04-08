import React from 'react';

/**
 * A custom checkbox
 * @param {string} text Text for the checkbox
 * @param {boolean} checked True/false the checkbox is checked
 * @param {function} onChange Function to execute on checkbox change
 * @returns 
 */
export default function CustomCheckbox({ text, checked, onChange, labelClass, inputClass }) {

    return (
        <>
            {/* Checkbox Label */}
            <label htmlFor={text} className={labelClass}>{text}</label>
            
            {/* Checkbox input */}
            <input type="checkbox" name={text} id={text} checked={checked} onChange={onChange} className={inputClass}/>
        </>
    );
}