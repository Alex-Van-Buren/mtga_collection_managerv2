import { useSelector } from 'react-redux';
import { setInfo } from '../data/setInfo';

function useBooster(setId) {

    // Get the boosters owned by the player
    const boosters = useSelector(state => state.inventory.player.boosters);
    const setCollationId = setInfo[setId].collationId;

    let numOwned = 0;
    for (const booster of boosters) {
        if ( booster.collationId === setCollationId ) {

            // Get the number and stop checking 
            numOwned = booster.count;
            break;
        }
    }

    return numOwned;   
}

export default useBooster;