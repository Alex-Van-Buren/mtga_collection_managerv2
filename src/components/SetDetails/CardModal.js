import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { showModal, setModalContent } from '../../actions';
import '../../css/CardModal.css';

function CardModal() {
    const dispatch = useDispatch();

    const show = useSelector(state => state.modal.showModal);

    // Destructuring from redux gets dicey, so these look kind of silly
    const { index, imgSide } = useSelector(({ modal: {content} }) => {
        if (content)
            return { index: content.index, imgSide: content.imgSide };

        // Initial render default values
        else
            return { index: 0, imgSide: true };
    });

    const { img, imgLength } = useSelector(({ displayOptions: {imageList} }) => {
        if (imageList)
            return { img: imageList[index], imgLength: imageList.length };

        // Initial render default values
        else
            return { img: null, imgLength: 0 };
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

    // Reference DOM
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const imgRef  = useRef(null);
    const flipRef = useRef(null);

    /* Hooks need to be called before checking show, so that they're not called conditionally */

    // Return nothing when modal not shown
    if (!show) {
        return null;
    }

    // Basic button classes for semantic ui. Additional class added when button disabled
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
            onClick={() => {
                if (index > 0) {
                    dispatch(setModalContent({ index: index - 1, imgSide: true }));
                }

                // Clear focus after going to next image
                prevRef.current.blur();
            }}
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
            onClick={() => {
                if (index < imgLength-1) {
                    dispatch(setModalContent({ index: index + 1, imgSide: true }));
                }

                // Clear focus after going to next image
                nextRef.current.blur();
            }}
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
                onClick={(event) => {

                    // Prevent any additional actions when clicking over image
                    event.stopPropagation();

                    // Keep same card, but flip to other side
                    dispatch(setModalContent({ index, imgSide: !imgSide }));

                    // Set animations for flipping action on card and flip button
                    flipRef.current.style.transition = "1s";
                    imgRef.current.style.transition = "1s";

                    // Clear animations after short delay
                    setTimeout(() => {
                        flipRef.current.style.transition = "0s";
                        imgRef.current.style.transition = "0s";
                    }, 100);
                }}
            >
                <i className={flipIconClass} id="flipButton" ref={flipRef} />
            </button>
        );

        // One image will be hidden
        cardImage = (

            // Add flipped class when back image shown
            <div id="modalImage" className={imgSide? "" : "flipped"} ref={imgRef} >
                <img src={img.front} alt="modal card front" className="cardImg" />
                <img src={img.back}  alt="modal card back"  className="backside" />
            </div>
        );
    }

    // Compose all modal content
    const renderedContent =
    <>
        {/* Exit button */}
        <div
            className="modalClose"
            onClick={() => dispatch(showModal(false))}
        >
            {exit}
        </div>

        <div className="modalContent">
            
            {/* Previous button */}
            <div className="backButton">
                {prev}
            </div>

            {/* Current card image and flip button */}
            <div className="cardImage">
                {cardImage}
                {flipButton}
            </div>

            {/* Next button */}
            <div className="forwardButton">
                {next}
            </div>
        </div>
    </>

    // Render Modal over content using a portal to the div with id="modal" in index.html
    return createPortal(
        <div
            // Initially hide the modal
            onClick={() => dispatch(showModal(false))}
            className="ui dimmer modals visible active cardModal"
        >
            
            <div
                // Don't allow clicks to propigate to lower elements
                onClick={e => e.stopPropagation()}
                className="modelContainer"
            >
                {/* Get modal content from above methods */}
                {renderedContent}
            </div>

        </div>,
        document.querySelector("#modal")
    );
}

export default CardModal;