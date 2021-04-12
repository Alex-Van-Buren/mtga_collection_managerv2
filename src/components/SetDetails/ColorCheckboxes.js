import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectColor } from '../../actions';
import CustomCheckbox from './CustomCheckbox';
import '../../css/ColorCheckboxes.css';

// Import SVG images
import W from '../../images/W.svg';
import U from '../../images/U.svg';
import B from '../../images/B.svg';
import R from '../../images/R.svg';
import G from '../../images/G.svg';
import M from '../../images/M.svg';
import C from '../../images/C.svg';

export default function ColorCheckboxes() {

    // Access the redux dispatcher
    const dispatch = useDispatch();

    // Get currently selected colors from redux state
    const colorValues = useSelector( state => state.detailsOptions.colors );

    // List card colors and the tags needed for their icons
    const colors = ['white', 'blue', 'black', 'red', 'green', 'multi', 'colorless'];
    const colorSVGs = [ W, U, B, R, G, M, C ];
    
    // Create color checkboxes for each
    const renderColors = colors.map( (color, index) => {
        return (
            <CustomCheckbox
                // Data
                text={color} key={color} checked={colorValues[color]}

                // Icon
                labelText={ <img className="colorIcon" src={colorSVGs[index]} alt="icon" /> }

                // Classes
                labelClass="colorBoxInputLabel" inputClass="colorBoxInput"

                // Dispatch redux action
                onChange={(e) => dispatch( selectColor(e.target.name, e.target.checked) )}
            />
        );
    });

    return (
        
        // Checkboxes for color: White, Blue, Black, Red, Green, All Multicolored, Colorless
        <div className="colorBox">
            <label htmlFor="color" className="colorBoxLabel">Color(s):</label>
            <div className="colorList">
                {renderColors}
            </div>
        </div>
    );
}
