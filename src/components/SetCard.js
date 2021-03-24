import React from 'react';
import { connect } from 'react-redux'

import '../css/SetCard.css'
import RarityCollectionItem from './RarityCollectionItem';
import setInfo from '../data/setInfo.json'

function SetCard({ setId, cardCollection, ownedTotal, setTotal}) {   
    
    const percentOwned = ((ownedTotal / setTotal) * 100).toFixed(1);
    const setName = setInfo[setId].name
    return (
        <div>

            <div className="ui center aligned header" id="setCardHeader">{setName}</div>
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
    );
}

function mapStateToProps(state, ownProps){
    // Make sure the state exists
    if(state.inventory.set){
        const set = state.inventory.set[ownProps.setId];

        // Total up all of the rarities
        const ownedTotal = set.mythic.ownedTotal + set.rare.ownedTotal + set.uncommon.ownedTotal + set.common.ownedTotal;        
        const setTotal = set.mythic.setTotal + set.rare.setTotal + set.uncommon.setTotal + set.common.setTotal;
        
        return {
            cardCollection: state.inventory.cardCollection,
            ownedTotal : ownedTotal,
            setTotal: setTotal
        }    
    }
    // If state doesn't exist yet just return default values
    else{
        return{
            cardCollection: null,
            ownedTotal: 0,
            setTotal: 0
        }
    }
}

export default connect(mapStateToProps)(SetCard)