import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useBooster from '../../hooks/useBooster';

import packsNeeded from '../../data/packsNeeded';
import '../../css/PacksCalculator.css';

function PacksCalculator() {
    const { setId } = useParams();

    const ownedBoosters = useBooster(setId);
    console.log(ownedBoosters)

    // Grab values from redux and compute the average number of packs required to 100% complete rare collection
    const raresOwned = useSelector( state => state.inventory.set[setId].rare.ownedTotal);
    const raresTotal = useSelector( state => state.inventory.set[setId].rare.setTotal);
    const packsToCompleteRares = packsNeeded(setId, 'rare' , raresOwned, raresTotal);

    // Grab values from redux and compute the average number of packs required to 100% complete mythic collection
    const mythicsOwned = useSelector( state => state.inventory.set[setId].mythic.ownedTotal);
    const mythicsTotal = useSelector( state => state.inventory.set[setId].mythic.setTotal);
    const packsToCompleteMythics = packsNeeded(setId, 'mythic' , mythicsOwned, mythicsTotal);

    return (
        <div className="calculator"> 
            <h2 >Average Number of Packs to Complete Collection</h2>       
            <h3> Rare: <span className="packNumber">{packsToCompleteRares}</span> </h3>                        
            <h3> Mythic: <span className="packNumber">{packsToCompleteMythics}</span> </h3>            
        </div>

    );
}

export default PacksCalculator;