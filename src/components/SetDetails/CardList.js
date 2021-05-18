import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import findCards from '../../data/findCards';
import useResizeWidth from '../../hooks/useResizeWidth';
import CardListImage from './CardListImage';
import { updateImageList } from '../../actions';
import '../../css/CardList.css';

/**
 * 
 * @param {String} setId the three letter set Id code  
 * @returns Returns a grid of images of card in the set using filter options that are retrieved from redux store. Also displays the number
 * of cards owned by the user above each card image. 
 */
function CardList({ setId }) {
    
    // Get values from redux state
    const cardCollection = useSelector(state => state.inventory.cardCollection);
    const colors         = useSelector(state => state.displayOptions.colors);
    const searchTerm     = useSelector(state => state.displayOptions.searchTerm);
    const rarities       = useSelector(state => state.displayOptions.rarity);
    const showCards      = useSelector(state => state.displayOptions.showCards);
    const cardCount      = useSelector(state => state.displayOptions.cardCount);
    const boosterVal     = useSelector(state => state.displayOptions.booster);

    // Access redux dispatch
    const dispatch = useDispatch();
    
    // Get the cards using the findCards Function
    const cards = useMemo(() => {

        // If all/none of the rarities selected, set rarityOption to undefined so findCards will not filter by rarity
        let rarityOption = []; let index = 0;
        for (const rarity in rarities) {

            // Add rarity to rarityOption if it's selected
            if (rarities[rarity]) {
                rarityOption[index] = rarity;
                index++;
            }
        }

        // Set rarityOption to undefined if all or none of the rarities are added to it
        if (rarityOption.length < 1 || rarityOption.length > 3)
            rarityOption = undefined;

        // Set booster to true, false, or undefined based on the value in redux
        let booster;
        switch (boosterVal) {
            case "In Boosters":
                booster = true;
                break;
            case "Not In Boosters":
                booster = false;
                break;
            case "All Cards":
                booster = undefined;
                break;
            default:
                break;
        }

        // Put all search options into a single object for findCards function
        const searchOptions = {set: setId, color: colors, booster: booster, rarity: rarityOption, term: searchTerm};

        // Need to get images as well as name and arenaId
        const returnOptions = ['image_uris'];

        return findCards(searchOptions, returnOptions);
        
    }, [colors, searchTerm, setId, rarities, boosterVal]);

    // Track currently shown pictures
    let currentPictures = [];

    // render the cards based on how many the user owns and the showCards option
    const renderCards = useMemo(() => {
        return cards.map( (card) => {

            // Get image from card
            const imgs = { front: card.image_uris.border_crop };

            // Check if backside exists
            if (card.backside) {
                imgs.back = card.backside.image_uris.border_crop;
            }

            // Get number of card owned, if any
            const numOwned = cardCollection && cardCollection[card.arenaId] ? 
                cardCollection[card.arenaId] : 0;

            // Initialize makeCard Boolean to false
            let makeCard = false;

            // Execute logic from showCards variable to determine whether card should be made
            if (( showCards === 'all' )                  ||
                ( showCards === '=0' && numOwned === 0 ) ||
                ( showCards === '>0' && numOwned  >  0 ) ||
                ( showCards === '<4' && numOwned  <  4 ) ||
                ( showCards === '=4' && numOwned === 4))
            {
                makeCard = true;
            }

            // Don't make card if showCards logic says not to
            if ( !makeCard ) {
                return null;
            }

            // Track images to be displayed
            currentPictures.push(imgs);

            // Build card JSX
            return (
                <CardListImage name={card.name} backside={card.backside} numOwned={numOwned} index={currentPictures.indexOf(imgs)} key={card.arenaId}/>
            );
            
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardCollection, cards, showCards]);

    // Track card images displayed, but only update redux state after JSX done rendering
    useEffect( () => {
        dispatch(updateImageList(currentPictures));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderCards] );

    // Get width
    const width = useResizeWidth();
    
    // Find optimal number of columns for card display based on screen width
    // Locking aspect ratio at 250px by 350px, allowing for margin
    const numCols = useMemo(() => {

        // Turing parameters
        const MIN_CARD_WIDTH = 225; // Min card width in px
        const MARGIN_DECIMAL = 0.10; // Percent margin on left or right / 100
        
        // Number of cards shown = (width - 2*margin) / minumum card width rounded down
        let numCards = Math.floor(width * (1 - 2*MARGIN_DECIMAL) / MIN_CARD_WIDTH);

        // Ensure at least one card is shown
        if (numCards < 1) numCards = 1;

        // Map the number onto a class (zero is a placeholder for indexing)
        const numberWords = ['zero','one','two','three','four','five','six','seven','eight','nine', 'ten'];
        
        return numberWords[numCards];

    }, [width]);
    
    return (<>
        {/* Counter for number of cards being displayed */}
        <p className="ui container">
            Displaying <span className="numCardsShown">{cardCount}</span> card(s):
        </p>

        {/* JSX for matching cards */}
        <div className={`ui ${numCols} column grid container`}>
            {renderCards}
        </div>
    </>);
}

export default CardList;