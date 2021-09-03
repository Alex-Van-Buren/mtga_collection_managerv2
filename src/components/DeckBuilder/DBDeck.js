import React, { useMemo, useRef, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeCommander, changeCompanion, removeCardFromDeck, addCardToSideboard, setDragCard, dropCard } from '../../actions';
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
    const { deck, commander, companion, deckType, addType } = useSelector(state => state.deckBuilder);

    // Create Ref array for columns
    const colRefs = useRef([]);
    colRefs.current = deck.map((_, i) => colRefs.current[i] ?? createRef());
    
    // Make an array of JSX for each of the 8 deck columns
    const renderCards = useMemo(() => {

        // Track cards added
        const addedToDeck = {};

        return deck.map((column, i) => {
            return <div className="DBDeckColumn" key={'column'+i} ref={colRefs.current[i]}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.stopPropagation(); 
                    dispatch(dropCard( 'deck', {col:i, row: 0}));
                    colRefs.current[i].current.classList.remove('draggingOver');
                }}
                onDragEnter={() => colRefs.current[i].current.classList.add('draggingOver')}
                onDragLeave={() => colRefs.current[i].current.classList.remove('draggingOver')}
            >

                {/* Create JSX for each individual card */}
                { column.map( (card, j) => {

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

                    return <div 
                        className="DBDeckCard" key={'card'+i+j} style={{ zIndex: j }}
                        onDragOver={(e) => e.preventDefault()}
                    >
                    <HoverPreview imgs={card.imgs}>
                        <img
                            src={card.imgs.front} alt={card.name} style={style} draggable
                            onDragStart={(e) => {
                                e.dataTransfer.effectAllowed = 'move';
                                dispatch(setDragCard(card, 'deck', {col: i, row: j}));
                            }}
                            onDragEnd={() => dispatch(setDragCard(null))}
                            onDrop={(e) =>{
                                e.stopPropagation(); 
                                dispatch(dropCard('deck', {col: i, row: j}))
                                colRefs.current[i].current.classList.remove('draggingOver')
                            }}
                            onClick={(e) => {
                                dispatch(removeCardFromDeck(card, i, j));

                                // If the deckType is limited, move the card to the sideboard
                                if ( deckType === 'limited' ) { dispatch(addCardToSideboard(card)) }
                            }}
                        />
                    </HoverPreview>
                    </div>;
                } ) }
            </div>;
        });
    }, [deck, deckType, cardCollection, dispatch]);

    // Show commander and companion only when they exist
    const commander_companion = (commander  || companion || addType ==='commander' || addType === 'companion') ? (
        <div id="commander_companion">

            {/* Show commander if it exists */}
            {commander || addType === 'commander' ? (<>
                <label htmlFor="commanderCard">Commander</label>
                <div className="specialCard">
                    {commander ? 
                    <HoverPreview imgs={commander.imgs}>
                    <img
                        src={commander.imgs.front} alt={commander.name} id="commanderCard"
                        onClick={() => dispatch(changeCommander())}
                    />
                    </HoverPreview> : null}
                </div>
            </>) : null}

            {/* Show companion if it exists */}
            {companion || addType === 'companion' ? (<>
                <label htmlFor="companionCard">Companion</label>
                <div className="specialCard">
                    {companion ?
                    <HoverPreview imgs={companion.imgs}>
                    <img
                        src={companion.imgs.front} alt={companion.name} id="companionCard"
                        onClick={() =>{
                            dispatch(changeCompanion())
                            if (deckType === 'limited') {
                                dispatch(addCardToSideboard(companion))
                            }
                        } }
                    />
                    </HoverPreview> : null}
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
