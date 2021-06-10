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

    // use setId to get the mythic upgrade rate from setInfo and get rareRate using this value
    let mythicUpgradeRate = setInfo[setId].mythic_upgrade;
    let rareRate = 1 - mythicUpgradeRate;

    // The wildcard rate for mythics and for rares is (1/30) so the nonWildcard rate is 1-(1/30)-(1/30)  = (14/15)
    const nonWildcardRate = 14/15;

    // For strixhaven mystical archive the rareRate is explicit since a rare/mythic is not in every pack
    if ( setId === 'sta' ) {
        // Mystical archive cards can NOT upgrade to wildcards
        // therefore these values are divided by the nonWildcardRate in order to cancel out the term in the packsToComplete calculation
        rareRate = setInfo[setId].rare_rate / nonWildcardRate;
        mythicUpgradeRate = mythicUpgradeRate / nonWildcardRate;
    }

    // Calculate the number of cards missing
    const numMissing = numCardsTotal - numCardsOwned;

    let packsToComplete;

    // If the rarity of the missing cards is "rare", we subtract the mythic upgrade rate from 1 to get the rare rate
    if ( rarity === 'rare' ) {
        packsToComplete = numMissing / (rareRate * nonWildcardRate);
    }
    // rarity === 'mythic'
    else {
        packsToComplete = numMissing / (mythicUpgradeRate * nonWildcardRate);
    }

    packsToComplete = Math.ceil(packsToComplete)

    return packsToComplete; 

}

export default packsNeeded;