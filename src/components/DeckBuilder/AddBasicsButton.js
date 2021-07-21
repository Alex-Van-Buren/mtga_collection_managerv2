import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { toggleAddBasics } from '../../actions';

// CSS for this component will be in DeckHeader.css

function AddBasicsButton() {
    const dispatch = useDispatch();
    const addBasicsFlag = useSelector(state => state.deckBuilder.addBasics);

    let addBasicsClass = "addBasics";
    if (addBasicsFlag) addBasicsClass += " active";

    return (
        <button className={addBasicsClass}
        onClick={(e)=> {
            e.stopPropagation();
            dispatch(toggleAddBasics())
        }}
        >
            Add basics
        </button>
    )
}

export default AddBasicsButton;