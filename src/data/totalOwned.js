import arenaCards from './arenaCards';
import { historicSets as sets, setInfo } from '../data/setInfo';

/**
 * Counts the number of cards in each set and the number the user owns from that set.
 * @param {Object} cardCollection Object containing arena ids as keys and number owned as values
 * @returns {Object} Returns an object that describes the number of cards owned/total for each set and 
 * each rarity in that set
 */
function totalOwned(cardCollection) {

    // Create inventory for each set
    const inventory = {};
    for (const set of sets) {

        // Create a rarity with ownedTotal and setTotal for each set
        inventory[set] = {
            mythic:   { ownedTotal: 0, setTotal: 0 },
            rare:     { ownedTotal: 0, setTotal: 0 },
            uncommon: { ownedTotal: 0, setTotal: 0 },
            common:   { ownedTotal: 0, setTotal: 0 }
        };
    }

    // Helper function that updates the inventory ownedTotal and setTotal given a card
    function updateInventory(card) {
        // Update total possible in set
        inventory[card.set][card.rarity].setTotal += 4;
    
        // Find number owned by user
        if (cardCollection && cardCollection[card.arenaId]) {
            inventory[card.set][card.rarity].ownedTotal += cardCollection[card.arenaId];
        }
    }

    // Check each card on arena
    for (const card of arenaCards) {

        // Filter Out basic lands
        if ( card.type_line.includes('Basic') && card.type_line.includes('Land') ) {

            // Don't include basic lands (skip other checks and don't add this card)
            continue;
        }
        
        // Check if we track the amount of this card (booster values match)
        if (setInfo[card.set] && setInfo[card.set].booster === card.booster) {

            // Update the inventory 
            updateInventory(card);
        }
        
        // Don't include non-booster cards
        continue;
    }

    return inventory;
}

export default totalOwned;