import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HoverPreview from '../Templates/HoverPreview';
import {
    setCardModalContent, showCardModal, addCardToDeck, addCardToSideboard, changeCommander, changeCompanion, setAddType
} from '../../actions';
import makeKeyboardClickable from '../../hooks/makeKeyboardClickable';
import isCardAddible from '../../hooks/isCardAddible';
import '../../css/CardListImage.css';

/**
 * Describes a single image from the CardList, including its backside if applicable.
 */
function CardListImage({
    card, index, cardHeader, cardClass="bouncy column", additionalFlipClass="", deckBuilder=false
}) {

    // Destructure the card properties needed for 
    const { name, backside, type_line, oracle_text } = card;

    // Get redux dispatcher
    const dispatch = useDispatch();

    // Get image from redux if initialized
    const imgs = useSelector( ({displayOptions}) => displayOptions ? displayOptions.imageList[index] : null );
    
    // Get deckList and deckType for use in deckbuilder
    const deckObj = useSelector((state) => state.deckBuilder.deckMap);
    const deckType = useSelector((state) => state.deckBuilder.deckType);
    const sideObj = useSelector((state) => state.deckBuilder.sideboardMap);
    const commander = useSelector((state) => state.deckBuilder.commander);

    // Choose which action to dispatch for deckbuilder
    const { addType } = useSelector(state => state.deckBuilder);

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

    const onClick = (e) => {
        if (!deckBuilder) {
            return (() => {
                // Get the index of the image on click
                dispatch( setCardModalContent({ index, imgSide }) );

                // Then show the modal
                dispatch( showCardModal(true) );
            })();
        }
        else { // deckBuilder === true

            // Forcefully reset timer
            setTimer(e);

            return (() => {

                if (isCardAddible(card, deckObj, sideObj, commander, deckType)) {

                    // Get card info to dispatch
                    const cardInfo = { 
                        name: card.name, cmc: card.cmc, arenaId: card.arenaId, set: card.set, imgs: imgs, 
                        collector_number: card.collector_number, type_line: type_line, legalities: card.legalities
                    };

                    // Choose action to dispatch to
                    switch (addType) {
                        case "deck":
                            dispatch(addCardToDeck(cardInfo));
                            break;
                        case "sideboard":
                            dispatch(addCardToSideboard(cardInfo));
                            break;
                        case "commander":
                            dispatch(changeCommander(cardInfo));
                            dispatch(setAddType("deck"));
                            break;
                        case "companion":
                            dispatch(changeCompanion(cardInfo));
                            dispatch(setAddType("deck"));
                            break;
                        default: break;
                    }
                }
            })();
        }
    }

    /**
     * Forcefully sets timer
     */
    function setTimer(e) {

        clearTimeout(timerID.current);
        setHoverPreview(null);

        // Set timers
        timerID.current = setTimeout(() => {
            
            // Check if timer is still valid
            if (timerID.current) {

                // Clear timers
                timerID.current = null;

                // Get target location
                const { top, bottom, left, right } = e.target.getBoundingClientRect();

                // Get screen height and width
                const {innerHeight, innerWidth} = window;

                // Hover preview dimensions
                const height = 350;
                const width = imgs.back ? 494.14 : 247.07;
                
                // TODO: Height calculations

                // Default position at upper left corner of card
                let x = left, y = top;

                // Shift image left if off screen to the right
                if (left + width > innerWidth) {
                    x = right - width;
                }

                // Make the hover preview
                setHoverPreview(<HoverPreview imgs={imgs} x={x} y={y} />);
            }

        }, 500);
    }

    // Track local timer
    const timerID = useRef(null);

    // State to render hover preview
    const [hoverPreview, setHoverPreview] = useState(null);

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

                    onClick={onClick}

                    onMouseOver={(e) => {

                        // Set timeout only if in deck builder and there isn't another timer waiting
                        if (deckBuilder && !timerID.current) {
                            setTimer(e);
                        }
                    }}
                    
                    onMouseLeave={() => {

                        if (deckBuilder) {

                            // Clear any local timer when mouse leaves
                            timerID.current = null;
                            clearTimeout(timerID.current);

                            // Clear the hover preview
                            setHoverPreview(null);
                        }
                    }}
                >
                    {/* Display one image for regular cards, and two for double-faced cards */}
                    {cardImages}

                    {hoverPreview}
                </div>
            </div>
            {flipButton}
        </div>
    );
}

export default CardListImage;

// Helper Component - single spot to make changes cascade to all card images
function CardSide({ src, name, title=null, className=null }) {
    return (
        <img src={src} alt={name} aria-label={name} title={title} className={className} draggable='true' />
    );
}
