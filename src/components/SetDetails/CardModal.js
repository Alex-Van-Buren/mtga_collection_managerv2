import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { showModal, setModalContent } from '../../actions';
import '../../css/CardModal.css';

function CardModal() {
    const dispatch = useDispatch();

    const show      = useSelector(state => state.modal.showModal);
    const index     = useSelector(state => state.modal.content);
    const { img, imgLength } = useSelector(({ displayOptions: {imageList} }) => {
        return { img: imageList[index], imgLength: imageList.length };
    });

    // Add listener for escape key
    useEffect(() => {

        // Function checks whether escape has been pressed
        const onEscape = (event) => {
            if (event.keyCode === 27)
            dispatch(showModal(false));
        }

        // Add listener for function
        window.addEventListener('keydown', onEscape);

        // Cleanup function
        return () => window.removeEventListener('keydown', onEscape);
    }, [dispatch]);

    // Reference DOM for previous and next buttons for blur
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    // Track image side to be shown (front=true)
    const [imgSide, setImgSide] = useState(true);

    /* Hooks need to be called before checking show, so that they're not called conditionally */

    // Return nothing when modal not shown
    if (!show) {
        return null;
    }

    const BUTTON_CLASS = "massive basic ui icon button";

    // Close modal button
    const exit = (
        <button
            className={`exit ${BUTTON_CLASS}`}
        >
            <i className="close icon"></i>
        </button>
    );

    // "Go to previous card" button to be rendered inside modal
    const prev = (
        <button
            ref={prevRef}
            // Update image to display if possible
            onClick={ () => {
                if (index > 0) {
                    dispatch(setModalContent(index - 1));
                }
                prevRef.current.blur();
            } }
            // Add "disabled" to class if not clickable (first image in list)
            className={index > 0 ? BUTTON_CLASS : `disabled ${BUTTON_CLASS}`}
        >
            <i className="chevron left icon"></i>
        </button>
    );

    // "Go to next card" button to be rendered inside modal
    const next = (
        <button
        ref={nextRef}
            // Update image to display if possible
            onClick={ () => {
                if (index < imgLength-1) {
                    dispatch(setModalContent(index + 1));
                }
                nextRef.current.blur();
            } }
            // Add "disabled" to class if not clickable (first image in list)
            className={index < imgLength-1 ? BUTTON_CLASS : `disabled ${BUTTON_CLASS}`}
        >
            <i className="chevron right icon"></i>
        </button>
    );

    // Only double-sided cards will have two images, otherwise create one if the image is initialized
    let cardImage = <img src={img.front} alt="modal card"/>;
    let flipButton = null; // Regular cards don't have a flip button

    // Flip button for double-sided cards
    if (img.back) {
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
        cardImage = (
            // Add flipped class when back image shown
            <div className={imgSide ? "image" : "flipped image"}>
                <img src={img.front} alt="modal card front" className="cardImg"/>
                <img src={img.back} alt="modal card back" className="backside"/>
            </div>
        );
    }

    // Render Modal Content
    const renderedContent =
    <>
        {/* Display exit button */}
        <div
            className="modalClose"
            onClick={() => dispatch(showModal(false))}
        >
            {exit}
        </div>

        <div className="modalContent">
            
            {/* Display previous button */}
            <div className="backButton">
                {prev}
            </div>

            {/* Display current card image from imageList using index */}
            <div className="cardImage">
                {cardImage}
                {flipButton}
            </div>

            {/* Display next button */}
            <div className="forwardButton">
                {next}
            </div>
        </div>
    </>

    // Render Modal
    return createPortal(
        <div
            onClick={() => dispatch(showModal(false))}
            className="ui dimmer modals visible active cardModal"
        >
            
            <div
                onClick={e => e.stopPropagation()}
                className="modelContainer"
            >
                {renderedContent}
            </div>

        </div>,
        document.querySelector("#modal")
    );
}

export default CardModal;