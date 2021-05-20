import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomDropdown from './CustomDropdown';
import { selectBooster }  from '../../actions/index'

function BoosterDropdown() {

    const dispatch = useDispatch();
    const firstSelection = useSelector(state => state.displayOptions.booster);

    return (
        <div className="boosterDropdown">
            <label>Booster:</label>
            <CustomDropdown 
                items={['All Cards', 'In Boosters', 'Not In Boosters']} 
                firstSelection={firstSelection}
                selectfn={(item) => dispatch(selectBooster(item))}
            />
        </div>        
    )
}

export default BoosterDropdown;
