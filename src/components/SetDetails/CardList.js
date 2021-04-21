import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import findCards from '../../data/findCards';
import useResizeWidth from '../../hooks/useResizeWidth';
import { setModalContent, updateImageList, showModal } from '../../actions';
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
    const rarity         = useSelector(state => state.displayOptions.rarity);
    const showCards      = useSelector(state => state.displayOptions.showCards);

    // Access redux dispatch
    const dispatch = useDispatch();

    // Build array for color searchOption
   let colorOption = Object.keys(colors).flatMap( color => {
        if (colors[color]) {

            // Converting color text to single character used findCards
            switch(color) {                
                case 'white': return 'W';
                case 'blue':  return 'U';
                case 'black': return 'B';
                case 'red':   return 'R';
                case 'green': return 'G';
                default:      return color; 
            }            
        }
        // With flat map returning [] skips the element
        return [];
    });
    
    // Change colorOption to undefined if it is empty array in order for findCards to find all colors instead of only colorless
    if ( colorOption.length === 0) {
        colorOption = undefined;
    }
    
    // Get the cards using the findCards Function
    const cards = useMemo(() => {

        // If rarity is set to all, set rarityOption to undefined so findCards will not filter by rarity
        const rarityOption = rarity !== 'all' ? [rarity] : undefined;

        // Put all search options into a single object for findCards function
        const searchOptions = {set: setId, color: colorOption, booster: true, rarity: rarityOption, term: searchTerm};

        // Need to get images as well as name and arenaId
        const returnOptions = ['image_uris'];

        return findCards(searchOptions, returnOptions);
        
    }, [colorOption, searchTerm, setId, rarity]);

    // Track currently shown pictures
    let currentPictures = [];

    // render the cards based on how many the user owns and the showCards option
    const renderCards = useMemo(() => {
        return cards.map( (card) => {

            // Get image from card
            const img = card.image_uris.border_crop;

            // Get number of card owned, if any
            const numOwned = cardCollection && cardCollection[card.arenaId] ? 
                cardCollection[card.arenaId] : 0;

            // Initialize makeCard Boolean to false
            let makeCard = false;

            // Execute logic from showCards variable to determine whether card should be made
            if (( showCards === 'all' )                  ||
                ( showCards === '=0' && numOwned === 0 ) ||
                ( showCards === '>0' && numOwned > 0 )   ||
                ( showCards === '<4' && numOwned < 4 )   ||
                ( showCards === '=4' && numOwned === 4))
            {
                makeCard = true;
            }

            // Don't make card if showCards logic says not to
            if ( !makeCard ) {
                return null;
            }

            // Track images to be displayed
            currentPictures.push(img);

            // Build card JSX
            return (
                <div className="column" key={card.arenaId}>
                    <div className="ui fluid card removeBoxShadow">
                        <div className="content">
                            <div className="right floated content" >{numOwned} / 4 </div>
                        </div>                    
                        <div
                            className="image"
                            // Display larger card image on click
                            onClick={ () => {
                                // Get the index of the image on click
                                dispatch( setModalContent( currentPictures.indexOf(img) ) );
                                // Then show the modal
                                dispatch( showModal(true) );
                            } }
                        >
                            <img src={img} alt={card.name}/>
                        </div>
                    </div>
                </div>
            );
            
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardCollection, cards, dispatch, showCards]);

    // Track card images displayed, but only update redux state after JSX done rendering
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( () => dispatch(updateImageList(currentPictures)), [renderCards] );

    // Find optimal number of columns for card display based on screen width
    const width = useResizeWidth();

    // Calculate how many columns of cards to show
    let numCols = 'five';
    if      ( width < 640 )  numCols = 'two';
    else if ( width < 990 )  numCols = 'three';
    else if ( width < 1200 ) numCols = 'four';
    
    // Calculate number of card images being displayed
    const cardsDisplayedNum = (useSelector(state => state.displayOptions.imageList)).length;
    
    return (<>
        {/* Counter for number of cards being displayed */}
        <p className="ui container">
            Displaying <span className="numCardsShown">{cardsDisplayedNum}</span> card(s):
        </p>

        {/* JSX for matching cards */}
        <div className={`ui ${numCols} column grid container`}> 
            {renderCards}
        </div>
    </>);
}

export default CardList;