import React from 'react';

import DBSidebar from './DBSidebar';
import DBDeck from './DBDeck';
import '../../css/DeckBuilder.css';

function DeckBuilder() {

    return (
        <div id="DeckBuilder">
            <DBSidebar />

            <div className="mainContent">
                <div className="dbCardlist"></div>
                <DBDeck />
            </div>       


        </div>
    );
}

export default DeckBuilder;