import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeCardFromSideboard, addCardToDeck } from '../../actions';
import findCards from '../../data/findCards';
import '../../css/LimitedSideboard.css';

/**
 * When the deckbuilder is in limited mode, it should change the cardList displayed to the sideboard
 * @returns JSX
 */
function LimitedSideboard() {
    const sideboardCards = useSelector(state => state.deckBuilder.sideboard);
    const { colors, rarity, cardTypes, searchTerm, searchType, cmc } = useSelector(state => state.displayOptions);
    const [sorting, setSorting] = useState('Color');

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
    const searchOptions = {color: colors, rarity: rarityOptions, cardTypes: searchCardTypes, term: searchTerm, advancedSearchType: searchType, cmc: searchcmc};
    // Use findCards to filter the sideboard cards
    const cardList = findCards(searchOptions, 'all', sideboardCards);

    // Sort the sideboard cards into arrays
    let col0 = [];
    let col1 = [];
    let col2 = [];
    let col3 = [];
    let col4 = [];
    let col5 = [];
    let col6 = [];
    let col7 = [];

    // Sort into CMC columns if sorting by cmc
    if ( sorting === 'CMC') {

        for (const card of cardList) {
            switch (card.cmc) {
                case 0:
                    col0.push(card); break;
                case 1:
                    col1.push(card); break;
                case 2:
                    col2.push(card); break;
                case 3:
                    col3.push(card); break;
                case 4:
                    col4.push(card); break;
                case 5:
                    col5.push(card); break;
                case 6:
                    col6.push(card); break;
                default:
                    col7.push(card); break;
            }
        }
    }

    // Sort into Color columns if sorting by color
    if (sorting === 'Color') {
        for (const card of cardList) {
            // Check how many colors the card has
            if ( card.color_identity.length === 1 ){
                switch ( card.color_identity[0]) {
                    case 'W':
                        col0.push(card); break;
                    case 'U':
                        col1.push(card); break;
                    case 'B':
                        col2.push(card); break;
                    case 'R':
                        col3.push(card); break;
                    case 'G':
                        col4.push(card); break;
                    default: 
                        break;
                }
            }
            else if ( card.color_identity.length > 1) {
                col5.push(card);
            }
            else if (card.color_identity.length === 0 ) {
                col6.push(card);
            }            
        }
    }
    
    return ( 
        <div className="limitedSideboard">
            <div className="limitedSideboard-header">
                <label htmlFor="sortButtons">Sort By:</label>
                <div className="sortButtons">
                    <button className={sorting === 'CMC' ? "sortCmc active": 'sortCmc'} 
                        onClick={() => setSorting('CMC')}>Mana Value
                    </button>
                    <button className={sorting === 'Color' ? "sortColor active": 'sortColor'} 
                        onClick={() => setSorting('Color')}>Color
                    </button>
                </div>
            </div>
            <div className="limitedSideboard-cards">
                <SideboardColumn cardArray={col0}/>
                <SideboardColumn cardArray={col1}/>
                <SideboardColumn cardArray={col2}/>
                <SideboardColumn cardArray={col3}/>
                <SideboardColumn cardArray={col4}/>
                <SideboardColumn cardArray={col5}/>
                <SideboardColumn cardArray={col6}/>
                <SideboardColumn cardArray={col7}/>
            </div>
        </div>
    )
}

/**
 * A helper react component to create a column of cards 
 * @returns JSX
 */
function SideboardColumn({cardArray}) {
    const dispatch = useDispatch();

    function moveToDeck(event, card) {
        event.stopPropagation();
        dispatch(removeCardFromSideboard(card));
        dispatch(addCardToDeck(card));
    }

    let renderColumn;
    if (cardArray.length >= 1) {
        renderColumn = cardArray.map( (card, i )=> {
            return (
                // Using DBDeckCard class from dbdeck
                <div className="DBDeckCard" key={card.name + i} 
                    onClick={(e) => moveToDeck(e, card)}
                >
                    <img
                        src={card.imgs.front} alt={card.name} 
                    />
                </div>
            )
        });

    }
    // Return nothing if there are no cards
    else {
        return null;
    }

    return (
        <div className="limitedSideboard-column">
            {renderColumn}
        </div>
    )
}

export default LimitedSideboard;
