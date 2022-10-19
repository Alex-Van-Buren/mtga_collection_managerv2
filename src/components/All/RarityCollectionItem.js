import React from 'react';
import { useSelector } from 'react-redux';

import ProgressBar from './ProgressBar';
import '../../css/RarityCollectionItem.css';

/**
 * Component that contains details about how many cards are owned from a specific set of a specific rarity
 * @param {*} setId
 * @param {*} rarity
 */
function RarityCollectionItem({ setId, rarity }) {

    /*
     * Extract multiple values from redux state
     * - Multiple calls to useSelector used to avoid needing to memoize redux state
     */
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

    let symbol = setId;
    // Replace some set symbols with another (e.g. give all Historic Anthologies the HA1 symbol)
    if (setId.slice(0, 2) === 'ha') {
        symbol = 'ha1'
    }
    if (setId.length === 4 && setId[0] === 'y') {
        symbol = 'y22'
    }

    // If there are no cards of this rarity, don't show a progress bar for this rarity
    if (setTotal === 0) {
        return <></>
    }

    return (
        <div className="item " id="collectionItem" >
            <div className="rarityContainer">

                <div className="rarityText">
                    <i className={`ss ss-${symbol} ss-${rarity} ss-fw mtgIcon`}/>
                    &nbsp; {/* Force a non-CSS space between icon and text */}
                    {rarity}
                </div>

                <div className="rarityNumber">
                    <span>{`${ownedTotal} / ${setTotal} (${percentOwned}%)`}</span>
                </div>
            </div>
            <ProgressBar percent={percentOwned} innerClass={rarity}/>
        </div>
    );
}

export default RarityCollectionItem;