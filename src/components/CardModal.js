import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from './Modal';
import { showModal, setModalContent } from '../actions';

function CardModal() {
    const dispatch = useDispatch();

    const show = useSelector(state => state.modal.showModal);
    const index = useSelector(state => state.modal.content);
    const imageList = useSelector(state => state.detailsOptions.imageList);

    // Return nothing when modal not shown
    if (!show) {
        return null;
    }

    // "Go to previous card" button to be rendered inside modal
    const prev = (
        <button
            // Update image to display if possible
            onClick={ () => { if (index > 0) dispatch(setModalContent(index - 1)) } }
            // Add "disabled" to class if not clickable (first image in list)
            className={index <= 1 ? "disabled" : ""}
        >
            <i class="chevron left icon"></i>
        </button>
    );

    // "Go to next card" button to be rendered inside modal
    const next = (
        <button
            // Update image to display if possible
            onClick={ () => { if (index < imageList.length-1) dispatch(setModalContent(index + 1)) } }
            // Add "disabled" to class if not clickable (first image in list)
            className={index < imageList.length-1 ? "disabled" : ""}
        >
            <i class="chevron right icon"></i>
        </button>
    );

    const exit = (
        <button onClick={() => closeModal()}>
            <i className="close icon"></i>
        </button>
    );

    // Handle closing the modal
    function closeModal() {
        dispatch(showModal(false));
    }

    // Render actinos
    const renderedActions = <>

        {/* Display previous button */}
        {prev}

        {/* Display next button */}
        {next}

        {/* Display exit button */}
        {exit}
    </>

    // Render Modal Content
    const renderedContent = <>

        {/* Display current card image from imageList using index */}
        <img src={imageList[index]} alt="Card"/>
    </>        

    // Render Modal
    return <Modal
        content={renderedContent}
        actions={renderedActions}
        onDismiss={() => closeModal()}
    />
}

export default CardModal;