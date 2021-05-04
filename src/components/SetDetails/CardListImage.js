import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setModalContent, showModal } from '../../actions';
import '../../css/CardListImage.css';

function CardListImage({ name, backside, numOwned, index }) {

    // Get redux dispatcher
    const dispatch = useDispatch();

    // Get image from redux
    const imgs = useSelector(state => {

        // Return the image only when initialized
        return (state.displayOptions.imageList)?
            state.displayOptions.imageList[index] : null;
    });

    // Track image side to be shown (front=true)
    const [imgSide, setImgSide] = useState(true);

    // Only double-sided cards will have two images, otherwise create one if the image is initialized
    let cardImages = imgs? <img src={imgs.front} alt={name}/> : null;
    let flipButton = null; // Regular cards don't have a flip button

    // Decide whether to show the flip button
    if (backside && imgs) {

        // Choose flip icon to show based on side showing
        const flipIconClass = imgSide? "reply icon" : "flipped reply icon";

        flipButton = (
            <button
                className="circular ui icon button flipButton"
                onClick={(event) => { event.stopPropagation(); setImgSide(!imgSide); }}
            >
                <i className={flipIconClass}/>
            </button>
        );

        // One image will be hidden
        cardImages = <>
            <img src={imgs.front} alt={name} className="cardImg"/>
            <img src={imgs.back} alt={name} className="backside"/>
        </>;
    }

    return (
        <div className="bouncy column">
            <div className="ui fluid card removeBoxShadow">
                <div className="content">
                    <div className="right floated content" >{numOwned} / 4 </div>
                </div>                    
                <div
                
                    // Add flipped class when back image shown
                    className={imgSide ? "image" : "flipped image"}

                    // Display larger card image (modal) on click
                    onClick={ () => {

                        // Get the index of the image on click
                        dispatch( setModalContent({ index, imgSide }) );

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