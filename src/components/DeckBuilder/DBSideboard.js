import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeCardFromSideboard, setDragCard, dropCard, setCurrentDragOver } from './../../actions';
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

    // Holds card JSX for sideboard
    const renderSBCards = [];

    // Counter for renderSBCards
    let sbCounter = 0;

    // Loop through rows in 2d array sideboard
    for (let i=0; i<sideboard.length; i++) {

        // Alias column in 2d array sideboard
        for (let j=0; j<sideboard[i].length; j++) {

            // Alias specific card within 2d sideboard
            const card = sideboard[i][j];

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

            // Add cards to render array
            renderSBCards.push(<div className="DBDeckCard" key={card + sbCounter} style={{ zIndex: sbCounter }}>
                <HoverPreview imgs={card.imgs}>
                <img draggable
                    src={card.imgs.front} alt={card.name} style={style}
                    onClick={(e) => {
                        dispatch(removeCardFromSideboard(card, i, j));
                    }}
                    onDragStart={() => {
                        dispatch(setDragCard(card, 'sideboard', {col: i, row: j} ))
                    }}
                    onDragEnd={() => dispatch(setDragCard(null))}
                    onDrop={() => {
                        dispatch(dropCard('sideboard', {col: i, row: j}))
                    }}
                    onDragEnter={() =>{
                        dispatch(setCurrentDragOver('sideboard', i, j));
                    }}
                />
                </HoverPreview>
            </div>);

            // Increment counter (for setting z-index)
            sbCounter++;

        } // End column loop (j)
    } // End row loop (i)
    
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
        <div className={sideboardClass} onDragEnter={() => dispatch(setCurrentDragOver())}>
            {showButton}
            <div className="DBDeckColumn"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                    dispatch(dropCard('sideboard', {col: 7, row: sideboard[7].length}))
                }}
                onDragEnter={() => {
                    dispatch(setCurrentDragOver('sideboard', 7, sideboard[7].length))
                }}
            >
                {renderSBCards}
            </div>
        </div>
    );
}

export default DBSideboard;
