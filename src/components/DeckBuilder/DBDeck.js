import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { removeCardFromDeck } from '../../actions';
import '../../css/DBDeck.css';

function DBDeck() {

    const dispatch = useDispatch();

    const deck = useSelector(state => state.deckBuilder.deckList);

    const deckMap = deck.map((card) => {
        return (
            <img 
                src={card.imgs.front} alt={card.name} style={{width: '200px'}}
                onClick={() => dispatch(removeCardFromDeck(card))}
            />
        );
    });

    return (
        <div id="DBDeck">
            {deckMap}
        </div>
    );
}

export default DBDeck;

// Doubly linked list node
class node {
    constructor(card, next=null, prev=null) {
        this.next = next;
        this.prev = prev;
        this.card = card;
    }
}