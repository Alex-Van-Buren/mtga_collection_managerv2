import React from 'react';
import { useDispatch } from 'react-redux';

import CustomDropDown from './CustomDropDown';
import { selectBooster }  from '../../actions/index'

function BoosterDropDown() {

    const dispatch = useDispatch();

    function selectfnBooster(item) {
        dispatch(selectBooster(item));
    }

    return (        
        <CustomDropDown items={['All', 'In Boosters', 'Not In Boosters']} firstSelection= "In Boosters" selectfn={selectfnBooster}/>
    )
}

export default BoosterDropDown;