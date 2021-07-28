import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeCardFromDeck } from '../../actions';
import '../../css/DBDeck.css';

function DBDeck() {

    // Access redux dispatcher
    const dispatch = useDispatch();

    // Get deck from redux
    const { deck, deckType } = useSelector(state => state.deckBuilder);

    // Make an array of JSX for each of the 8 deck columns
    const renderCards = useMemo(() => {
        return deck.map((column, i) => {
            return <div className="DBDeckColumn" key={'column'+i}>

                {/* Create JSX for each individual card */}
                { column.map( (card, j) => {

                    let style = null;
                    if (card.legalities && card.legalities[deckType] && card.legalities[deckType] !== "legal" ) {
                        style = { 'box-shadow': '0 0 0 3px red', borderRadius: '5px' };
                    }

                    return <div className="DBDeckCard" key={'card'+i+j}>
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
    }, [deck, dispatch, deckType]);

    return (
        <div id="DBDeck">
            {renderCards}
        </div>
    );
}

export default DBDeck;
