import React, { useEffect } from 'react';
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
function CardList( {setId} ) {
    
    const cardCollection = useSelector(state => state.inventory.cardCollection);

    const colors = useSelector(state => state.detailsOptions.colors);

    const searchTerm = useSelector(state => state.detailsOptions.searchTerm);

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

    // Get rarity selected from redux
    const rarity = useSelector(state => state.detailsOptions.rarity);

    let rarityOption = [rarity];
    // if rarity is set to all, change rarityOption to undefined so findCards will not filter by rarity
    if ( rarity === 'all' ){
        rarityOption = undefined;
    }    
    
    // Put all search options into a single object for findCards function
    const searchOptions = {set: setId, color: colorOption, booster: true, rarity: rarityOption, term: searchTerm};

    // Need to get images as well as name and arenaId
    const returnOptions = ['image_uris'];

    // Get the cards using the findCards Function
    const cards = findCards(searchOptions, returnOptions);

    // Get the showCards to know which cards to show
    const showCards = useSelector(state => state.detailsOptions.showCards);

    // Initialize number of cards shown with specified options
    let numCardsShown = 0;

    // Track currently shown pictures
    let currentPictures = [];

    // render the cards based on how many the user owns and the showCards option
    const renderedCards = cards.map( (card) => {

        const img = card.image_uris.border_crop;
        let numOwned = 0;

        // Make sure cardCollection is defined
        if ( cardCollection && cardCollection[card.arenaId]) {
            numOwned = cardCollection[card.arenaId];
        } 
        // Initialize makeCard Boolean to false
        let makeCard = false;
        if ( showCards === 'all' ) {
            makeCard = true;
        }

        else if ( showCards === '=0' && numOwned === 0 ) {
            makeCard = true;
        }

        else if ( showCards === '>0' && numOwned >0 ) {
            makeCard =  true;
        }

        else if ( showCards === '<4' && numOwned <4 ) {
            makeCard = true;
        }

        else if ( showCards === '=4' && numOwned === 4) {
            makeCard = true;
        }        

        if ( makeCard ) {
            numCardsShown++;
            currentPictures.push(img);
            return (
                <div className="column" key={card.arenaId}>
                    <div className="ui fluid card removeBoxShadow">
                        <div className="content">
                            <div className="right floated content" >{numOwned} / 4 </div>
                        </div>                    
                        <div
                            className="image"
                            onClick={() => {
                                // Get the index of the image on click
                                dispatch( setModalContent( currentPictures.indexOf(img) ) );
                                // Then show the modal
                                dispatch( showModal(true) );
                            }}
                        >
                            <img src={img} alt={card.name}/>
                        </div>
                    </div>
                </div>
            )    
        }
        return null;
    }); // end of the renderedCards map

    // Update list of current images only once renderedCards has finished
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( () => dispatch(updateImageList(currentPictures)), [renderedCards] );

    // Find optimal number of columns for card display based on screen width
    const width = useResizeWidth();

    // initialize number of columns to five for full width screen
    let numCols = 'five';
    if ( width < 640 ) 
        numCols = 'two';
    else if ( width < 990 )
        numCols = 'three';
    else if ( width < 1200 )
        numCols = 'four';
    
    return (
        <>
            <p className="ui container">Displaying <span className="numCardsShown">{numCardsShown}</span> card(s):</p>
            <div className={`ui ${numCols} column grid container`}> 
                {renderedCards}
            </div>
        </>
    );
}



export default CardList;