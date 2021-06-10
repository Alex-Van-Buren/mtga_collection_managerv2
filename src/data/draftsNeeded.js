import { setInfo } from './setInfo';

function draftsNeeded(setId, rarity, ownedTotal, setTotal, cardsPicked, rewardPacks, ownedPacks=0) {
    const mythicUpgradeRate = setInfo[setId].mythic_upgrade;
    const numMissing = setTotal - ownedTotal;

    // The wildcard rate for mythics and for rares is (1/30) each so the nonWildcard rate is 1-(1/30)-(1/30)  = (14/15)
    const nonWildcardRate = 14/15;

    // Most cards picked will be rare, but account for specific mythic upgrade rate
    // Default value is for when rarity === "rare"
    let rarityOpenRate = 1 - mythicUpgradeRate;

    if (rarity === "mythic") {
        rarityOpenRate = mythicUpgradeRate;
    }
    // Strixhaven mytical archive works differently and has a rare rate as well as a mythic rate
    if (setId === 'sta') {
        // Mystical archive cards also can NOT upgrade to wildcards
        // therefore these values are divided by the nonWildcardRate in order to cancel out the term in the numerator/denominator calculation
        if (rarity === 'rare') {
            rarityOpenRate = setInfo[setId].rare_rate / nonWildcardRate;
        }
        if ( rarity === 'mythic') {
            rarityOpenRate = setInfo[setId].mythic_upgrade / nonWildcardRate;
        }
    }

    const numerator = numMissing - ownedPacks * rarityOpenRate * nonWildcardRate;
    const denominator = parseFloat(cardsPicked) + rewardPacks * rarityOpenRate * nonWildcardRate;

    // Round number of drafts up to whole number
    return Math.ceil(numerator / denominator);
}

export default draftsNeeded;