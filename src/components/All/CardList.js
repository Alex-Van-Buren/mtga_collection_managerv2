import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import findCards from '../../data/findCards';
import CardListImage from '../SetDetails/CardListImage';
import { updateImageList } from '../../actions';
import '../../css/CardList.css';

/**
 * 
 * @param {string} [setId=null] (Optional) three letter set code. Can also specify using redux.
 * @returns Returns a grid of images of card in the set using filter options that are retrieved from redux store. Also displays the number
 * of cards owned by the user above each card image. 
 */
function CardList({ setId=null }) {
    
    // Get values from redux state
    const cardCollection = useSelector(state => state.inventory.cardCollection);
    const colors         = useSelector(state => state.displayOptions.colors);
    const searchTerm     = useSelector(state => state.displayOptions.searchTerm);
    const searchType     = useSelector(state => state.displayOptions.searchType);
    const rarities       = useSelector(state => state.displayOptions.rarity);
    const showCards      = useSelector(state => state.displayOptions.showCards);
    const cardCount      = useSelector(state => state.displayOptions.cardCount);
    const boosterVal     = useSelector(state => state.displayOptions.booster);
    const cmc            = useSelector(state => state.displayOptions.cmc);
    const cardSet        = useSelector(state => state.displayOptions.cardSet);

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

        // Determine if set passed in as prop or received from redux
        const set = setId ? setId : cardSet;
        
        // Check the cmc values for "Any" string and change them to undefined
        let searchcmc = {...cmc};

        if (searchcmc.min === 'Any') {
            searchcmc.min = undefined;
        }
        if (searchcmc.max === 'Any') {
            searchcmc.max = undefined;
        }
        
        // Put all search options into a single object for findCards function
        const searchOptions = {
            set: set, color: colors, booster: booster, rarity: rarityOption, term: searchTerm, 
            advancedSearchType: searchType, cmc: searchcmc
        };

        // Need to get images as well as name and arenaId
        const returnOptions = ['image_uris', 'type_line', 'oracle_text'];

        return findCards(searchOptions, returnOptions);
        
    }, [colors, searchTerm, searchType, setId, cardSet, rarities, boosterVal, cmc]);

    // Track currently shown pictures
    let currentPictures = [];

    // render the cards based on how many the user owns and the showCards option
    const renderCards = useMemo(() => {
        return cards.map( (card) => {

            // Get image from card
            const imgs = { front: card.image_uris.border_crop };

            // Check if backside exists
            if (card.backside && card.backside.image_uris) {
                imgs.back = card.backside.image_uris.border_crop;
            }

            // Get number of card owned, if any
            const numOwned = cardCollection && cardCollection[card.arenaId] ? 
                cardCollection[card.arenaId] : 0;

            // Initialize makeCard Boolean to false
            let makeCard = false;

            // Execute logic from showCards variable to determine whether card should be made
            if (( showCards === 'Show All Cards' )                         ||
                ( showCards === 'Own None' && numOwned === 0 )             ||
                ( showCards === 'Own at Least One' && numOwned  >  0 )     ||
                ( showCards === 'Missing at Least One' && numOwned  <  4 ) ||
                ( showCards === 'Own Full Playset' && numOwned === 4))
            {
                makeCard = true;
            }

            // Don't make card if showCards logic says not to
            if ( !makeCard ) {
                return null;
            }

            // Track images to be displayed
            currentPictures.push(imgs);

            // Build card header
            const cardHeader = <div className="right floated content" > {numOwned} / 4 </div>;

            // Build card JSX
            return (
                <CardListImage
                    name={card.name} backside={card.backside} index={currentPictures.indexOf(imgs)} key={card.arenaId}
                    type_line={card.type_line} oracle_text={card.oracle_text} 
                    cardHeader={cardHeader}
                />
            );
            
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardCollection, cards, showCards]);

    // Track card images displayed, but only update redux state after JSX done rendering
    useEffect( () => {
        dispatch(updateImageList(currentPictures));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderCards] );
    
    return (<>
        {/* Counter for number of cards being displayed */}
        <p id="displayingNumberCards">
            Displaying <span className="numCardsShown">{cardCount}</span> card(s):
        </p>

        {/* JSX for matching cards */}

        <div className="cardList-cards">
            {renderCards}  
        </div>
    </>);
}

export default CardList;