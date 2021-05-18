import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomDropDown from './CustomDropDown';
import { selectBooster }  from '../../actions/index'

function BoosterDropDown() {

    const dispatch = useDispatch();
    const firstSelection = useSelector(state => state.displayOptions.booster);

    function selectfnBooster(item) {
        dispatch(selectBooster(item));
    }

    return (        
        <CustomDropDown items={['All Cards', 'In Boosters', 'Not In Boosters']} firstSelection={firstSelection} selectfn={selectfnBooster}/>
    )
}

export default BoosterDropDown;