import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HoverPreview from '../Templates/HoverPreview';
import { removeCardFromSideboard, addCardToDeck, limitedSort, setDragCard, dropCard, changeCompanion, setCurrentDragOver } from '../../actions';
import findCards from '../../data/findCards';
import '../../css/LimitedSideboard.css';

/**
 * When the deckbuilder is in limited mode, it should change the cardList displayed to the sideboard
 * @returns JSX
 */
function LimitedSideboard() {
    const dispatch = useDispatch();
    const { sideboard } = useSelector(state => state.deckBuilder);
    
    return ( 
        <div className="limitedSideboard">
            <div className="limitedSideboard-header">
                <label htmlFor="sortButtons">Sort By:</label>
                <div className="sortButtons">
                    <button className='sortCmc' 
                        onClick={() => dispatch(limitedSort('cmc'))}>Mana Value
                    </button>
                    <button className='sortColor'
                        onClick={() => dispatch(limitedSort('color'))}>Color
                    </button>
                </div>
            </div>
            <div className="limitedSideboard-cards">
                <SideboardColumn cardArray={sideboard[0]} col={0}/>
                <SideboardColumn cardArray={sideboard[1]} col={1}/>
                <SideboardColumn cardArray={sideboard[2]} col={2}/>
                <SideboardColumn cardArray={sideboard[3]} col={3}/>
                <SideboardColumn cardArray={sideboard[4]} col={4}/>
                <SideboardColumn cardArray={sideboard[5]} col={5}/>
                <SideboardColumn cardArray={sideboard[6]} col={6}/>
                <SideboardColumn cardArray={sideboard[7]} col={7}/>
            </div>
        </div>
    )
}

/**
 * A helper react component to create a column of cards 
 * @returns JSX
 */
function SideboardColumn({cardArray, col}) {
    const dispatch = useDispatch();
    const { colors, rarity, cardTypes, searchTerm, searchType, cmc } = useSelector(state => state.displayOptions);
    const { addType, currentDragOver } = useSelector(state => state.deckBuilder);
   
    // Create rarity search option from rarity object
    let rarityOptions = [];
    for (const option in rarity) {

        // Add rarity to rarityOption if it's selected
        if (rarity[option]) {
            rarityOptions.push(option);
        }
    }

    // Make cardTypes retrieved from redux into a usable form for findCards
    // Currently is an array of objects --> Need just simple array

    let searchCardTypes = undefined; // Initialize as undefined for case where reduxcardTypes is empty

    if ( cardTypes.length >= 1 ) {
        searchCardTypes = []; // Change to empty array to add push method 

        for (const cardType of cardTypes) {
            // Only push the value property from reduxCardTypes into array
            searchCardTypes.push(cardType.val);
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

    // Set rarityOption to undefined if all or none of the rarities are added to it
    if (rarityOptions.length < 1 || rarityOptions.length > 3) {
        rarityOptions = undefined;
    }

    // Make searchOptions object
    const searchOptions = {color: colors, rarity: rarityOptions, cardTypes: searchCardTypes, term: searchTerm, advancedSearchType: searchType, cmc: searchcmc, addType};
    // Use findCards to filter the sideboard cards
    const cardList = findCards(searchOptions, cardArray, false);

    function moveToDeck(event, card) {
        event.stopPropagation();
        dispatch(removeCardFromSideboard(card, col, cardArray.indexOf(card)));
        if (addType === 'deck'){
            dispatch(addCardToDeck(card));
        }
        if (addType === 'companion'){
            dispatch(changeCompanion(card));
        }
    }

    let renderColumn;
    renderColumn = cardList.map( (card, i )=> {
        let cardStyle = {};

        // Make style for dragging cards
        // Check if column is the same
        if (currentDragOver.section === 'sideboard' && currentDragOver.col === col){

            // Check if row is greater than current dragOver
            if (i > currentDragOver.row){
                cardStyle.transform = 'translateY(10px)';
            }
        }

        return (
            // Using DBDeckCard class from dbdeck
            <div className="DBDeckCard" key={card.name + i} 
                onClick={(e) => moveToDeck(e, card)}
            >
                <HoverPreview imgs={card.imgs}>
                    <img src={card.imgs.front} alt={card.name} style={cardStyle}
                    onDragStart={() => {
                        // Cannot use i as row index because if cards are filtered out the index may be incorrect
                        dispatch(setDragCard(card, 'sideboard', {col: col, row: cardArray.indexOf(card)}));
                    }}
                    onDragEnd={() => {
                        dispatch(setDragCard(null));
                    }}
                    onDrop={(e) => {
                        e.stopPropagation();
                        dispatch(dropCard('sideboard', {col: col, row: cardArray.indexOf(card)}));
                        dispatch(setCurrentDragOver());
                    }}
                    onDragEnter={(e) => {
                        e.stopPropagation();
                        dispatch(setCurrentDragOver('sideboard', col, cardArray.indexOf(card)));
                    }}
                    />
                </HoverPreview>
            </div>
        )
    });    

    return (
        // Using same styles as dbdeck
        <div className={currentDragOver.section === 'sideboard' && currentDragOver.col === col ? 
        'DBDeckColumn draggingOver' : 'DBDeckColumn'}
            onDrop={(e) => {
                e.stopPropagation();
                dispatch(dropCard('sideboard', {col: col, row: cardArray.length}));
                dispatch(setCurrentDragOver());
            }}
            onDragEnter={(e) => {
                e.stopPropagation();
                dispatch(setCurrentDragOver('sideboard', col, cardArray.length));
            }}
        >
            {/* Create a top element above the cards in each column */}
            <div className="firstElement"
                onDrop={(e) =>{
                    e.stopPropagation(); 
                    dispatch(dropCard('sideboard', {col: col, row: -1}))
                    dispatch(setCurrentDragOver());
                }}
                onDragEnter={(e) => {
                    e.stopPropagation();
                    dispatch(setCurrentDragOver('sideboard', col, -1));
                }}
                >
                    {cardList.length} 
                </div>
            {renderColumn}
        </div>
    )
}

export default LimitedSideboard;
