import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useResizeWidth from '../../hooks/useResizeWidth';

import CardList from './CardList';
import RarityCollectionItem from '../RarityCollectionItem';
import SetDetailsOptions from './SetDetailsOptions';
import setInfo from '../../data/setInfo.json';

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

    // Find optimal number of columns for card display based on screen width
    const width = useResizeWidth();

    // initialize number of columns to five for full width screen
    let numCols = 'five';
    if ( width < 640 ) 
        numCols = 'two';
    else if ( width < 990 )
        numCols = 'three';
    else if ( width < 1200 )
        numCols = 'four';

    return (
        <>
            <div className="ui grid container">
                <div className="six wide column">
                    <div className="ui center aligned header">{setName}</div>
                    <div className="ui center aligned sub header">Collection Progress
                        <p>{ownedTotal} / {setTotal} ({percentOwned}%)</p>
                    </div>
                    <div className="ui middle aligned divided list">
                        <RarityCollectionItem setId={setId} rarity="mythic" />                    
                        <RarityCollectionItem setId={setId} rarity="rare" />
                        <RarityCollectionItem setId={setId} rarity="uncommon" />
                        <RarityCollectionItem setId={setId} rarity="common"/>
                    </div>
                </div>

                <div className="ten wide column">
                    <SetDetailsOptions/>
                </div>
            </div>

            <div className={`ui ${numCols} column grid container`}>                
                <CardList setId={setId}/>                
            </div>
        </>
    )
    
}

export default SetDetails;