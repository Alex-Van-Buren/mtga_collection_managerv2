import allArenaCards from './arenaCards20210412165933.json'
/**
 * 
 * @param {String} set Three letter mtg set code. Should be all lowercase
 * @param {Object} cardCollection Object containing arena ids as keys and number owned as values
 * @param {String} rarity  Optional string of card rarity to find total, if not set will find total for all rarities
 * @returns {Object} {ownedTotal, setTotal} Returns object with total owned of given or all rarities first and set total second
 */
function totalOwned(set, cardCollection, rarity ) {

    // Count total and owned cards in the set
    let setTotal = 0;
    let ownedTotal = 0;

    // Check each card on arena
    allArenaCards.forEach( card => {

        // Filter Out basic lands
        if ( !(card.type_line.includes('Basic') && card.type_line.includes('Land')) ) {

            // Check if the card is from the right set, rarity, and is in a booster
            if (card.set === set && card.rarity === rarity && card.booster ) {

                // Update total possible
                setTotal +=4;

                // Find the amount owned by user
                const id = card.arena_id;
                if (cardCollection && cardCollection[id]) {
                    ownedTotal += cardCollection[id];
                }
            }
        }
    });

    return { ownedTotal, setTotal };
}

export default totalOwned;