import React from 'react';
import { useDispatch } from 'react-redux';

/**
 * A custom React-Redux button.
 * @param {function} action The raw action to dispatch.
 * @param {any} value The value to be dispatched.
 * @param {string} className Class name(s) to be applied to the button. Equal to "" if not specified.
 * @param {string} text The button text. Equal to value if not specified.
 * @returns Button JSX
 */
export default function CustomButton({ action, value, className="", text=value }) {

    // Access redux reducer
    const dispatch = useDispatch();

    return (
        <button className={className} onClick={() => dispatch(action(value))} >
            {text}
        </button>
    );
}