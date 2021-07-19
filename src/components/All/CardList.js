import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import findCards from '../../data/findCards';
import CardListImage from './CardListImage';
import LazyLoad from '../Templates/LazyLoad';
import { updateImageList } from '../../actions';
import '../../css/CardList.css';

/**
 * The list of MTG Arena cards.
 * 
 * @param {string} [setId=null] (Optional) three letter set code. Can also specify using redux.
 * @param {string} [scrollingParent=null] (Optional) Specify this string if the element that scrolls is not the window.
 * Input to document.querySelector() that selects the scrolling parent of CardList.
 * @returns Returns a grid of images of card in the set using filter options that are retrieved from redux store. Also displays 
 * the number of cards owned by the user above each card image. 
 */
function CardList({ setId=null, scrollingParent=null, deckBuilder }) {
    
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
    const reduxSets      = useSelector(state => state.displayOptions.set);
    const deckMap        = useSelector(state => state.deckBuilder.deckMap);
    const reduxdeckType  = useSelector(state => state.deckBuilder.deckType);

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
        // Initialize set variable for use in searchOptions
        let set;
        // If a single SetId is provided --> use it
        if (setId) {
            set = setId;

            // Otherwise get value(s) from redux 
        } else {

            // If the redux value is empty, set = undefined so that findcards will disregard filtering by set
            if (reduxSets.length === 0 ){
                set = undefined;

            // If reduxSets has info, they need be altered so that set is an array of 3 letter set codes
            } else {
                set = [];
                for ( const setObj of reduxSets) {
                    set.push(setObj.val)
                }
            }
        }
        
        
        // Check the cmc values for "Any" string and change them to undefined
        let searchcmc = {...cmc};

        if (searchcmc.min === 'Any') {
            searchcmc.min = undefined;
        }
        if (searchcmc.max === 'Any') {
            searchcmc.max = undefined;
        }

        // Set the decktype for searchOptions
        let deckType = reduxdeckType;
        // Ignore decktype when not in deckbuilder --> set to undefined
        // Also if the redux value for deckType is limited or custom --> set to undefined because those modes have no specific legalities
        if (!deckBuilder || reduxdeckType === 'limited' || reduxdeckType === 'custom') {
            deckType = undefined;
        }
        
        // Put all search options into a single object for findCards function
        const searchOptions = {
            set: set, color: colors, booster: booster, rarity: rarityOption, term: searchTerm, 
            advancedSearchType: searchType, cmc: searchcmc, deckType: deckType
        };

        // Need to get images as well as name and arenaId
        const returnOptions = ['image_uris', 'type_line', 'oracle_text', 'cmc', 'collector_number', 'set', 'legalities'];

        return findCards(searchOptions, returnOptions);
        
    }, [colors, searchTerm, searchType, setId, reduxSets, rarities, boosterVal, cmc, deckBuilder, reduxdeckType]);

    // Track currently shown pictures
    let currentPictures = [];

    // Render cards based on how many the user owns using logic in 'showCards'
    const renderCards = useMemo(() => {
        let returnCards = [];
        for (const card of cards) {

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
                continue;
            }

            // Track images to be displayed
            currentPictures.push(imgs);

            // Build card header
            let cardHeader;

            // Normally cardHeader is just the number of cards owned out of a max of 4
            if (!deckBuilder) {
                
                cardHeader = <div className="right floated content" > {numOwned} / 4 </div>;
            }
            
            // In the deck builder, the card header indicates how many are owned as well as how many copies are in the deck
            else {
                // <i className="circle icon"/>

                // Circles are filled if owned and colored if added to deck
                const circles = (() => {
                    let temp = [];

                    // Circles are declared left to right, but, if owned, filled right to left
                    for (let i=0; i<4; i++) {

                        // Initially assume circle is filled (owned copy of card)
                        let circleClass = 'icon circle';

                        // Check if circle should be an outline (not owned copy of card)
                        if (i >= numOwned) {
                            circleClass += ' outline';
                        }

                        // Get number of copies in deck
                        const copiesInDeck = deckMap[card.name] && deckMap[card.name][card.arenaId] ? 
                            deckMap[card.name][card.arenaId].copies : 0;

                        // Color circles for number of cards in deck
                        if (copiesInDeck && i < copiesInDeck) {
                            circleClass += ' inDeck';
                        }

                        // Add circle to temp array
                        temp.push(<i className={circleClass} key={`cir${i}_${card.arenaId}`}/>)
                    }
                    return temp;
                })();


                cardHeader = <div className="deckBuilder_circles">
                    {circles}
                </div>;
            }

            // Build card JSX
            returnCards.push(
                <CardListImage
                    card={card} index={currentPictures.indexOf(imgs)} key={card.arenaId}
                    cardHeader={cardHeader} deckBuilder={deckBuilder}
                />
            );
            
        }
        return returnCards;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardCollection, cards, showCards, deckBuilder, deckMap]);

    // Track card images displayed, but only update redux state after JSX done rendering
    useEffect( () => {
        dispatch(updateImageList(currentPictures));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderCards] );
    
    // Declare card dimensions for lazy loading
    let width, height, gap, buffer, viewWidthFn;
    if (deckBuilder) {
        width = 160;
        height = 257.5;
        gap = 10;
        buffer = 4;
        viewWidthFn = viewWidth => viewWidth - 10;
    } else {
        width = 225;
        height = 351.75;
        gap = 20;
        buffer = 3;
        viewWidthFn = viewWidth => viewWidth - 17;
    }

    return (<>
        {/* Counter for number of cards being displayed */}
        {!deckBuilder ? <p id="displayingNumberCards">
            Displaying <span className="numCardsShown">{cardCount}</span> card(s):
        </p> : null}

        {/* JSX for matching cards */}
        <div className="cardList-cards" >
            <LazyLoad 
                childWidth={width} childHeight={height} gap={gap} buffer={buffer}
                scrollingParent={scrollingParent} viewWidthFn={viewWidthFn}
            >
                {renderCards}
            </LazyLoad>
        </div>
    </>);
}

export default CardList;
