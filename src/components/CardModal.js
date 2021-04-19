import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { showModal, setModalContent } from '../actions';
import '../css/CardModal.css';

function CardModal() {
    const dispatch = useDispatch();

    const show = useSelector(state => state.modal.showModal);
    const index = useSelector(state => state.modal.content);
    const imageList = useSelector(state => state.detailsOptions.imageList);

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

    // Return nothing when modal not shown
    if (!show) {
        return null;
    }

    const BUTTON_CLASS = "massive basic ui icon button";

    // Close modal button
    const exit = (
        <button
            onClick={() => dispatch(showModal(false))}
            className={`exit ${BUTTON_CLASS}`}
        >
            <i className="big close icon"></i>
        </button>
    );

    // "Go to previous card" button to be rendered inside modal
    const prev = (
        <button
            // Update image to display if possible
            onClick={ () => { if (index > 0) dispatch(setModalContent(index - 1)) } }
            // Add "disabled" to class if not clickable (first image in list)
            className={BUTTON_CLASS}
        >
            <i className="big chevron left icon"></i>
        </button>
    );

    // "Go to next card" button to be rendered inside modal
    const next = (
        <button
            // Update image to display if possible
            onClick={ () => { if (index < imageList.length-1) dispatch(setModalContent(index + 1)) } }
            // Add "disabled" to class if not clickable (first image in list)
            className={BUTTON_CLASS}
        >
            <i className="big chevron right icon"></i>
        </button>
    );

    // Render Modal Content
    const renderedContent =
    <>
        {/* Display exit button */}
        <div className="modelExit">
            {exit}
        </div>

        <div className="modelContent">
            {/* Display previous button */}
            <div className="backButton">
                {prev}
            </div>

            {/* Display current card image from imageList using index */}
            <img src={imageList[index]} alt="Card" className="cardImage"/>

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
            
            <div onClick={e => e.stopPropagation()} >
                {renderedContent}
            </div>

        </div>,
        document.querySelector("#modal")
    );
}

export default CardModal;