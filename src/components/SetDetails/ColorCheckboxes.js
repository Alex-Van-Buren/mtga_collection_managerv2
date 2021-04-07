import React, { useEffect, /*useState*/ } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectColor } from '../../actions';

export default function ColorCheckboxes() {

    // Initialize all colors to false
    // const [colors, setColors] = useState( 
    //     { white: false, blue: false, black: false, red: false, green: false, multi: false, colorless: false }
    // );

    const dispatch = useDispatch();
    const colors = useSelector( state => state.detailsOptions.colors );

    console.log(colors)

    // Executes logic when color checkboxes update
    // useEffect(() => {}, [colors]);

    return (
        
        /*
         * Checkboxes for color: White, Blue, Black, Red, Green, All Multicolored, Colorless
         * - onChange used to update boolean value for color
         */
        <div>
            <label htmlFor="color">Color(s):</label>
            <span>
                <label htmlFor="white">White</label>
                <input type="checkbox" name="white" id="white" checked={colors.white}
                    onChange={(e) => dispatch( selectColor(e.target.name, e.target.checked) ) }/>

                <label htmlFor="blue">Blue</label>
                <input type="checkbox" name="blue" id="blue" checked={colors.blue}
                    onChange={(e) => dispatch( selectColor(e.target.name, e.target.checked) ) }/>

                <label htmlFor="black">Black</label>
                <input type="checkbox" name="black" id="black" checked={colors.black}
                    onChange={(e) => dispatch( selectColor(e.target.name, e.target.checked) ) }/>

                <label htmlFor="red">Red</label>
                <input type="checkbox" name="red" id="red" checked={colors.red}
                    onChange={(e) => dispatch( selectColor(e.target.name, e.target.checked) ) }/>

                <label htmlFor="green">Green</label>
                <input type="checkbox" name="green" id="green" checked={colors.green}
                    onChange={(e) => dispatch( selectColor(e.target.name, e.target.checked) ) }/>

                <label htmlFor="multi">All Multicolored</label>
                <input type="checkbox" name="multi" id="multi" checked={colors.multi}
                    onChange={(e) => dispatch( selectColor(e.target.name, e.target.checked) ) }/>

                <label htmlFor="colorless">Colorless</label>
                <input type="checkbox" name="colorless" id="colorless" checked={colors.colorless}
                    onChange={(e) => dispatch( selectColor(e.target.name, e.target.checked) ) }/>
            </span>
        </div>
    );
}
