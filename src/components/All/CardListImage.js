import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HoverPreview from '../Templates/HoverPreview';
import {
    setCardModalContent, showCardModal, addCardToDeck, addCardToSideboard, changeCommander, changeCompanion, setAddType, setDragCard
} from '../../actions';
import makeKeyboardClickable from '../../hooks/makeKeyboardClickable';
import useIsCardAddible from '../../hooks/useIsCardAddible';
import '../../css/CardListImage.css';

/**
 * Describes a single image from the CardList, including its backside if applicable.
 */
function CardListImage({ card, index, cardHeader, deckBuilder=false }) {
    
    const flipRef = useRef();
    const cardRef = useRef();
    const dispatch = useDispatch();
    
    const { addType } = useSelector(state => state.deckBuilder);

    const isCardAddible = useIsCardAddible(card);
    
    // Destructure card properties for ease of access
    const { name, card_faces, imgs } = card;
    
    // Track image side to be shown (front=true)
    const [ imgSide, setImgSide ] = useState(true);
    
    // Variables that differ between the set view and the deck builder
    let cardImages;
    let flipButton = null; // Regular cards don't have a flip button
    let onClick, onDragStart=null, onDragEnd=null;

    /* Deck Builder */
    if (deckBuilder) {
        cardImages = <CardSide src={imgs.front} name={name} />; // No title because of hover preview

        // Clicking will move the card from the card list to the desired portion of the deck
        onClick = (e) => {

            if (isCardAddible) {
                switch (addType) {
                    case "deck":
                        dispatch(addCardToDeck(card));
                        break;
                    case "sideboard":
                        dispatch(addCardToSideboard(card));
                        break;
                    case "commander":
                        dispatch(changeCommander(card));
                        dispatch(setAddType("deck"));
                        break;
                    case "companion":
                        dispatch(changeCompanion(card));
                        dispatch(setAddType("deck"));
                        break;
                    default: break;
                }
            }
        }

        onDragStart=() => {
            if (isCardAddible) {
                dispatch(setDragCard(card, 'collection', null));
            }
        }
        onDragEnd=() => {
            dispatch(setDragCard(null));
        }
    }
    
    /* Set View */
    else {

        // Clicking opens a modal to a larger view of the card
        onClick = () => {
            
            // Get the index of the image on click
            dispatch( setCardModalContent({ index, imgSide }) );
            
            // Then show the modal
            dispatch( showCardModal(true) );
        }

        // Show flip button for 2-sided cards
        if (imgs.back) {

            flipButton = (
                <button
                    className={'circular ui icon button flipButton'}
                    onClick={e => flip(e)}
                    onKeyDown={e => {
                        // If they hit enter
                        if (e.key === "Enter" || e.key === "Space") {

                            // Enter and space shouldn't do their default actions, just flip the card
                            e.preventDefault();
                            flip(e);
                        }
                    }}
                    aria-label="Flip Card" title="Flip Card"
                >
                    <i className="undo icon" ref={flipRef}/>
                </button>
            );

            // Separate/create front and back cards
            cardImages = <>
                <CardSide src={imgs.front} name={name} title={card_faces[0].name} className="cardImg"/>
                <CardSide src={imgs.back}  name={name} title={card_faces[1].name} className="backside"/>
            </>;
        }
        // No back, so only make one img tag
        else {
            cardImages = <CardSide src={imgs.front} name={name} title={name}/>; // Includes title
        }

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
            if (imgSide) {
                flipRef.current.style.animation = "rotate1 .6s linear";
            } else {
                flipRef.current.style.animation = "rotate2 .6s linear";
            }
        }
    }
    
    // Putting all the pieces together except the hover preview for the deck builder
    const compose = (

        <div className={"bouncy column"} tabIndex="-1" onKeyDown={e => makeKeyboardClickable(e, cardRef)}>

            <div className="ui fluid card removeBoxShadow">

                <div className="content">
                    {cardHeader}
                </div>

                <div 
                    className={imgSide ? "image" : "flipped image"} ref={cardRef} tabIndex="0"
                    onClick={onClick} onDragStart={onDragStart} onDragEnd={onDragEnd}
                >
                    {cardImages}
                </div>
            </div>
            {flipButton}
        </div>
    );

    // Return the card images wrapped in the hover preview if in deckbuilder
    if (deckBuilder) {
        return (
            // Show preview when hovering
            <HoverPreview imgs={imgs}>
                {compose}
            </HoverPreview>
        );
    }
    // Other wise just return card images
    return compose;
}

export default CardListImage;

/** Helper Component - makes defining card images simpler */
function CardSide({ src, name, title=null, className=null }) {
    return <img src={src} alt={name} aria-label={name} title={title} className={className} draggable='true' />;
}
