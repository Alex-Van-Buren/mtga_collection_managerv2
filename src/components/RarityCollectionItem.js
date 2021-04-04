import React from 'react';
import { useSelector } from 'react-redux';

import '../css/RarityCollectionItem.css';

/**
 * Component that contains details about how many cards are owned from a specific set of a specific rarity
 * @param {*} props Contains setId and rarity 
 */
function RarityCollectionItem({ setId, rarity }) {

    /*
     * Extract multiple values from redux state
     * - Multiple calls to useSelector used to avoid needing to memoize redux state
     */
    // TODO: cardCollection unused. Also could simplify if undefined is an acceptible value
    const cardCollection = useSelector( ({ inventory }) => { // Destructure inventory from state
        if (inventory.set)
            return inventory.cardCollection;
        
        // else no collection found
        return null;
    });

    const ownedTotal = useSelector( ({ inventory: {set} }) => { // Destructure set from state.inventory
        if (set)
            return set[setId][rarity].ownedTotal;
        
        // else no cards found
        return 0;
    });

    const setTotal = useSelector( ({ inventory: {set} }) => { // Destructure set from state.inventory
        if (set)
            return set[setId][rarity].setTotal;
    });

    // Calculate percent of cards owned (to one decimal) from specified set of specified rarity
    const percentOwned = ((ownedTotal / setTotal) * 100).toFixed(1);

    return (
        <div className="item " id="collectionItem" >
            <div className="right floated content"> {ownedTotal} / {setTotal} ({percentOwned}%)</div>
            <div className="content">{rarity}</div>
        </div>
    );
}

export default RarityCollectionItem;