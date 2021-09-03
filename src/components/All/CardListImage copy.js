import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HoverPreview from '../Templates/HoverPreview';
import {
    setCardModalContent, showCardModal, addCardToDeck, addCardToSideboard, changeCommander, changeCompanion, setAddType, setDragCard
} from '../../actions';
import makeKeyboardClickable from '../../hooks/makeKeyboardClickable';
import isCardAddible from '../../hooks/isCardAddible';
import '../../css/CardListImage.css';

/**
 * Describes a single image from the CardList, including its backside if applicable.
 */
function CardListImage({ card, index, cardHeader, deckBuilder=false }) {

    const dispatch = useDispatch();
    const cardRef = useRef();
    const flipRef = useRef();
    
    // Get deckList and deckType for use in deck  builder
    const { deckMap, sideboardMap, commander, deckType, addType } = useSelector(state => state.deckBuilder);

    // Check if card is valid to add in deck builder
    let valid = false;
    if (deckBuilder) {
        if (deckMap !== undefined && sideboardMap !== undefined && commander !== undefined && deckType !== undefined) {
            valid = isCardAddible(card, deckMap, sideboardMap, commander, deckType);
        }
    }

    // Track image side to be shown (front=true)
    const [imgSide, setImgSide] = useState(true);

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
            flipRef.current.style.animation = "rotate1 .6s linear";
        else
            flipRef.current.style.animation = "rotate2 .6s linear";
    }

    const onClick = (e) => {

        // In the set view, clicking opens the card modal
        if (!deckBuilder) {

            dispatch( setCardModalContent({ index, imgSide }) );
            dispatch( showCardModal(true) );
        }
        // In the deck builder, clicking adds the card to the deck, sideboard, etc.
        else { // deckBuilder === true

            // Choose action to dispatch to
            if (valid) {
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
    }
    
    const compose = (

        <div className={"bouncy column"} tabIndex="-1" onKeyDown={e => makeKeyboardClickable(e, cardRef)}>

            <div className="ui fluid card removeBoxShadow">
                <div className="content">
                    {/* Header differs between set view and deck builder */}
                    {cardHeader}
                </div>
                <div ref={cardRef} onClick={onClick} className={imgSide ? "image" : "flipped image"} tabIndex="0"
                    onDragStart={() =>{
                        if (deckBuilder && valid) {
                            dispatch(setDragCard(card, 'collection', null))
                        }
                    }}
                    onDragEnd={() => {
                        if (deckBuilder) {
                            dispatch(setDragCard(null));
                        }
                    }}
                >
                    {/* Display one image for regular cards, and two for double-faced cards */}
                    <CardSide src={card.imgs.front} className={card.imgs.back ? "cardImg" : null}/>
                    {card.imgs.back ? <CardSide src={card.imgs.back} className="backside"/> : null}
                </div>
            </div>
            {/* Flip button is null when not a double-sided card */}
            {(card.imgs.back && !deckBuilder) ? (
                <button
                    className={'circular ui icon button flipButton'} aria-label="Flip Card" title="Flip Card"
                    onClick={e => flip(e)}
                    onKeyDown={e => { if (e.key === "Enter" || e.key === "Space") {
                        e.preventDefault();
                        flip(e);
                    }}}
                >
                    <i className="undo icon" ref={flipRef}/>
                </button>
            ) : null}

        </div>
    );

    // Return the card images wrapped in the hover preview if in deckbuilder
    if (deckBuilder) {
        return (
            // Show preview when hovering
            <HoverPreview imgs={card.imgs}>
                {compose}
            </HoverPreview>
        );
    }

    return compose;

    // Helper Component - makes defining card images simpler
    function CardSide({ src, className=null }) {
        return (
            <img 
                src={src} className={className} alt={card.name} aria-label={card.name} draggable='true'
                title={!deckBuilder ? card.name : null}
            />
        );
    }
}

export default CardListImage;
