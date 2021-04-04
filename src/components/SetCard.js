import React from 'react';
import { useSelector } from 'react-redux'

import '../css/SetCard.css'
import RarityCollectionItem from './RarityCollectionItem';
import setInfo from '../data/setInfo.json'

function SetCard({ setId }) {   
    
    /*
     * TODO: Currently unused. Also, could simplify to:
     *      const cardCollection = useSelector( ({ inventory }) => inventory.cardCollection );
     * if undefined is an acceptable value.
     * Else remove this "to do"
     */
    const cardCollection = useSelector( ({ inventory }) => {
        if (inventory.set)
            return inventory.cardCollection;
        // else state doesn't exist yet
        return null;
    });

    /*
     * Calculate totals from redux state 
     */
    const ownedTotal = useSelector( ({ inventory: {set} }) => {
        let sum = 0;
        if (set) {
            // Sum the total cards owned
            Object.keys(set[setId]).forEach( rarity => {sum += set[setId][rarity].ownedTotal} );
        }
        return sum;
    });

    const setTotal = useSelector( ({ inventory: {set} }) => {
        let sum = 0;
        if (set) {
            // Sum the total cards in the set
            Object.keys(set[setId]).forEach( rarity => {sum += set[setId][rarity].setTotal} );
        }
        return sum;
    });

    const percentOwned = ((ownedTotal / setTotal) * 100).toFixed(1);
    const setName = setInfo[setId].name;
    
    return (
        <>
            {/* The specific card set */}
            <div className="ui center aligned header" id="setCardHeader">{setName}</div>

            {/* Owned cards from this set */}
            <div className="ui center aligned sub header">Collection Progress
                <p>{ownedTotal} / {setTotal} ({percentOwned}%)</p>
            </div>

            {/* Owned cards by rarity */}
            <div className="ui middle aligned divided list">
                <RarityCollectionItem setId={setId} rarity="mythic" />                    
                <RarityCollectionItem setId={setId} rarity="rare" />
                <RarityCollectionItem setId={setId} rarity="uncommon" />
                <RarityCollectionItem setId={setId} rarity="common"/>
            </div>
        </>        
    );
}

export default SetCard;