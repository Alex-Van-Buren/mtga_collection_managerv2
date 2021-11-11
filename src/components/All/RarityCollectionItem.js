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

    let rarityNumber;
    // Check if percentOwned is a number and don't show the percentage to user if NaN
    if (percentOwned >= 0 ) {
        rarityNumber = `${ownedTotal} / ${setTotal} (${percentOwned}%)`;
    } else {
        rarityNumber = `${ownedTotal} / ${setTotal}`;
    }

    // Replace some set symbols with another (e.g. give all Historic Anthologies the HA1 symbol)
    const symbolTransforms = {
        "ha2": "ha1",
        "ha3": "ha1",
        "ha4": "ha1",
        "ha5": "ha1",
        "mid": "xin4",  // MID and VOW are currently listed under these in KeyRune. This may be corrected in future versions of Keyrune cdn
        "vow": "xin3",
    }

    const symbol = symbolTransforms[setId] ? symbolTransforms[setId] : setId;

    return (
        <div className="item " id="collectionItem" >
            <div className="rarityContainer">

                <div className="rarityText">
                    <i className={`ss ss-${symbol} ss-${rarity} ss-fw mtgIcon`}/>
                    &nbsp; {/* Force a non-CSS space between icon and text */}
                    {rarity}
                </div>

                <div className="rarityNumber">
                    <span>{rarityNumber}</span>
                </div>
            </div>
            <ProgressBar percent={percentOwned} innerClass={rarity}/>
        </div>
    );
}

export default RarityCollectionItem;