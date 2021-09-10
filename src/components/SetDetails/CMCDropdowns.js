import React from 'react';
import { useDispatch, useSelector} from 'react-redux';

import MultiSelect from '../Templates/MultiSelect';
import { selectCMCS } from '../../actions';
import '../../css/CMCDropdowns.css';

function CMCDropdowns({ header }) {

    const dispatch = useDispatch();

    // Get the current selections from redux
    const cmcs = useSelector( state => state.displayOptions.cmcs);
    const key = useSelector(state => state.displayOptions.resetCount);

    const items = [0,1,2,3,4,5,6,7,'8+'];
    const options = [];
    for (const item of items) {
        options.push({text: item, val: item});
    } 
    return (
        <div className="CMCDropdowns">
            <label>{header}</label> 
            <div className="CMCDropdowns-container">
                <div className="pickCMC">
                    <MultiSelect 
                        options={options} initialSelected={cmcs} 
                        selectedFn={(selected) => dispatch(selectCMCS(selected))}
                        key={key} noneSelectedText='All'
                    />
                </div>
            </div>
        </div>
    );
}

export default CMCDropdowns;