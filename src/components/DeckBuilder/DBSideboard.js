import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeCardFromSideboard } from './../../actions';
import HoverPreview from '../Templates/HoverPreview';
import '../../css/DBSideboard.css';

function DBSideboard() {

    // Track whether sideboard is open
    const [ open, setOpen ] = useState(true);
    
    // Redux
    const { cardCollection } = useSelector(state => state.inventory);
    const { deckType, sideboard } = useSelector(state => state.deckBuilder);
    const dispatch = useDispatch();

    // Track cards added
    const addedToDeck = {};

    // Map the cards to a single column
    const renderSBCards = sideboard.map( (card, i) => {

        // Track that a copy of this card was added to the deck
        addedToDeck[card.arenaId] = addedToDeck[card.arenaId] ? addedToDeck[card.arenaId]+1 : 1;

        let style = {};

        // Add red boarder around cards not legal in current format
        if (card.legalities && card.legalities[deckType] && card.legalities[deckType] !== "legal" ) {
            style.boxShadow = '0 0 0 3px red';
            style.borderRadius = '5px';
        }

        // Don't mark unowned cards if inventory isn't initialized
        if (cardCollection) {

            // Don't color if single copy of basic land owned
            if (card.type_line.toLowerCase().includes("basic") && card.type_line.toLowerCase().includes("land") 
                && cardCollection[card.arenaId]
            ) {}

            // Special case cards
            else if (cardCollection[card.arenaId] && cardCollection[card.arenaId] >= 4 &&
                    [70288, 69172, 67306, 76490].includes(card.arenaId)
            ) {}

            // Color unowned copies of this card
            else if ( !cardCollection[card.arenaId] || (addedToDeck[card.arenaId] > cardCollection[card.arenaId]) ) {

                // Darken unowned cards
                style.filter = "brightness(50%)";
            }
        }

        return <div className="DBDeckCard" key={card + i} style={{ zIndex: i }}>
            <HoverPreview imgs={card.imgs}>
            <img
                src={card.imgs.front} alt={card.name} style={style}
                onClick={(e) => {
                    dispatch(removeCardFromSideboard(card));
                }}
            />
            </HoverPreview>
        </div>
    });
    
    // Flip triangle button direction when opening or closing the sideboard
    let iconClass = 'SBshowButton icon caret right';
    let sideboardClass = 'sideboard';
    if (!open) {
        iconClass = 'SBshowButton icon caret left';
        sideboardClass = 'sideboard closed';
    }
    const showButton = <div className="sideboardseparator">
        <i className={iconClass} onClick={() => setOpen(!open)}/>

    </div>

    return (
        <div className={sideboardClass}>
            {showButton}
            <div className="DBDeckColumn">
                {renderSBCards}
            </div>
        </div>
    );
}

export default DBSideboard;
