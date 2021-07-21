import React from 'react';
import { useSelector } from 'react-redux';

import '../../css/DeckHeader.css';
import AddBasicsButton from './AddBasicsButton';

/**
 * Creates the header that separates the available cards to add to a deck and the deckList/sideboard. 
 * Contains info about the decklist as well as buttons to help build the deck/sideboard. 
 * @returns JSX
 */
function DeckHeader() {
    // Get the deck array and flatten it;
    let deck = useSelector(state => state.deckBuilder.deck); 
    deck = deck.flat();

    // Initialize deck counts
    let totalCount       = 0;
    let landCount        = 0;
    let partialLandCount = 0;
    let creatureCount    = 0; 
    let nonCreatureCount = 0;

    // Count up totals
    for (const card of deck) {
        totalCount++;
        
        // If Creature appears anywhere in the type line update creature count (Do not care if card is double sided)
        if (card.type_line.includes('Creature')) {
            creatureCount++;
        }

        // Check if single sided (Dual sided cards have each type separated by //)
        if (!card.type_line.includes('//')) {

            // if land --> update landcount
            if (card.type_line.includes('Land')) {
                landCount++;
            }
            
            // if not creature AND not land --> update noncreature count
            if (!card.type_line.includes('Creature') && !card.type_line.includes('Land')) {
                nonCreatureCount++;
            }
        }
        // Else double sided
        else {
            // Regular expression to capture each side of the //
            // eg. type_line = 'Instant // Land' --> want to capture 'Instant' and 'Land'
            const sideRegex = /(.+) \/\/ (.+)/;
            const sides = card.type_line.match(sideRegex);
            const frontType = sides[1];
            const backtype = sides[2];
            
            // if double sided and both sides have type line including 'Land' --> update land count
            if (frontType.includes('Land') && backtype.includes('Land')){
                landCount++;
            } else {
                // if double sided and only 1 side has type_lin including 'Land' --> update partialLandCount
                // Since we know that both sides aren't lands, we can check the whole type_line for land to update partialLandCount
                if (card.type_line.includes('Land')) {
                    partialLandCount++;
                }
            }

            // Check if is nonCreature
            if (!card.type_line.includes('Creature') && (!frontType.includes('Land') || !backtype.includes('Land'))){
                nonCreatureCount++;
            }
        }
    }

    let partialLandSpan = null;
    if (partialLandCount > 0) {
        partialLandSpan = <span>{`(+${partialLandCount})`}</span>
    }

    return (
        <div className="deckHeader">
            {/* {`Total: ${totalCount} Land: ${landCount}`}{partialLandSpan} {`Creature: ${creatureCount} NonCreature: ${nonCreatureCount}`} */}
            <div className="total">Total: {totalCount}</div>
            <div className="landCount">Land: {landCount}{partialLandSpan}</div>
            <div className="creatureCount">Creatures: {creatureCount}</div>
            <div className="nonCreatureCount">Noncreatures: {nonCreatureCount}</div>
            <AddBasicsButton />
        </div>
    )
}

export default DeckHeader;
