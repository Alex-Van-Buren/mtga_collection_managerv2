import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomDropdown from '../Templates/CustomDropdown';
import { setShowCards } from '../../actions';
import '../../css/NumberOwnedDropdown.css';

function NumberOwnedDropdown({ header }) {
    const dispatch = useDispatch();

    // Need to check redux for first Selection in cases where something else changes the state of the dropdown (eg reset button)
    const firstSelection = useSelector(state => state.displayOptions.showCards);

    const items = ['Own None', 'Own at Least One', 'Missing at Least One', 'Own Full Playset', 'Show All Cards'];

    function selectfnNumberOwned(item) {
        dispatch(setShowCards(item))
    }

    return (
        <div className="numberOwnedDropdown">
            <label>{ header }</label>
            <CustomDropdown 
                ariaLabel="Filter by Number Owned" items={items} key={firstSelection} 
                firstSelection={firstSelection} selectfn={selectfnNumberOwned} 
            />
        </div>
    )
}

export default NumberOwnedDropdown;