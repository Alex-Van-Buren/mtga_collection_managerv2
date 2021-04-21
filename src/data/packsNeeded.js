import { setInfo } from './setInfo';

/**
 * 
 * @param {String} setId 3 letter set Id 
 * @param {String} rarity "rare" or "mythic"
 * @param {Number} numCardsOwned Number of cards owned of the given rarity and set
 * @param {Number} numCardsTotal Total number of cards of the given rarity in set
 * @returns Returns the average number of packs required to open to achieve 100% completion of the given rarity
 */
function packsNeeded(setId, rarity, numCardsOwned, numCardsTotal) {

    // use setId to get the mythic upgrade rate from setInfo
    const mythicUpgradeRate = setInfo[setId].mythic_upgrade;

    // Calculate the number of cards missing
    const numMissing = numCardsTotal - numCardsOwned;

    // This is the rate that the card does NOT upgrade into a wildcard of the same rarity
    // This value is commonly used by other trackers/websites. Might need further verification.
    const nonWildcardRate = 11/12;

    let packsToComplete;

    // If the rarity of the missing cards is "rare", we subtract the mythic upgrade rate from 1 to get the rare rate
    if ( rarity === 'rare' ) {
        packsToComplete = numMissing / ((1 - mythicUpgradeRate) * nonWildcardRate);
    }
    // rarity === 'mythic'
    else {
        packsToComplete = numMissing / (mythicUpgradeRate * nonWildcardRate);
    }

    packsToComplete = Math.round(packsToComplete)

    return packsToComplete; 

}

export default packsNeeded;