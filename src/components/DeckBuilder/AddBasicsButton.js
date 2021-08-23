import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { toggleAddBasics, setAddType } from '../../actions';

// CSS for this component will be in DBCardFilters.css
/**
 * The button that toggles adding basic lands to a deck
 * @returns JSX
 */
function AddBasicsButton() {
    const dispatch = useDispatch();
    const { addBasics, addType } = useSelector(state => state.deckBuilder);

    let addBasicsClass = "addBasics";
    if (addBasics) addBasicsClass += " active";

    return (
        <button className={addBasicsClass}
        onClick={(e)=> {

            // Check if addType is either commander or companion
            if (addType === "commander" || addType === "companion") {
                dispatch(setAddType("deck"));
            }

            dispatch(toggleAddBasics())
        }}
        >
            Add Basic Lands
        </button>
    )
}

export default AddBasicsButton;