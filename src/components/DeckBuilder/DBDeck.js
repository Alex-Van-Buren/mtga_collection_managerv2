import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import '../../css/DBDeck.css';

function DBDeck() {

    // 8 cmcs for cards. Default sort is cmc.
    const [col0, setCol0] = useState([]);
    const [col1, setCol1] = useState([]);
    const [col2, setCol2] = useState([]);
    const [col3, setCol3] = useState([]);
    const [col4, setCol4] = useState([]);
    const [col5, setCol5] = useState([]);
    const [col6, setCol6] = useState([]);
    const [col7, setCol7] = useState([]);

    const col = [ col0, col1, col2, col3, col4, col5, col6, col7 ];
    const setCol = [ setCol0, setCol1, setCol2, setCol3, setCol4, setCol5, setCol6, setCol7 ];

    const dispatch = useDispatch();

    // See when cards need to be added to the deck
    const cardToAdd = useSelector(state => state.deckBuilder.add);

    useEffect(() => {

        // Find where to 
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

    return (
        <div id="DBDeck">
            {}
        </div>
    );
}

export default DBDeck;
