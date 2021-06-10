import React from 'react';

/**
 * A custom checkbox
 * @param {string} props.text Text for the checkbox
 * @param {boolean} props.checked True/false the checkbox is checked
 * @param {function} props.onChange Function to execute on checkbox change
 * @param {string} props.labelClass Class name(s) for the label
 * @param {string} props.inputClass Class name(s) for the input
 * @returns Checkbox JSX
 */
export default function CustomCheckbox({ text, labelText=text, checked, onChange, labelClass, inputClass }) {

    return (
        <>
            {/* Checkbox input */}
            <input type="checkbox" name={text} id={text} checked={checked} onChange={onChange} className={inputClass}/>
            
            {/* Checkbox Label */}
            <label htmlFor={text} className={labelClass}>{labelText}</label>
        </>
    );
}