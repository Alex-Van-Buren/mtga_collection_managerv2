import React from 'react';
import { useSelector } from 'react-redux';

import Modal from '../Modal';
import { showHeaderModal } from '../../actions';

function HeaderModal() {

    const show = useSelector(state => state.modal.showHeaderModal);
    const message = useSelector(state => state.modal.headerContent);

    if (!show) {
        return null;
    }

    const renderContents = (
        <div>{message}</div>
    );

    const renderKeyEvents = {};

    return (
        <Modal contents={renderContents} keyEvents={renderKeyEvents} show={show} showModal={showHeaderModal}/>
    );
}

export default HeaderModal;