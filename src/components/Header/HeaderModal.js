import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../Templates/Modal';
import { showHeaderModal } from '../../actions';
import NoInventoryFound from '../../errors/NoInventoryFound';
import InvalidFile from '../../errors/InvalidFile';
import makeKeyboardClickable from '../../hooks/makeKeyboardClickable';
import '../../css/HeaderModal.css';

/**
 * An implementation of the Modal Component used to show errors in the Header component.
 */
function HeaderModal() {

    const show = useSelector(state => state.modal.showHeaderModal);
    const message = useSelector(state => state.modal.headerContent);

    const dispatch = useDispatch();

    const ref = useRef();

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
                return <NoInventoryFound/>;

            case "INVALID_FILE":
                return <InvalidFile/>;
        
            default:
                return null;
        }
    })();

    // Clicking anywhere will close the modal
    const renderedContent = (
        <div>

            {/* Add "fake" close button (clicking anywhere closes modal) */}
            <div id="headerModalClose" onClick={closeModal} ref={ref}>
                <button className={"exit massive basic ui icon button"} onKeyDown={e => makeKeyboardClickable(e, ref)} tabIndex="0">
                    <i className="close icon"/>
                </button>
            </div>

            <div tabIndex="0">
                {renderedMessage}
            </div>
        </div>
    );

    return (
        <Modal content={renderedContent} show={show} showModal={showHeaderModal}/>
    );
}

export default HeaderModal;