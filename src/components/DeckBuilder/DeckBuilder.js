import React from 'react';

import DBSidebar from './DBSidebar';
import DBDeck from './DBDeck';
import CardList from '../All/CardList';
import '../../css/DeckBuilder.css';
import { useRef } from 'react';

function DeckBuilder() {
    const cardListRef = useRef();

    function MoveSlider(e) {
        // Get the current Y position of mouse
        let mouseHeight = e.clientY;

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
        }
    }
    return (
        <div id="DeckBuilder">
            <DBSidebar />

            <div className="mainContent">
                <div className="dbCardList" ref={cardListRef}>
                    <CardList scrollingParent={".dbCardList"} deckBuilder />
                </div>
                <div className="buffer"></div>
                <div className="slider" onMouseDown={(e)=>MoveSlider(e)}></div>
                <DBDeck />
            </div>
        </div>
    );
}

export default DeckBuilder;
