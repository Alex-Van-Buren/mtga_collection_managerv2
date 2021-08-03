import React from 'react';
import { useSelector } from 'react-redux';

import DBSidebar from './DBSidebar';
import DeckHeader from './DeckHeader';
import DBDeck from './DBDeck';
import CardList from '../All/CardList';
import DBSideboard from './DBSideboard';
import LimitedSideboard from './LimitedSideboard';
import '../../css/DeckBuilder.css';
import { useRef } from 'react';

function DeckBuilder() {
    const cardListRef = useRef();

    function MoveSlider(e) {
        // Get the current Y position of mouse
        let mouseHeight = e.clientY;

        // Change overflow-Y from scroll to hidden so it can't randomly scroll
        // Also Add a margin right equal to the size of the scrollbar so elements don't jump
        cardListRef.current.style.overflowY = "hidden"
        cardListRef.current.style.marginRight = "10px"
        
        // Add event listener for mouse movement
        document.onmousemove = function onMouseMove(e) {
            // Re-Calculate size of cardList
            cardListRef.current.style.height = cardListRef.current.offsetHeight + e.clientY - mouseHeight + "px";
            
            // Update mouseHeight
            mouseHeight = e.clientY;
        }
        // Remove event listener for mousemove when you let go of click. Also remove this event
        document.onmouseup = () => {
            document.onmousemove = document.onmouseup = null

            // Reset scrolling behavior and margin
            cardListRef.current.style.overflowY = "scroll"
            cardListRef.current.style.marginRight = "0"
        }
    }
    const { deckType, addBasics } = useSelector(state => state.deckBuilder);
    // Change the shown cards to add to deck to the limited sideboard if deckType is limited and not adding basic lands
    const dbCardList = (deckType === 'limited' && !addBasics) ? <LimitedSideboard /> : <CardList scrollingParent={".dbCardList"} deckBuilder />;

    return (
        <div id="DeckBuilder">
            <DBSidebar />

            <div className="mainContent">
                <div className="dbCardList" ref={cardListRef}>
                    {dbCardList}
                </div>
                <div className="slider" onMouseDown={(e)=>MoveSlider(e)}>
                    <DeckHeader />
                </div>
                <div className="deckSection">
                    <DBDeck />  
                    {deckType ==='limited'? null : <DBSideboard />}
                </div>
            </div>
        </div>
    );
}

export default DeckBuilder;
