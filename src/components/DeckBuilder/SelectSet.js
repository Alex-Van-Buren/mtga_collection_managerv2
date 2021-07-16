import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MultiSelect from '../Templates/MultiSelect';
import { setInfo } from '../../data/setInfo';
import { selectSet } from '../../actions';
import '../../css/SelectSet.css';

/**
 * Uses MultiSelect to create a multiSelectible dropdown for selecting sets to search
 * @returns JSX 
 */
function SelectSet() {
    const dispatch = useDispatch();
    
    // Get current state of sets selected from Redux
    const reduxSets = useSelector(state => state.displayOptions.set);
    // Use Reset count as a key to rerender component when the reset button is hit
    const key = useSelector(state => state.displayOptions.resetCount);   

    // Create the options for the multiSelect menu
    // Each option is an object with text and val properties
    let options = [];
    for (const setId in setInfo) {
        let newObj = {};
        newObj.text = setInfo[setId].name;
        newObj.val = setId;
        options.push(newObj);
    }

    return (
        <div className="selectSet">
            <label >Select Set(s): </label>
            <MultiSelect 
                options={options} 
                useValForSelected noneSelectedText="All Sets"
                selectedFn={(sets) => dispatch(selectSet(sets))}
                initialSelected = {reduxSets}
                key={key}
            />
        </div>
    )
}

export default SelectSet;
