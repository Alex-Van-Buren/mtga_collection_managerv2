import premierLookup from '../data/premierLookup.json';
import quickLookup from '../data/quickLookup.json';
import traditionalLookup from '../data/traditionalLookup.json';

/**
 * Uses Monte Carlo data from 10 million drafts as lookup table and interpolates
 * to determine average gem and pack rewards for the given win rate and draft type.
 * @param {*} draftType Draft type: "premier", "quick", or "traditional"
 * @param {*} winRate Number between 0.00 and 1.00
 * @returns \{ gems, packs }
 */
export default function useDraft(draftType, winRate) {
    
    // Get lookup table
    let lookup;
    switch (draftType) {
        case "premier":
            lookup = premierLookup;
            break;
        case "quick":
            lookup = quickLookup;
            break;
        case "traditional":
            lookup = traditionalLookup;
            break;
        default:
            break;
    }

    const rateHigh = (Math.ceil(winRate*100)/100).toFixed(2);
    const rateLow = (Math.floor(winRate*100)/100).toFixed(2);

    // Check if high and low are the same
    if (rateHigh === rateLow) {
        return { gems: lookup[rateHigh].avgGems, packs: lookup[rateHigh].avgPacks };
    }
    
    // Else interpolate
    const gemsHigh = lookup[rateHigh].avgGems;
    const packsHigh = lookup[rateHigh].avgPacks;
    const gemsLow = lookup[rateLow].avgGems;
    const packsLow = lookup[rateLow].avgPacks;

    const gems = interpolate({ rateHigh, valHigh:gemsHigh, rateLow, valLow:gemsLow, rateUser:winRate});
    const packs = interpolate({ rateHigh, valHigh:packsHigh, rateLow, valLow:packsLow, rateUser:winRate});

    return { gems, packs };
}

// Interpolates from lookup table
function interpolate({rateHigh, valHigh, rateLow, valLow, rateUser}) {

    const numerator = valLow * (rateHigh - rateUser) + valHigh * (rateUser - rateLow);
    const denominator = rateHigh - rateLow;

    return numerator / denominator;
}