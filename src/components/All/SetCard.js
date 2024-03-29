import React from 'react';
import { useSelector } from 'react-redux'

import RarityCollectionItem from './RarityCollectionItem';
import { setInfo } from '../../data/setInfo'
import '../../css/SetCard.css';

function SetCard({ setId }) {   
    
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
    let setCardHeader = <div className="ui center aligned header" id="setCardHeader">{setName}</div>;

    if ( setInfo[setId].logo ) {
        setCardHeader = <div className="ui center aligned header" id="setCardHeader" >
            <img src={setInfo[setId].logo} alt={setName} aria-label={setName} title={setName}/>
            </div>;
    }
    
    return (
        <div className="mtgaSetCard">
            {/* The specific card set */}
            {setCardHeader}

            {/* Owned cards from this set */}
            <div className="ui center aligned sub header">
                Set Progress:
                &nbsp; &nbsp; &nbsp;
                <span>{ownedTotal} / {setTotal} ({percentOwned}%)</span>
            </div>

            {/* Owned cards by rarity */}
            <div className="ui middle aligned list">
                <RarityCollectionItem setId={setId} rarity="mythic" />                    
                <RarityCollectionItem setId={setId} rarity="rare" />
                <RarityCollectionItem setId={setId} rarity="uncommon" />
                <RarityCollectionItem setId={setId} rarity="common"/>
            </div>
        </div>        
    );
}

export default SetCard;