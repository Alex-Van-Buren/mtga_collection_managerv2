import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeCommander, changeCompanion, removeCardFromDeck, addCardToSideboard, setDragCard, dropCard, setCurrentDragOver } from '../../actions';
import HoverPreview from '../Templates/HoverPreview';
import '../../css/DBDeck.css';

/**
 * The cards that are actively in the user's deck.
 */
function DBDeck() {
    // Access redux dispatcher
    const dispatch = useDispatch();

    // Get Redux
    const { cardCollection } = useSelector(state => state.inventory);
    const { deck, commander, companion, deckType, addType, currentDragOver } = useSelector(state => state.deckBuilder);
    
    // Make an array of JSX for each of the 8 deck columns
    const renderCards = useMemo(() => {

        // Track cards added
        const addedToDeck = {};

        return deck.map((column, i) => {
            let colClass = '';

            if (currentDragOver.section === 'deck' && currentDragOver.col === i){
                colClass = ' draggingOver';
            }
            return <div 
                className={`DBDeckColumn${colClass}`} key={'column'+i} draggable='true'
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.stopPropagation(); 
                    dispatch(dropCard( 'deck', {col:i, row: deck[i].length}));
                    dispatch(setCurrentDragOver());
                }}
                onDragEnter={() => {
                    dispatch(setCurrentDragOver('deck', i, deck[i].length));
                }}
            >
                {/* Create a top element above the cards in each column */}
                <div className="firstElement"
                    onDrop={(e) => {
                        e.stopPropagation(); 
                        dispatch(dropCard('deck', {col: i, row: -1}))
                        dispatch(setCurrentDragOver());
                    }}
                    onDragEnter={(e) => {
                        e.stopPropagation();
                        dispatch(setCurrentDragOver('deck', i, -1));
                    }}
                >
                    {deck[i].length} 
                </div>

                {/* Create JSX for each individual card */}
                { column.map( (card, j) => {

                    // Track that a copy of this card was added to the deck
                    addedToDeck[card.arenaId] = addedToDeck[card.arenaId] ? addedToDeck[card.arenaId]+1 : 1;

                    let cardStyle = {};

                    // Add red boarder around cards not legal in current format
                    if (card.legalities && card.legalities[deckType] && card.legalities[deckType] !== "legal" ) {
                        cardStyle.boxShadow = '0 0 0 3px red';
                        cardStyle.borderRadius = '5px';
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
                            cardStyle.filter = "brightness(50%)";
                        }
                    }
                    // Make style for dragging cards
                    // Check if column is the same
                    if (currentDragOver.section === 'deck' && currentDragOver.col === i){
                        // Check if row is greater than current dragOver
                        if (j > currentDragOver.row){
                            cardStyle.transform = 'translateY(10px)';
                        }
                    }

                    return <div 
                        className="DBDeckCard" key={'card'+i+j} style={{ zIndex: j }}
                        onDragOver={(e) => e.preventDefault()}
                    >
                    <HoverPreview imgs={card.imgs}>
                        <img
                            src={card.imgs.front} alt={card.name} style={cardStyle} draggable='true' tabIndex={0}
                            onDragStart={(e) => {
                                dispatch(setDragCard(card, 'deck', {col: i, row: j}));
                            }}
                            onDragEnd={() => dispatch(setDragCard(null))}
                            onDrop={(e) =>{
                                e.stopPropagation(); 
                                dispatch(dropCard('deck', {col: i, row: j}))
                                dispatch(setCurrentDragOver());
                            }}
                            onDragEnter={(e) => {
                                e.stopPropagation();
                                dispatch(setCurrentDragOver('deck',i, j));
                            }}
                            onClick={(e) => {
                                dispatch(removeCardFromDeck(card, i, j));

                                // If the deckType is limited, move the card to the sideboard
                                if ( deckType === 'limited' ) {
                                    dispatch(addCardToSideboard(card));
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    dispatch(removeCardFromDeck(card, i, j));

                                    if ( deckType === 'limited' ) {
                                        dispatch(addCardToSideboard(card));
                                    }
                                }
                            }}
                        />
                    </HoverPreview>
                    </div>;
                } ) }
            </div>;
        });
    }, [deck, deckType, cardCollection, dispatch, currentDragOver]);

    // Show commander and companion only when they exist
    const commander_companion = (commander  || companion || addType ==='commander' || addType === 'companion') ? (
        <div id="commander_companion" onDragEnter={() => dispatch(setCurrentDragOver())}>

            {/* Show commander if it exists */}
            {commander || addType === 'commander' ? (<>
                <div
                    className="DBDeckColumn" draggable='true'
                    onDragOver={(e) => e.preventDefault()}
                    onDragStart={() => dispatch(setDragCard(commander, 'commander', {col: null, row: null}))}
                    onDragEnd={() => dispatch(setDragCard(null))}
                    onDrop={() => {
                        dispatch(dropCard('commander', {col: null, row: null}));
                        dispatch(setCurrentDragOver());
                    }}
                    onDragEnter={(e) => {
                        e.stopPropagation();
                        dispatch(setCurrentDragOver('commander'));
                    }}
                >
                    <div className="firstElement">Commander</div>
                    <div className={currentDragOver.section === 'commander'? 'specialCard draggingOver' : "specialCard"}>
                        {commander ? <HoverPreview imgs={commander.imgs}>
                            <img
                                src={commander.imgs.front} alt={commander.name} id="commanderCard" tabIndex={0}
                                onClick={() => dispatch(changeCommander())}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        dispatch(changeCommander());
                                    }
                                }}
                            />
                        </HoverPreview> : null}
                    </div>
                </div>
            </>) : null}

            {/* Show companion if it exists */}
            {companion || addType === 'companion' ? (<>
                <div
                    className="DBDeckColumn" draggable='true'
                    onDragOver={(e) => e.preventDefault()}
                    onDragStart={() => dispatch(setDragCard(companion, 'companion', {col: null, row: null}))}
                    onDragEnd={() => dispatch(setDragCard(null))}
                    onDrop={() => {
                        dispatch(dropCard('companion', {col: null, row: null}));
                        dispatch(setCurrentDragOver());
                    }}
                    onDragEnter={(e) => {
                        e.stopPropagation();
                        dispatch(setCurrentDragOver('companion'));
                    }}
                >
                    <div className="firstElement">Companion</div>
                    <div className={currentDragOver.section === 'companion' ? 'specialCard draggingOver' : "specialCard"}>
                        {companion ? <HoverPreview imgs={companion.imgs}>
                            <img
                                src={companion.imgs.front} alt={companion.name} id="companionCard" tabIndex={0}
                                onClick={() =>{
                                    dispatch(changeCompanion());
                                    if (deckType === 'limited') {
                                        dispatch(addCardToSideboard(companion));
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        dispatch(changeCompanion());
                                        if (deckType === 'limited') {
                                            dispatch(addCardToSideboard(companion));
                                        }
                                    }
                                }}
                            />
                        </HoverPreview> : null}
                    </div>
                </div>
            </>) : null}
        </div>
    ) : null;

    return (
        <div id="DBDeck">
            {commander_companion}
            {renderCards}
        </div>
    );
}

export default DBDeck;
