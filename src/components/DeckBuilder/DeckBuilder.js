import React from 'react';

import DBSidebar from './DBSidebar';
import DBDeck from './DBDeck';
import CardList from '../All/CardList';
import '../../css/DeckBuilder.css';

function DeckBuilder() {

    return (
        <div id="DeckBuilder">
            <DBSidebar />

            <div className="mainContent">
                <div className="dbCardList">
                    <CardList scrollingParent={".dbCardList"}/>
                </div>
                <DBDeck />
            </div>       


        </div>
    );
}

export default DeckBuilder;
