import { setInfo } from './setInfo';

function draftsNeeded(setId, rarity, ownedTotal, setTotal, cardsPicked, rewardPacks, ownedPacks=0) {

    const mythicUpgradeRate = setInfo[setId].mythic_upgrade;
    const numMissing = setTotal - ownedTotal;

    // This is the generally accepted value for non wildcards, but needs further verification
    const nonWildcardRate = 11/12;

    // Most cards picked will be rare, but account for specific mythic upgrade rate
    // Default value is for when rarity === "rare"
    let rarityOpenRate = 1 - mythicUpgradeRate;

    if (rarity === "mythic") {
        rarityOpenRate = mythicUpgradeRate;
    }

    // This is the number of additional cards gained picking them IN the draft
    const rarityCardsPicked = cardsPicked * rarityOpenRate;

    const numerator = numMissing - ownedPacks * rarityOpenRate * nonWildcardRate;

    const denominator = rarityCardsPicked + rewardPacks * rarityOpenRate * nonWildcardRate;

    // Round number of drafts up to whole number
    return Math.ceil(numerator / denominator);
}

export default draftsNeeded;