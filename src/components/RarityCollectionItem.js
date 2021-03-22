import React from 'react';
import { connect } from 'react-redux';

import '../css/RarityCollectionItem.css';

function RarityCollectionItem({setId, cardCollection, rarity, ownedTotal, setTotal}) {   
    const percentOwned = ((ownedTotal / setTotal) * 100).toFixed(1);

    return (
        <div className="item " id="collectionItem" >
            <div className="right floated content"> {ownedTotal} / {setTotal} ({percentOwned}%)</div>
            <div className="content">{rarity}</div>
        </div>
    )
}

function mapStateToProps(state, ownProps){
    if(state.inventory[ownProps.setId]){
        return {
            cardCollection: state.inventory.cardCollection,
            ownedTotal: state.inventory[ownProps.setId][ownProps.rarity].ownedTotal,
            setTotal: state.inventory[ownProps.setId][ownProps.rarity].setTotal
        }
    }
    else{
        return{
            cardCollection: null,
            ownedTotal: 0
            
        }
    }

}

export default connect(mapStateToProps)(RarityCollectionItem);