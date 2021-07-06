import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MultiSelect from '../Templates/MultiSelect';
import { setInfo } from '../../data/setInfo';
import { selectSet } from '../../actions';
import '../../css/SelectSet.css';

function SelectSet() {
    const dispatch = useDispatch();
    
    // Get current state of sets selected from Redux
    const reduxSets = useSelector(state => state.displayOptions.set);   

    // Create the options for the multiSelect menu
    let options = [];
    for (const setId in setInfo) {
        let newObj = {};
        newObj.text = setInfo[setId].name;
        newObj.val = setId;
        options.push(newObj);
    }


    function setsSelected(sets) {
        dispatch(selectSet(sets));
    }

    return (
        <div className="selectSet">
            <MultiSelect 
                options={options} 
                useValForSelected noneSelectedText="Select a Set(s)"
                selectedfn={(sets) => setsSelected(sets)}
                initialSelected = {reduxSets}
            />
        </div>
    )
}

export default SelectSet;