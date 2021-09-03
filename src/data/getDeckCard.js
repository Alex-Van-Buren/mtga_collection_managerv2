import arenaCards from "./arenaCards";

/**
 * Returns an array of cards matching the specified parameters. If name only is specified, the array contains all matching
 * cards (if multiple versions exist). If set and collector number are specified, then the array will contain one matching
 * card. Returns an empty array if no matches found.
 * 
 * @param {string} name The card name (not case sensitive). Fallback for no match from set and collector_number.
 * @param {string} set (Optional) The three-letter set code for the card (not case sensitive).
 * @param {number} collector_number (Optional) The collector number for the specific card set.
 * @returns {array} An array of matching cards.
 */
function getDeckCard(name, set=null, collector_number=null) {

    // Matches to return. Global so getDeckCard and addCard have access
    let matches = [];

    // Convert name and set code to lowercase for searching
    name = name.toLowerCase();
    set = set ? set.toLowerCase() : null;
    
    if (typeof collector_number === "number") {
        collector_number = collector_number.toString();
    }

    // Check if looking for specific card (set and collector_number specified)
    if (set && collector_number) {

        // Search allArenaCards array for a single match
        for (const card of arenaCards) {
            
            // Find single matching card
            if (card.set === set && card.collector_number === collector_number) {
                
                // Add card to matches
                matches.push(card);

                // Don't look for additional matches
                break;
            }
        }
    }

    // Looking for specific set, but no collector number known
    else if (set) {

        // Search allArenaCards array for a single match
        for (const card of arenaCards) {
            
            // Find single matching card
            if ( (card.name.toLowerCase() === name || (card.card_faces && card.card_faces[0].name.toLowerCase() === name))
                && (card.set === set) )
            {
                // Add card to matches
                matches.push(card);

                // Don't look for additional matches
                break;
            }
        }
    }

    // Fallback search for all name matches (either set and collector number unspecified, or yielded no results)
    if (matches.length === 0) {

        // Search allArenaCards array for all name matches
        for (const card of arenaCards) {
            
            // Check card name and check front side name if double-faced card
            if ( card.name.toLowerCase() === name || (card.card_faces && card.card_faces[0].name.toLowerCase() === name) ) {
                
                // Add card to matches
                matches.push(card);
            }
        }
    }

    // Return array of matching cards
    return matches;
}

export default getDeckCard;
