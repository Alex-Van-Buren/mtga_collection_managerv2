import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import MultiSelect from '../Templates/MultiSelect';
import { selectCardTypes } from '../../actions';
import '../../css/CardTypeDropdown.css';

function CardTypeDropdown() {
    const dispatch = useDispatch();

    const selectedCardTypes = useSelector(state => state.displayOptions.cardTypes);
    const key = useSelector(state => state.displayOptions.resetCount);

    const cardTypes = ['Creature','Planeswalker','Instant','Sorcery','Artifact','Enchantment','Land'];
    let options = [];
    for (const type of cardTypes) {
        options.push({text: type, val: type})
    }

    return (
        <div className="cardTypes">
            <label > Select Card Type(s):</label>
            <MultiSelect 
            options={options} noneSelectedText="All Types"
            selectedFn={(types) => dispatch(selectCardTypes(types))}
            initialSelected={selectedCardTypes}
            key={key}
            />
        </div>
    )
}

export default CardTypeDropdown;