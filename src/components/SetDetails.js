import React from 'react';
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom';

import CardList from './CardList';
import RarityCollectionItem from './RarityCollectionItem';
import setInfo from '../data/setInfo.json'

function SetDetails( { cardCollection, ownedTotal, setTotal } ) {
    
    // Get set Id from url
    const { setId } = useParams();

    const percentOwned = ((ownedTotal / setTotal) * 100).toFixed(1);
    const setName = setInfo[setId].name;

    return (
        <>
            <div className="ui grid container">
                <div className="six wide centered column">
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
            </div>

            <div className="ui six column grid">
                <CardList setId={setId} color="W"/>
                <CardList />
                <CardList />
                <CardList />
                <CardList />
                <CardList />
            </div>
        </>
    )
    
}
function mapStateToProps( state, ownProps ) {

    if ( state.inventory.set ) {
        const set = state.inventory.set[ownProps.match.params.setId];
        
        const ownedTotal = set.mythic.ownedTotal + set.rare.ownedTotal + set.uncommon.ownedTotal + set.common.ownedTotal;        
        const setTotal = set.mythic.setTotal + set.rare.setTotal + set.uncommon.setTotal + set.common.setTotal;
        
        return {
            cardCollection: state.inventory.cardCollection,
            ownedTotal: ownedTotal,
            setTotal: setTotal
        }
    }else{
        return{
            cardCollection: null,
            ownedTotal: 0,
            setTotal: 0
        }
    }
}

export default connect(mapStateToProps)(SetDetails);