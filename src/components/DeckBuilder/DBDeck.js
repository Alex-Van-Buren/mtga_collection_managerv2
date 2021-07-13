import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeCardFromDeck } from '../../actions';
import '../../css/DBDeck.css';

function DBDeck() {

    // Access redux dispatcher
    const dispatch = useDispatch();

    // Get deck from redux
    const deck = useSelector(state => state.deckBuilder.deck);

    // Make an array of JSX for each of the 8 deck columns
    // TODO: useMemo
    const renderCards = deck.map((column, i) => {
        return (
            <div className="DBDeckColumn" key={'column'+i}>

                {/* Create JSX for each individual card */}
                { column.map( (card, j) => {
                    return (
                        <div className="DBDeckCard" key={'card'+i+j}>
                            <img
                                src={card.imgs.front} alt={card.name}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(removeCardFromDeck(card));
                                }}
                            />
                        </div>
                    );
                } ) }
            </div>
        );
    });

    return (
        <div id="DBDeck">
            {renderCards}
        </div>
    );
}

export default DBDeck;
