import React from 'react';
import { useDispatch } from 'react-redux';

import CustomDropdown from './CustomDropdown';
import { setShowCards } from '../../actions';

function NumberOwnedDropDown() {
    const dispatch = useDispatch();

    const items = ['None', 'Own at Least One', 'Missing at Least One', 'Full Playset', 'Show All Cards'];

    function selectfnNumberOwned(item) {
        switch (item) {
            case 'None':
                dispatch(setShowCards("=0"));
                break;
            case 'Own at Least One':
                dispatch(setShowCards(">0"));
                break;
            case 'Missing at Least One':
                dispatch(setShowCards("<4"));
                break;
            case 'Full Playset':
                dispatch(setShowCards("=4"));
                break;
            case 'Show All Cards':
                dispatch(setShowCards("all"));
                break;
            default:
                break;
                
        }
    }

    return (
        <div className="numberOwnedDropdown">
            <label>Number Owned:</label>
            <CustomDropdown items={items} firstSelection="Show All Cards" selectfn={selectfnNumberOwned} />
        </div>
    )
}

export default NumberOwnedDropDown;