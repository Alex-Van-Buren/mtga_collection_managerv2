import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCardModalContent, showCardModal } from '../../actions';
import makeKeyboardClickable from '../../hooks/makeKeyboardClickable';
import { addCardToDeck } from '../../actions';
import '../../css/CardListImage.css';

/**
 * 
 * @param {*} param0 
 * @returns 
 */
function CardListImage({
    card, index, cardHeader, cardClass="bouncy column", additionalFlipClass="", deckBuilder=false
}) {

    const { name, backside, type_line, oracle_text } = card;

    // Get redux dispatcher
    const dispatch = useDispatch();

    // Get image from redux if initialized
    const imgs = useSelector( ({displayOptions}) => displayOptions ? displayOptions.imageList[index] : null );

    // Track image side to be shown (front=true)
    const [imgSide, setImgSide] = useState(true);

    // Hover text to display when card is in the set view
    let fullText = !deckBuilder ? `${name}\n${type_line}\n${oracle_text}` : null;

    // Only double-sided cards will have two images, otherwise create one if the image is initialized
    let cardImages = imgs ? <CardSide src={imgs.front} name={name} title={fullText} /> : null;
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
    if (imgs && backside && backside.image_uris) {

        const backsideText = !deckBuilder ? `${name}\n${type_line}\n${backside.oracle_text}` : null;

        flipButton = (
            <button
                className={`circular ui icon button flipButton ${additionalFlipClass}`}
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
                aria-label="Flip Card" title="Flip Card"
            >
                <i className="undo icon" ref={flipRef}/>
            </button>
        );

        // Creating a front and backside
        cardImages = <>
            <CardSide src={imgs.front} name={name} title={fullText}     className="cardImg"/>
            <CardSide src={imgs.back}  name={name} title={backsideText} className="backside"/>
        </>;
    } 
    // Otherwise check if there is a "backside", but not flipable (Adventure cards fall in this category)
    else if (backside && imgs) {
        // Add backside text
        fullText = !deckBuilder ? `${fullText} // ${backside.oracle_text}` : null;

        // Redeclare cardImages because fullText has changed
        cardImages = <CardSide src={imgs.front} name={name} title={fullText} />;
    }

    const onClick = () => {
        if (!deckBuilder) {
            return (() => {

                // Get the index of the image on click
                dispatch( setCardModalContent({ index, imgSide }) );

                // Then show the modal
                dispatch( showCardModal(true) );
            })();
        } else { // deckBuilder === true
            return (() => {

                // Provide information about clicked card to deck via redux
                dispatch( addCardToDeck({ 
                    name: card.name, cmc: card.cmc, arenaId: card.arenaId, set: card.set, imgs: imgs, 
                    collector_number: card.collector_number
                }) );
            })();
        }
    }

    return (
        <div className={cardClass} tabIndex="0" onKeyDown={e => makeKeyboardClickable(e, cardRef)}>
            <div className="ui fluid card removeBoxShadow">
                <div className="content">
                    {cardHeader}
                </div>                    
                <div

                    ref={cardRef}
                
                    // Add flipped class when back image shown
                    className={imgSide ? "image" : "flipped image"}

                    // Display larger card image (modal) on click
                    onClick={onClick}
                >
                    {/* Display one image for regular cards, and two for double-faced cards */}
                    {cardImages}
                </div>
            </div>
            {flipButton}
        </div>
    );
}

// Helper Component - single spot to make changes cascade to all card images
function CardSide({ src, name, title=null, className=null }) {
    return (
        <img src={src} alt={name} aria-label={name} title={title} className={className} draggable='true' />
    );
}

export default CardListImage;
