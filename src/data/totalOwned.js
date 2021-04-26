import allArenaCards from './arenaCards20210412165933.json';

/**
 * 
 * @param {String} set Three letter mtg set code. Should be all lowercase
 * @param {Object} cardCollection Object containing arena ids as keys and number owned as values
 * @param {String} rarity  Optional string of card rarity to find total, if not set will find total for all rarities
 * @returns {Object} {ownedTotal, setTotal} Returns object with total owned of given or all rarities first and set total second
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

        // If card is in a tracked set, add it to that set in inventory 
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