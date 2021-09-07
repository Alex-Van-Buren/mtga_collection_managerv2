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
    
    // Destructure the card properties needed for 
    const { name, card_faces, type_line, imgs } = card;
    
    // Track image side to be shown (front=true)
    const [imgSide, setImgSide] = useState(true);
    
    // Only double-sided cards will have two images, otherwise create one if the image is initialized
    let cardImages = imgs ? <CardSide src={imgs.front} name={name} title={name} /> : null;
    let flipButton = null; // Regular cards don't have a flip button

    // CardInfo for dispatching to deck/sideboard/commander/companion
    const cardInfo = { 
        name: card.name, cmc: card.cmc, arenaId: card.arenaId, set: card.set, imgs: imgs, color_identity: card.color_identity,
        collector_number: card.collector_number, type_line: type_line, legalities: card.legalities, keywords: card.keywords
    };

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

    // Decide whether to show the flip button
    if (imgs && imgs.back && !deckBuilder) {

        flipButton = (
            <button
                className={'circular ui icon button flipButton'}
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
            <CardSide src={imgs.front} name={name} title={card_faces[0].name} className="cardImg"/>
            <CardSide src={imgs.back}  name={name} title={card_faces[1].name} className="backside"/>
        </>;
    } 
    // Otherwise check if there is a "backside", but not flipable (Adventure cards fall in this category)
    else if (imgs && imgs.back && !deckBuilder) {

        // Redeclare cardImages because fullText has changed
        cardImages = <CardSide src={imgs.front} name={name} title={name} />;
    }

    const onClick = (e) => {
        if (!deckBuilder) {

            // Get the index of the image on click
            dispatch( setCardModalContent({ index, imgSide }) );

            // Then show the modal
            dispatch( showCardModal(true) );
        }
        else { // deckBuilder === true

            // Choose action to dispatch to if there's enough room for the card
            if (isCardAddible) {

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
        }
    }

    const compose = (

        <div className={"bouncy column"} tabIndex="-1" onKeyDown={e => makeKeyboardClickable(e, cardRef)}>

            <div className="ui fluid card removeBoxShadow">
                <div className="content">
                    {/* Header differs between set and deck builder implementations */}
                    {cardHeader}
                </div>
                <div 
                    ref={cardRef} onClick={onClick} className={imgSide ? "image" : "flipped image"} tabIndex="0"
                    onDragStart={() => {
                        if (deckBuilder && isCardAddible) {
                            dispatch(setDragCard(cardInfo, 'collection', null))
                        }
                    }}
                    onDragEnd={() => {
                        if (deckBuilder) {
                            dispatch(setDragCard(null))
                        }
                    }}
                >
                    {/* Display one image for regular cards, and two for double-faced cards */}
                    {cardImages}

                </div>
            </div>
            {/* Flip button is null when not a double-sided card */}
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
