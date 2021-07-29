import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeCardFromDeck } from '../../actions';
import '../../css/DBDeck.css';

function DBDeck() {

    // Access redux dispatcher
    const dispatch = useDispatch();

    // Get Redux
    const { cardCollection } = useSelector(state => state.inventory);
    const { deck, deckType } = useSelector(state => state.deckBuilder);

    // Make an array of JSX for each of the 8 deck columns
    const renderCards = useMemo(() => {

        // Track cards added
        const addedToDeck = {};

        return deck.map((column, i) => {
            return <div className="DBDeckColumn" key={'column'+i}>

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

                    return <div className="DBDeckCard" key={'card'+i+j} style={{ zIndex: j }}>
                        <img
                            src={card.imgs.front} alt={card.name} style={style}
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(removeCardFromDeck(card));
                            }}
                        />
                    </div>;
                } ) }
            </div>;
        });
    }, [deck, deckType, cardCollection, dispatch]);

    return (
        <div id="DBDeck">
            {renderCards}
        </div>
    );
}

export default DBDeck;
