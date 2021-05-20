import React from 'react';
import { useDispatch } from 'react-redux';

import CustomDropdown from './CustomDropdown';
import { setShowCards } from '../../actions';

function NumberOwnedDropdown() {
    const dispatch = useDispatch();

    const items = ['None', 'Own at Least One', 'Missing at Least One', 'Full Playset', 'Show All Cards'];

    function selectfnNumberOwned(item) {
        dispatch(setShowCards(item))
    }

    // Need to check redux for first Selection in cases where something else changes the state of the dropdown (eg reset button)


    return (
        <div className="numberOwnedDropdown">
            <label>Number Owned:</label>
            <CustomDropdown items={items} firstSelection="Show All Cards" selectfn={selectfnNumberOwned} />
        </div>
    )
}

export default NumberOwnedDropdown;