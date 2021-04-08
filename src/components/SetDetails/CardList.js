import React from 'react';
import { useSelector } from 'react-redux';
import findCards from '../../data/findCards';

import '../../css/CardList.css';


function CardList( {setId} ) {
    
    const cardCollection = useSelector(state => state.inventory.cardCollection);

    const colors = useSelector(state => state.detailsOptions.colors);

    // Build array for color searchOption
   let colorOption = Object.keys(colors).flatMap( color => {
        if (colors[color]) {

            // Converting color text to single character used findCards
            switch(color) {
                case 'white':
                    return 'W';
                case 'blue':
                    return 'U';
                case 'black':
                    return 'B';
                case 'red':
                    return 'R';
                case 'green':
                    return 'G';
                default:
                    return color; 
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
    const searchOptions = {set: setId, color: colorOption, booster: true, rarity: rarityOption};

    // Need to get images as well as name and arenaId
    const returnOptions = ['image_uris'];

    // Get the cards using the findCards Function
    const cards = findCards(searchOptions, returnOptions);
    // console.log(cards);

    // Get the showCards to know which cards to show
    const showCards = useSelector(state => state.detailsOptions.showCards);

    function renderCards(cards) {
        const renderedCards = cards.map( (card) => {
            const img = card.image_uris.normal;
            
            // Make sure cardCollection is defined
            let numOwned = 0;
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

                return (
                    <div className="column" key={card.arenaId}>
                        <div className="ui fluid card removeBoxShadow">
                            <div className="content">
                                <div className="right floated content" >{numOwned} / 4 </div>
                            </div>                    
                            <div className="image">
                                <img src={img} alt={card.name}/>
                            </div>
                        </div>
                    </div>
                )    
            }
            return null;
        })
        return renderedCards;
    }

    

    return (
        <>
            {renderCards(cards)}
        </>
    );
}



export default CardList;