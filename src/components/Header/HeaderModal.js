import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../Modal';
import { showHeaderModal } from '../../actions';
import { NO_INVENTORY_FOUND, INVALID_FILE } from '../../errors';
import '../../css/HeaderModal.css';

function HeaderModal() {

    const show = useSelector(state => state.modal.showHeaderModal);
    const message = useSelector(state => state.modal.headerContent);

    const dispatch = useDispatch();

    // Show nothing when hidden
    if (!show) {
        return null;
    }

    // Close modal function
    function closeModal() {
        dispatch(showHeaderModal(false));
    }

    // Get message text to render
    const renderedMessage = (() => {
        switch (message) {
            case "NO_INVENTORY_FOUND":
                return NO_INVENTORY_FOUND;

            case "INVALID_FILE":
                return INVALID_FILE;
        
            default:
                return;
        }
    })();

    // Clicking anywhere will close the modal
    const renderedContent = (
        <div onClick={closeModal}>

            {/* Add "fake" close button (clicking anywhere closes modal) */}
            <div id="headerModalClose">
                <button className={"exit massive basic ui icon button"}>
                    <i className="close icon"/>
                </button>
            </div>

            {renderedMessage}
        </div>
    );

    return (
        <Modal content={renderedContent} show={show} showModal={showHeaderModal}/>
    );
}

export default HeaderModal;