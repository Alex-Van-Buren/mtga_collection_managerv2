import React from 'react';
// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeCardFromSideboard } from './../../actions';
import '../../css/DBSideboard.css';

function DBSideboard() {

    const dispatch = useDispatch();

    const SBCards = useSelector(state => state.deckBuilder.sideboard);
    const deckType = useSelector(state => state.deckBuilder.deckType);

    // Map the cards to a single column
    const renderSBCards = SBCards.map( (card, i) => {
        let style = null;
        if (card.legalities && card.legalities[deckType] && card.legalities[deckType] !== "legal" ) {
            style = { boxShadow: '0 0 0 3px red', borderRadius: '5px' };
        }

        return <div className="DBDeckCard" key={card + i}> 
            <img
                src={card.imgs.front} alt={card.name} style={style}
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeCardFromSideboard(card));
                }}
            />
        </div>
    })


    return (
        <div className="sideboard DBDeckColumn">
            {renderSBCards}
        </div>
    )
}

export default DBSideboard;