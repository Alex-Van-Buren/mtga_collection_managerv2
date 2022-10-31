/**
 * Calculate average number of gems received from the premier draft given the win rate.
 * @param {Number} winRate Decimal win rate between 0 and 1
 * @returns Average number of gems
 */
export function premierGems(winRate) {
    const c = [50.03402492416154, 149.0845378348272, 775.7095799076778, 6054.504887371673, -3216.3085852051154, -5332.006638400257, 9472.429232232273, 1870.4744680039585, -18349.270998546854, 10725.295188058168];
    return _helper(winRate, c);
}

/**
 * Calculate average number of packs received from the premier draft given the win rate.
 * @param {Number} winRate Decimal win rate between 0 and 1
 * @returns Average number of packs
 */
export function premierPacks(winRate) {
    const c = [1.0001034942542077, -0.005057280757823079, 6.153850352314848, -9.776702399434953, 27.65365635535818, -31.080652027645556, 49.45758591449703, -40.889581309435016, -19.915665630240255, 23.402303936034514];
    return _helper(winRate, c);
}

/**
 * Calculate average number of gems received from the quick draft given the win rate.
 * @param {Number} winRate Decimal win rate between 0 and 1
 * @returns Average number of gems
 */
export function quickGems(winRate) {
    const c = [50.034438537573195, 145.9440564146371, 550.2674764168405, -750.7812855812663, 6126.646088509122, -13334.577573805349, 24578.101417684462, -27026.63596521155, 10610.987441387784];
    return _helper(winRate, c);
}

/**
 * Calculate average number of packs received from the quick draft given the win rate.
 * @param {Number} winRate Decimal win rate between 0 and 1
 * @returns Average number of packs
 */
export function quickPacks(winRate) {
    const c = [1.2000150470898692, 0.06152929250334793, 0.07210486716212472, -0.36851214770831575, 3.435597054889513, -10.136353908614183, 19.05764437108519, 0.351017877814229, -26.09476746197288, 14.421703982894996];
    return _helper(winRate, c);
}

/**
 * Calculate average number of gems received from the traditional draft given the win rate.
 * @param {Number} winRate Decimal win rate between 0 and 1
 * @returns Average number of gems
 */
export function traditionalGems(winRate) {
    const c = [0.03902737106636067, -0.48833137471945065, 3000.522806855206];
    return _helper(winRate, c);
}

/**
 * Calculate average number of packs received from the traditional draft given the win rate.
 * @param {Number} winRate Decimal win rate between 0 and 1
 * @returns Average number of packs
 */
export function traditionalPacks(winRate) {
    const c = [1.0000196978713674, -0.00041634432364678897, 9.000098671941068, -3.99955576362173];
    return _helper(winRate, c);
}

function _helper(winRate, c) {
    let total = 0;
    for (let i=0; i<c.length; i++) {
        total += c[i] * winRate**i;
    }
    return total;
}