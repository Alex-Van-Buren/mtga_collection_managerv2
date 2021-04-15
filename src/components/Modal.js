import React from 'react';
import { useSelector } from 'react-redux';
import { showModal } from '../actions';


function Modal() {
    const showModal = useSelector( ({modal: {showModal}}) => showModal );
    const content = useSelector( ({modal: {content}}) => content );

    const renderModal = () => {

    }

    if (showModal)
        return ({renderModal});
    return null;
}

export default Modal;