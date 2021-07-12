import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import '../../css/DBDeck.css';

function DBDeck() {

    // Store deck data in 8 columns
    const [col0, setCol0] = useState([]);
    const [col1, setCol1] = useState([]);
    const [col2, setCol2] = useState([]);
    const [col3, setCol3] = useState([]);
    const [col4, setCol4] = useState([]);
    const [col5, setCol5] = useState([]);
    const [col6, setCol6] = useState([]);
    const [col7, setCol7] = useState([]);

    // Make state easily accessible
    const col = [ col0, col1, col2, col3, col4, col5, col6, col7 ];
    const setCol = [ setCol0, setCol1, setCol2, setCol3, setCol4, setCol5, setCol6, setCol7 ];

    // See when cards need to be added to the deck
    const cardToAdd = useSelector(state => state.deckBuilder.add);

    // Add cards to the correct column
    useEffect(() => {

        if (cardToAdd) {

            // Find which column to add card to
            const i = colNumber(cardToAdd.cmc);

            // Copy current state
            const state = [ ...col[i], cardToAdd ];

            // Push new state
            setCol[i](state);
        }

    // Don't want to add col and setCol to useEffect dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardToAdd]);

    /**
     * Converts cmc into column number 0-7
     */
    function colNumber(cmc) {
        if (typeof cmc === 'string') {
            cmc = parseInt(cmc);
        }
        // Minimum value of cmc is 0 and map undefined/null to 0
        if (!cmc || cmc < 0) {
            cmc = 0;
        }
        // Max cmc value is 7
        else if (cmc > 7) {
            cmc = 7;
        }
        return cmc;
    }

    // Make an array of JSX for each of the 8 deck columns
    const renderCards = col.map(column => {
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
