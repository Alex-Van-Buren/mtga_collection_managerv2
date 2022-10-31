import { 
    premierGems, premierPacks, quickGems, quickPacks, traditionalGems, traditionalPacks 
} from '../data/draftRewards';

/**
 * Determine average gem and pack rewards for the given win rate and draft type.
 * Functions are polynomial fits to Monte Carlo simulation data of drafts.
 * @param {*} draftType Draft type: "premier", "quick", or "traditional"
 * @param {*} winRate Decimal number between 0 and 1
 * @returns \{ gems, packs }
 */
export default function useDraft(draftType, winRate) {
    
    switch (draftType) {
        case "premier":
            return { gems: premierGems(winRate), packs: premierPacks(winRate) };
        case "quick":
            return { gems: quickGems(winRate), packs: quickPacks(winRate) };
        case "traditional":
            return { gems: traditionalGems(winRate), packs: traditionalPacks(winRate) };
        default:
            return { gems: 0, packs: 0 };
    }
}