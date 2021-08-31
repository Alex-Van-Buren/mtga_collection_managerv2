import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../Templates/Modal';
import { showCardModal, setCardModalContent } from '../../actions';
import useResizeWidth from '../../hooks/useResizeWidth';
import '../../css/CardModal.css';

function CardModal() {

    const dispatch = useDispatch();

    // Determine whether modal should currently be shown
    const show = useSelector(state => state.modal.showCardModal);

    // Destructuring from redux gets dicey, so these look kind of silly
    const { index, imgSide } = useSelector(({ modal: {cardContent: content} }) => {
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
   
    /**
     * Move left an image in the modal when possible
     */
    const goLeft = useCallback(() => {
        if (index > 0) {
            dispatch(setCardModalContent({ index: index - 1, imgSide: true }));
        }
    }, [dispatch, index]);

    /**
     * Move right an image in the modal when possible
     */
    const goRight = useCallback(() => {
        if (index < imgLength-1) {
            dispatch(setCardModalContent({ index: index + 1, imgSide: true }));
        }
    }, [dispatch, index, imgLength]);

    /**
     * Flip card in modal.
     */
    const flipCard = useCallback(() => {

        if (img.back) {

            // Keep same card, but flip to other side
            dispatch(setCardModalContent({ index, imgSide: !imgSide }));
    
            // Set animation for flipping action on card
            imgRef.current.style.transition = "1s";
    
            // Determine which animation to show
            const sideBoolean = flipRef.current.style.animation.includes("turning");
    
            // Animate flip button
            if (sideBoolean)
                flipRef.current.style.animation = "turned .6s linear";
            else
                flipRef.current.style.animation = "turning .6s linear";
    
            // Clear animation after short delay
            setTimeout(() => {
                imgRef.current.style.transition = "0s";
            }, 100);
        }

    }, [dispatch, imgSide, index, img]);

    // Reference DOM
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const imgRef  = useRef(null);
    const flipRef = useRef(null);

    /* Hooks need to be called before checking show, so that they're not called conditionally */

    const width = useResizeWidth();
    
    // Return nothing when modal not shown or if screensize too small
    if (!show || width < 527) {
        return null;
    }

    // Basic button classes for semantic ui. Additional class added when button disabled
    const BUTTON_CLASS = "massive basic ui icon button";

    // Close modal button
    const exit = (
        <button
            className={`exit ${BUTTON_CLASS}`}
        >
            <i className="close icon"/>
        </button>
    );

    // "Go to previous card" button to be rendered inside modal
    const prev = (
        <button
            aria-label="Previous Card" title="Previous Card" aria-keyshortcuts="ArrowLeft"
            ref={prevRef} disabled={index <= 0}
            // Update image to display if possible
            onClick={() => {
                
                // Move left
                goLeft();

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
        aria-label="Next Card" title="Next Card" aria-keyshortcuts="ArrowRight"
        ref={nextRef} disabled={index >= imgLength-1}
            // Update image to display if possible
            onClick={() => {

                // Move right
                goRight();

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

        flipButton = (
            <button
                aria-label="Flip Card" title="Flip Card" aria-keyshortcuts="Space"
                className="circular ui icon button flipButton"
                onClick={(event) => {

                    // Prevent any additional actions when clicking over image
                    event.stopPropagation();

                    // Keep same card, but flip to other side
                    flipCard();
                }}
            >
                <i className="undo icon" id="flipButton" ref={flipRef} />
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
            onClick={() => dispatch(showCardModal(false))}
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

    // Create keyEvents Object to be passed to Modal; set key and function
    const keyEvents = [

        // Left Arrow pressed --> go left (-1 to index unless at start)
        { keys: [37], keyFunction: goLeft },

        // Right Arrow pressed --> go right (+1 to index unless at end)
        { keys: [39], keyFunction: goRight },

        // Space bar pressed --> Flip card if possible
        { keys: [32], keyFunction: flipCard }
    ];

    // Render Modal
    return (
        <Modal content={renderedContent} keyEvents={keyEvents} show={show} setShow={(val) => dispatch(showCardModal(val))}/>
    );
}

export default CardModal;