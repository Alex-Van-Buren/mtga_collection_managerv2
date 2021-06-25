import React from 'react';

import MultiSelect from '../Templates/MultiSelect';
import { setInfo } from '../../data/setInfo';
import '../../css/SelectSet.css';

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
        <div className="selectSet">
            <MultiSelect 
                options={options} 
                useValForSelected noneSelectedText="Select a Set(s)"
            />
        </div>
    )
}

export default SelectSet;