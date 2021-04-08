import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectColor } from '../../actions';
import CustomCheckbox from './CustomCheckbox';

export default function ColorCheckboxes() {

    // Access the redux dispatcher
    const dispatch = useDispatch();

    // Get currently selected colors from redux state
    const colorValues = useSelector( state => state.detailsOptions.colors );

    // List card colors and create color checkboxes for each
    const colors = ['white', 'blue', 'black', 'red', 'green', 'multi', 'colorless'];
    const renderColors = colors.map(color => {
        return <CustomCheckbox text={color} key={color} checked={colorValues[color]} 
        onChange={(e) => dispatch( selectColor(e.target.name, e.target.checked) )}/>;
    });

    return (
        
        // Checkboxes for color: White, Blue, Black, Red, Green, All Multicolored, Colorless
        <div>
            <label htmlFor="color">Color(s):</label>
            {renderColors}
        </div>
    );
}
