import React from 'react';
import { useDispatch, useSelector} from 'react-redux';

import CustomDropdown from '../Templates/CustomDropdown';
import { setCMCMin, setCMCMax } from '../../actions';
import '../../css/CMCDropdowns.css';

function CMCDropdowns({ header }) {

    const dispatch = useDispatch();

    // Get the current selections from redux
    const minSelected = useSelector( state => state.displayOptions.cmc.min);
    const maxSelected = useSelector( state => state.displayOptions.cmc.max);

    const items = ['Any', 0,1,2,3,4,5,6,7,8,9,10];
    return (
        <div className="CMCDropdowns">
            <label>{header}</label> 
            <div className="CMCDropdowns-container">
                <div className="minCMC">
                    <label>Min: </label>
                    <CustomDropdown
                    ariaLabel="Filter CMC Minimum" 
                    items={items} 
                    key={`min${minSelected}`}
                    firstSelection={minSelected}
                    selectfn={(item) => dispatch( setCMCMin(item) )}
                    />
                </div>
                <div className="maxCMC">
                    <label>Max: </label>
                    <CustomDropdown 
                    ariaLabel="Filter CMC Maximum"
                    items={items} 
                    key={`max${maxSelected}`}
                    firstSelection={maxSelected}
                    selectfn={(item) => dispatch( setCMCMax(item) )}
                    />
                </div>
            </div>
        </div>
    );
}

export default CMCDropdowns;