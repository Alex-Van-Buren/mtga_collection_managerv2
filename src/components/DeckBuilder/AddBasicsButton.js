import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { toggleAddBasics } from '../../actions';

// CSS for this component will be in DBCardFilters.css
/**
 * The button that toggles adding basic lands to a deck
 * @returns JSX
 */
function AddBasicsButton() {
    const dispatch = useDispatch();
    const addBasicsFlag = useSelector(state => state.deckBuilder.addBasics);

    let addBasicsClass = "addBasics";
    if (addBasicsFlag) addBasicsClass += " active";

    return (
        <button className={addBasicsClass}
        onClick={(e)=> {
            dispatch(toggleAddBasics())
        }}
        >
            Add Basic Lands
        </button>
    )
}

export default AddBasicsButton;