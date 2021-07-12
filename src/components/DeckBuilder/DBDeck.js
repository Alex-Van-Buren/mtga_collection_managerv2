import React from 'react';
import { useSelector } from 'react-redux';

import '../../css/DBDeck.css';

function DBDeck() {

    // Get deck from redux
    const deck = useSelector(state => state.deckBuilder.deck);

    // Make an array of JSX for each of the 8 deck columns
    const renderCards = deck.map(column => {
        return (
            <div className="DBDeckColumn">

                {/* Create JSX for each individual card */}
                { column.map( (card) => {
                    return (
                        <div className="DBDeckCard">
                            <img src={card.imgs.front} alt={card.name}/>
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
