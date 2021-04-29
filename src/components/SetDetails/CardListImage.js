import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setModalContent, showModal } from '../../actions';
import '../../css/CardListImage.css';

function CardListImage({ card, numOwned, imgs, imgIndex }) {

    // Get redux dispatcher
    const dispatch = useDispatch();

    // Default image side to front (=true)
    const [imgSide, setImgSide] = useState(true);

    let flipButton = null;
    let flipIconClass;

    let frontClass = "front cardImg";

    let cardImages = (
        <img src={imgs.front} alt={card.name} className={frontClass}/>
    );

    // Decide whether to show the flip button
    if (card.backside) {

        let backClass = "back cardImg";

        // Choose flip icon to show and image class
        if (imgSide) { // front
            
            flipIconClass = "reply icon";
            backClass = "invisible " + backClass;

        }
        else { // back
    
            flipIconClass = "share icon";
            frontClass = "invisible " + frontClass;

        }
        
        flipButton = (
            <button
                class="circular ui icon button"
                onClick={() => setImgSide(!imgSide)}
            >
                <i class={flipIconClass}/>
            </button>
        );

        cardImages = <>
            <img src={imgs.front} alt={card.name} className={frontClass}/>
            <img src={imgs.back} alt={card.name} className={backClass} />
        </>;
    }

    return (
        <div className="column">
            <div className="ui fluid card removeBoxShadow">
                <div className="content">
                    <div className="right floated content" >{numOwned} / 4 </div>
                </div>                    
                <div
                    className="image"

                    // Display larger card image on click
                    onClick={ () => {
                        // Get the index of the image on click
                        dispatch( setModalContent( imgIndex ) );
                        // Then show the modal
                        dispatch( showModal(true) );
                    } }
                >
                    {/* Display one image for regular cards, and two for double-faced cards */}
                    {cardImages}
                </div>
                {flipButton}
            </div>
        </div>
    );
}

export default CardListImage;