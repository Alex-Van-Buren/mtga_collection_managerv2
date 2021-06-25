import React from 'react';

import MultiSelect from '../Templates/MultiSelect';
import { setInfo } from '../../data/setInfo';

function SelectSet() {
    // Create the options for the multiSelect menu
    let options = [];
    for (const setId in setInfo) {
        let newObj = {};
        newObj.text = setInfo[setId].name;
        newObj.val = setId;
        options.push(newObj);
    }


    return (
        <MultiSelect 
            options={options} 
            useValForSelected noneSelectedText="Select a Set(s)"
        />
    )
}

export default SelectSet;