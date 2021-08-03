import React from 'react';
import { useSelector } from 'react-redux';

import '../../css/LimitedSideboard.css';

/**
 * When the deckbuilder is in limited mode, it should change the cardList displayed to the sideboard
 * @returns JSX
 */
function LimitedSideboard() {
    const sideboardCards = useSelector(state => state.deckBuilder.sideboard);

    // Sort the sideboard cards into cmc arrays
    let col0 = [];
    let col1 = [];
    let col2 = [];
    let col3 = [];
    let col4 = [];
    let col5 = [];
    let col6 = [];
    let col7plus = [];

    for (const card of sideboardCards) {
        switch (card.cmc) {
            case 0:
                col0.push(card); break;
            case 1:
                col1.push(card); break;
            case 2:
                col2.push(card); break;
            case 3:
                col3.push(card); break;
            case 4:
                col4.push(card); break;
            case 5:
                col5.push(card); break;
            case 6:
                col6.push(card); break;
            default:
                col7plus.push(card); break;
        }
    }
    return (
        <div className="limitedSideboard">
            <SideboardColumn cardArray={col0}/>
            <SideboardColumn cardArray={col1}/>
            <SideboardColumn cardArray={col2}/>
            <SideboardColumn cardArray={col3}/>
            <SideboardColumn cardArray={col4}/>
            <SideboardColumn cardArray={col5}/>
            <SideboardColumn cardArray={col6}/>
            <SideboardColumn cardArray={col7plus}/>
        </div>
    )
}

/**
 * A helper react component to create a column of cards 
 * @returns JSX
 */
function SideboardColumn({cardArray}) {
    let renderColumn = null;
    if (cardArray.length >= 1) {
        renderColumn = cardArray.map( (card, i )=> {
            return (
                <div className="DBDeckCard" key={card.name + i} >
                    <img
                        src={card.imgs.front} alt={card.name} 
                    />
                </div>
            )
        });

    }
    return (
        <div className="limitedSideboard-column">
            {renderColumn}
        </div>
    )
}

export default LimitedSideboard;
