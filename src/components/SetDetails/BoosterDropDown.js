import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomDropdown from './CustomDropdown';
import { selectBooster }  from '../../actions/index'

function BoosterDropDown() {

    const dispatch = useDispatch();
    const firstSelection = useSelector(state => state.displayOptions.booster);

    function selectfnBooster(item) {
        dispatch(selectBooster(item));
    }

    return (
        <div className="boosterDropdown">
            <label>Booster:</label>
            <CustomDropdown items={['All Cards', 'In Boosters', 'Not In Boosters']} firstSelection={firstSelection} selectfn={selectfnBooster}/>
        </div>        
    )
}

export default BoosterDropDown;