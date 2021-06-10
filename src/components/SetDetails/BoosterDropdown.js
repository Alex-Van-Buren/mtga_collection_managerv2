import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomDropdown from '../Templates/CustomDropdown';
import { selectBooster }  from '../../actions/index';

function BoosterDropdown({ header }) {

    const dispatch = useDispatch();
    const firstSelection = useSelector(state => state.displayOptions.booster);

    return (
        <div className="boosterDropdown">
            <label>{ header }</label>
            <CustomDropdown 
                items={['Show All Cards', 'In Boosters', 'Not In Boosters']}
                key={firstSelection} 
                firstSelection={firstSelection}
                selectfn={(item) => dispatch(selectBooster(item))}
            />
        </div>        
    )
}

export default BoosterDropdown;
