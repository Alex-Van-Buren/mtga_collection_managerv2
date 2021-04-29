import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setModalContent, showModal } from '../../actions';
import '../../css/CardListImage.css';

function CardListImage({ card, numOwned, imgs, imgIndex }) {

    // Get redux dispatcher
    const dispatch = useDispatch();

    // Default image side to front (=true)
    const [imgSide, setImgSide] = useState(true);

    // Declare the flip button for double-sided cards and the default image to display
    let flipButton = null;
    let cardImages = (
        <img src={imgs.front} alt={card.name} className="front cardImg"/>
    );

    // Decide whether to show the flip button
    if (card.backside) {

        let frontClass = "";
        let backClass = "";
        let flipIconClass;
        let flipButtonClass = "circular ui icon button flipButton";

        // Choose flip icon to show and image class
        if (imgSide) { // front
            
            flipIconClass = "reply icon";
            flipButtonClass = "front " + flipButtonClass;
            backClass = "invisible " + backClass;

        }
        else { // back
    
            flipIconClass = "share icon";
            frontClass = "invisible " + frontClass;

        }
        
        flipButton = (
            <button
                class={flipButtonClass}
                onClick={(event) => {
                    event.stopPropagation();
                    setImgSide(!imgSide);
                }}
            >
                <i class={flipIconClass}/>
            </button>
        );

        // One image will be hidden
        cardImages = <>
            <img src={imgs.front} alt={card.name} className={frontClass}/>
            <img src={imgs.back} alt={card.name} className={backClass} />
        </>;
    }

    return (
        <div className="bouncy column">
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
            </div>
            {flipButton}
        </div>
    );
}

export default CardListImage;