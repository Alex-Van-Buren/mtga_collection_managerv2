import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useBooster from '../../hooks/useBooster';

import packsNeeded from '../../data/packsNeeded';
import ManualPacks from './ManualPacks';
import { setInfo } from '../../data/setInfo';
import '../../css/PacksCalculator.css';

function PacksCalculator() {
    const { setId } = useParams();

    const ownedBoosters = useBooster(setId);

    // Grab values from redux and compute the average number of packs required to 100% complete rare collection
    const { ownedTotal: raresOwned, setTotal: raresTotal } = useSelector( ({inventory}) => inventory.set[setId].rare);
    const packsToCompleteRares = packsNeeded(setId, 'rare' , raresOwned, raresTotal);

    // Grab values from redux and compute the average number of packs required to 100% complete mythic collection
    const { ownedTotal: mythicsOwned, setTotal: mythicsTotal } = useSelector( ({inventory}) => inventory.set[setId].mythic);
    const packsToCompleteMythics = packsNeeded(setId, 'mythic' , mythicsOwned, mythicsTotal);

    // Check if the set is obtainable from normal boosters
    if ( !setInfo[setId].collationId ) {
        const message = `${setInfo[setId].name} is not obtainable from normal Booster Packs`;
        return (
            // The styling for this id is reused from PackCalculator.css
            <div id="notAvailable">
                <h2>{message}</h2>
            </div>
        );
    }
    return (
        <div className="calculator"> 
            <h2>< ManualPacks set={setId} /></h2>
            <h2>Additional Packs Needed to Complete:</h2>       
            <h3>Rares: <span className="packNumber">{packsToCompleteRares - ownedBoosters}</span> </h3>                        
            <h3>Mythics: <span className="packNumber">{packsToCompleteMythics - ownedBoosters}</span> </h3>            
        </div>

    );
}

export default PacksCalculator;