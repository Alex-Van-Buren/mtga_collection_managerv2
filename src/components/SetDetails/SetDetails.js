import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CardList from './CardList';
import RarityCollectionItem from '../RarityCollectionItem';
import DisplayOptions from './DisplayOptions';
import setInfo from '../../data/setInfo.json';
import CardModal from './CardModal';
import '../../css/SetDetails.css';

function SetDetails() {
    
    // Get set Id from url
    const { setId } = useParams();

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

    return (<>
        {/* Card modal is only shown when a card is clicked */}
        <CardModal/>

        <div className="ui grid container">

            {/* Set Details */}
            <div className="six wide column">
                <div className="ui center aligned header">{setName}</div>
                <div className="ui center aligned sub header">
                    Set Progress:
                    &nbsp; &nbsp; &nbsp; {/* Spacers */}
                    <span>{ownedTotal} / {setTotal} ({percentOwned}%)</span>
                </div>

                <div className="ui middle aligned divided list">
                    <RarityCollectionItem setId={setId} rarity="mythic" />                    
                    <RarityCollectionItem setId={setId} rarity="rare" />
                    <RarityCollectionItem setId={setId} rarity="uncommon" />
                    <RarityCollectionItem setId={setId} rarity="common"/>
                </div>
            </div>

            {/* Display options for SetDetails */}
            <div className="ten wide column">
                <DisplayOptions/>
            </div>
        </div>
        
        <hr className="lineBreak"/>

        {/* Cards matching display options */}
        <CardList setId={setId}/>
    </>);
    
}

export default SetDetails;