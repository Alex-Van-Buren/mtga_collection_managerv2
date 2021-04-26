import allArenaCards from './arenaCards20210412165933.json';

/**
 * Counts the number of cards in each set and the number the user owns from that set.
 * @param {Object} cardCollection Object containing arena ids as keys and number owned as values
 * @returns {Object} Returns an object that describes the number of cards owned/total for each set and 
 * each rarity in that set
 */
function totalOwned(cardCollection) {

    // TODO: replace with redux
    // Get card sets to check
    const sets = ['eld', 'thb', 'iko', 'm21', 'znr', 'khm'];

    // Create inventory for each set
    const inventory = {};
    for (const set of sets) {

        // Create a rarity with ownedTotal and setTotal for each set
        inventory[set] = {
            mythic:   { ownedTotal: 0, setTotal: 0 },
            rare:     { ownedTotal: 0, setTotal: 0 },
            uncommon: { ownedTotal: 0, setTotal: 0 },
            common:   { ownedTotal: 0, setTotal: 0 }
        }
    }

    // Check each card on arena
    for (const card of allArenaCards) {

        // Filter Out basic lands
        if ( card.type_line.includes('Basic') && card.type_line.includes('Land') ) {

            // Don't include basic lands (skip other checks and don't add this card)
            continue;
        }

        // TODO: May need to change in the future to include specific non-booster sets
        // Filter out non-booster cards
        if (!card.booster) {

            // Don't include non-booster cards
            continue;
        }

        // If card is in a tracked set, add that card to inventory 
        if (inventory[card.set]) {

            // Update total possible in set
            inventory[card.set][card.rarity].setTotal += 4;

            // Find number owned by user
            const id = card.arena_id;
            if (cardCollection && cardCollection[id]) {
                inventory[card.set][card.rarity].ownedTotal += cardCollection[id];
            }
        }
    }

    return inventory;
}

export default totalOwned;