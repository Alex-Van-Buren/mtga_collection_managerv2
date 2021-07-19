import React from 'react';
import { useSelector } from 'react-redux';

function DBExport() {

    const deckMap = useSelector(state => state.deckBuilder.deckMap);



    return (
        <div>
            <button>Export Deck to File</button>
            <button>Save Deck to Clipboard</button>
        </div>
    );
}

export default DBExport;