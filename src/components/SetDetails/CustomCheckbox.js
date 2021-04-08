import React from 'react';

/**
 * A custom checkbox
 * @param {string} text Text for the checkbox
 * @param {boolean} checked True/false the checkbox is checked
 * @param {function} onChange Function to execute on checkbox change
 * @param {string} labelClass Class name(s) for the label
 * @param {string} inputClass Class name(s) for the input
 * @returns Checkbox JSX
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