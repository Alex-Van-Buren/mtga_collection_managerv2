import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCardModalContent, showCardModal } from '../../actions';
import makeKeyboardClickable from '../../hooks/makeKeyboardClickable';
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
    let cardImages = imgs? <img src={imgs.front} alt={name} loading="lazy"/> : null;
    let flipButton = null; // Regular cards don't have a flip button

    // Refs
    const flipRef = useRef();
    const cardRef = useRef();

    /**
     * Flips card and turns flip button
     * @param {Event} event 
     */
    function flip(event) {

        // Don't allow flip button click to propagate onto card
        event.stopPropagation();
        
        // Set state for card side displayed
        setImgSide(!imgSide);

        // Animate flip button
        if (imgSide)
            flipRef.current.style.animation = "turned .6s linear";
        else
            flipRef.current.style.animation = "turning .6s linear";
    }

    // Decide whether to show the flip button
    if (backside && imgs) {

        flipButton = (
            <button
                className="circular ui icon button flipButton"
                onClick={e => flip(e)}
                onKeyDown={e => {
                    // If they hit enter
                    if (e.key === "Enter" || e.key === "Space") {

                        // Prevent the default action
                        e.preventDefault(); 

                        // And flip card
                        flip(e);
                    }
                }}
            >
                <i className="undo icon" ref={flipRef}/>
            </button>
        );

        // One image will be hidden
        cardImages = <>
            <img src={imgs.front} alt={name} className="cardImg" loading="lazy"/>
            <img src={imgs.back} alt={name} className="backside" loading="lazy"/>
        </>;
    }

    return (
        <div className="bouncy column" tabIndex="0" onKeyDown={e => makeKeyboardClickable(e, cardRef)}>
            <div className="ui fluid card removeBoxShadow">
                <div className="content">
                    <div className="right floated content" >{numOwned} / 4 </div>
                </div>                    
                <div

                    ref={cardRef}
                
                    // Add flipped class when back image shown
                    className={imgSide ? "image" : "flipped image"}

                    // Display larger card image (modal) on click
                    onClick={ () => {

                        // Get the index of the image on click
                        dispatch( setCardModalContent({ index, imgSide }) );

                        // Then show the modal
                        dispatch( showCardModal(true) );
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