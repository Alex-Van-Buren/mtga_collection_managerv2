import React from 'react';
import { useSelector } from 'react-redux';
import findCards from '../data/findCards';




function CardList( {setId} ) {
    
    const cardCollection = useSelector(state => state.inventory.cardCollection);

    // TODO: These Options will need to be retrived from redux hard coded for now    
    const searchOptions = {set: setId, color: ['B'], booster: true};

    // Need to get images as well as name and arenaId
    const returnOptions = ['image_uris'];

    // Get the cards using the findCards Function
    const cards = findCards(searchOptions, returnOptions);
    // console.log(cards);

    function renderCards(cards) {
        const renderedCards = cards.map( (card) => {
            const img = card.image_uris.normal;
            
            // Make sure cardCollection is defined
            let numOwned = 0;
            if ( cardCollection && cardCollection[card.arenaId]) {
                numOwned = cardCollection[card.arenaId];
            } 
            
            return (
                <div className="column" key={card.arenaId}>
                    <div className="ui fluid card">
                        <div className="content">
                            <div className="right floated content" >{numOwned} / 4 </div>
                        </div>                    
                        <div className="image">
                            <img src={img} alt={card.name}/>
                        </div>
                    </div>
                </div>
            )    
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