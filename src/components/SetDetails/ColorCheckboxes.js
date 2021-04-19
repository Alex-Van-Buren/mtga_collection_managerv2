import React, { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectColor } from '../../actions';
import CustomCheckbox from './CustomCheckbox';
import makeKeyboardClickable from '../../hooks/makeKeyboardClickable';
import '../../css/ColorCheckboxes.css';

// Import SVG images
import W from '../../images/color_imgs/W.svg';
import U from '../../images/color_imgs/U.svg';
import B from '../../images/color_imgs/B.svg';
import R from '../../images/color_imgs/R.svg';
import G from '../../images/color_imgs/G.svg';
import C from '../../images/color_imgs/C.svg';
import M from '../../images/color_imgs/M.svg';

export default function ColorCheckboxes() {

    // Access the redux dispatcher
    const dispatch = useDispatch();

    // Get currently selected colors from redux state
    const colorValues = useSelector( state => state.displayOptions.colors );

    // List card colors and the tags needed for their icons
    const colors = ['white', 'blue', 'black', 'red', 'green', 'colorless', 'multi'];
    const colorSVGs = [ W, U, B, R, G, C, M ];
    
    /* REALLY CONVOLUTED WAY TO MAKE ELEMENTS FROM MAP KEYBOARD ACCESSIBLE */
        // Need to keep track of length of colors array, because references depend on it
        const colorLen = colors.length;
        // Use state to rerender component upon change
        const [colorRefs, setColorRefs] = useState([]);
        useEffect(() => {
            // Set state to keep track of refs to each color checkbox
            setColorRefs(colorRefs => (
                // Fill colorRefs array - keeping current ref if it exists, otherwise make a new one
                Array(colorLen).fill().map((_, i) => colorRefs[i] || createRef())
            ));
        }, [colorLen]);
    /* End convoluted keyboard accessibility stuff */

    // Create color checkboxes for each
    const renderColors = colors.map( (color, i) => {

        const iconClass = colorValues[color] ? "big colorIcon" : "colorIcon";

        return (
            <div className="colorCheckbox" key={color}>
                <CustomCheckbox
                    // Data
                    text={color} key={color} checked={colorValues[color]}
    
                    // Icon
                    labelText={ <img
                        className={iconClass} src={colorSVGs[i]} alt="icon"

                        // Keyboard accessibility
                        aria-controls={color} role="checkbox" aria-checked={colorValues[color]} tabIndex="0"
                        aria-label={color} ref={ colorRefs[i] }
                        onKeyDown={ (e) => makeKeyboardClickable(e, colorRefs[i])}

                        // Need to call blur so icon behavior works as expected with mouse
                        // - icon doesn't keep focus after blur is called
                        onMouseLeave={ () => colorRefs[i].current.blur() }
                    /> }
    
                    // Classes
                    labelClass="colorBoxInputLabel" inputClass="colorBoxInput"
    
                    // Dispatch redux action
                    onChange={(e) => dispatch( selectColor(e.target.name, e.target.checked) )}
                />
            </div>
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
