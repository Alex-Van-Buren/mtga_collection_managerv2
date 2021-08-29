import { useSelector } from 'react-redux';

function useBooster(setId) {

    // Get the boosters owned by the player
    const boosters = useSelector(state => state.inventory.player.Boosters);

    for (const booster of boosters) {
        if ( booster.SetCode.toLowerCase() === setId ) {

            // Get the number and stop checking 
            return booster.Count;
        }
    }

    return 0;   
}

export default useBooster;