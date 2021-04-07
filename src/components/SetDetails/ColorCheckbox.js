import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectColor } from '../../actions';

export default function ColorCheckbox({ color }) {

    // Get access to redux dispatcher
    const dispatch = useDispatch();

    // Get currently selected colors from redux state
    const colors = useSelector( state => state.detailsOptions.colors );

    return (
        <>
            {/* Color Label */}
            <label htmlFor={color}>{color}</label>
            
            {/* Color input */}
            <input type="checkbox" name={color} id={color} checked={colors[color]}

                // Call dispatch on selectColor action with the color name and its boolean value
                onChange={(e) => dispatch( selectColor(e.target.name, e.target.checked) ) }/>
        </>
    );
}