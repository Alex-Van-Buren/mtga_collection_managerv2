import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CardListImage from './CardListImage';
import LazyLoad from '../Templates/LazyLoad';
import findCards from '../../data/findCards';
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
    const { cardCollection } = useSelector(state => state.inventory);

    const {
        colors, searchTerm, searchType, showCards, cardCount, cmcs,
        booster: boosterVal, set: reduxSets, cardTypes: reduxCardTypes, rarity: rarities,
    } = useSelector(state => state.displayOptions);

    const {
        deckMap, sideboardMap, commander, addBasics, deckType: reduxDeckType, addType,
    } = useSelector(state => state.deckBuilder);

    // Access redux dispatch
    const dispatch = useDispatch();
    
    // Get the cards using the findCards Function
    const cards = useMemo(() => {

        // If all/none of the rarities selected, set rarityOption to undefined so findCards will not filter by rarity
        let rarityOption = [];
        for (const rarity in rarities) {

            // Add rarity to rarityOption if it's selected
            if (rarities[rarity]) {
                rarityOption.push(rarity);
            }
        }

        // Set rarityOption to undefined if all or none of the rarities are added to it
        if (rarityOption.length < 1 || rarityOption.length > 3) {
            rarityOption = undefined;
        }
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
            if (reduxSets.length === 0 ) {
                set = undefined;

            // If reduxSets has info, they need be altered so that set is an array of 3 letter set codes
            } else {
                set = [];
                for ( const setObj of reduxSets) {
                    set.push(setObj.val)
                }
            }
        }
        
        // Make cardTypes retrieved from redux into a usable form for findCards
        // Currently is an array of objects --> Need just simple array

        let cardTypes = undefined; // Initialize as undefined for case where reduxcardTypes is empty

        if ( reduxCardTypes.length >= 1 ) {
            cardTypes = []; // Change to empty array to add push method 

            for (const cardType of reduxCardTypes) {
                // Only push the value property from reduxCardTypes into array
                cardTypes.push(cardType.val);
            }
        }

        // Make cmcs usuable for findCards
        let selectedCMCs = undefined;
        
        if ( cmcs.length >= 1 ) {
            selectedCMCs = [];
            
            for ( const cmc of cmcs) {
                selectedCMCs.push(cmc.val);
            }
        }

        // Set the decktype for searchOptions
        let deckType = reduxDeckType;
        // Ignore decktype when not in deckbuilder --> set to undefined
        // Also if the redux value for deckType is limited or custom --> set to undefined because those modes have no specific legalities
        if (!deckBuilder || reduxDeckType === 'limited' || reduxDeckType === 'custom') {
            deckType = undefined;
        }
        
        // Put all search options into a single object for findCards function
        let searchOptions = {
            set: set, color: colors, booster: booster, rarity: rarityOption, term: searchTerm,
            advancedSearchType: searchType, cmcs: selectedCMCs, deckType: deckType, cardTypes: cardTypes
        };

        if (deckBuilder) {
            
            // If we are in the deckbuilder and are adding basic lands, we need different searchOptions
            if (addBasics) {
                searchOptions = { ...searchOptions, excludeBasicLands: false, cmcs: undefined, rarity: undefined, cardTypes: undefined}
            }
            // addType is used to show only commanders or companions. Not used when searching basic lands
            else {
                searchOptions.addType = addType;
            }
        }
        
        return findCards(searchOptions);
        
    }, [boosterVal, setId, reduxCardTypes, cmcs, reduxDeckType, deckBuilder, colors, searchTerm, searchType, rarities, reduxSets, addBasics, addType]);

    // Track currently shown pictures
    let currentPictures = [];

    // Render cards based on how many the user owns using logic in 'showCards'
    const renderCards = useMemo(() => {
        let returnCards = [];
        for (const card of cards) {

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
            currentPictures.push(card.imgs);

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

                        // Get number of copies in deck and sideboard
                        let copiesInDeck = 0;

                        // Count the commander
                        if (commander && commander.arenaId === card.arenaId) {
                            copiesInDeck = 1;
                        }

                        // Count the copies in the main deck
                        if (deckMap[card.name] && deckMap[card.name][card.arenaId]) {
                            copiesInDeck += deckMap[card.name][card.arenaId].copies;
                        }
                        // Count the copies in the sideboard
                        if (sideboardMap[card.name] && sideboardMap[card.name][card.arenaId]) {
                            copiesInDeck += sideboardMap[card.name][card.arenaId].copies;
                        }

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
                    card={card} index={currentPictures.indexOf(card.imgs)} cardHeader={cardHeader} deckBuilder={deckBuilder}
                    // Unique key for cards with undefined arenaIds
                    key={card.arenaId ? card.arenaId : `${card.set}${card.collector_number}`}
                />
            );
            
        }
        return returnCards;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardCollection, cards, showCards, deckBuilder, deckMap, sideboardMap, commander]);

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
