import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { showModal } from '../../actions';

/**
 * 
 * @param {Array} props.keyEvents Describes the keys to listen for the the functions to execute upon that key being pressed.
 * - keyEvents is an Array of objects; each object contains a key and a function: { key: {Number}, keyFunction: {Function}}
 * - Events for key code 27 (escape) are ignored; it will always close the modal. 
 * @param {Number} props.keyEvents[].key The key to set an event listener for. Inside an object on the keyEvents array.
 * @param {Function} props.keyEvents[].keyFunction The function to execute when the key is pressed. Inside an object on
 * the keyEvents array.
 */
function Modal({ keyEvents }) {

    // Access redux dispatcher
    const dispatch = useDispatch();

    // Determine whether modal should currently be shown
    const show = useSelector(state => state.modal.showModal);

    // Add listener to handle keyboard inputs
    useEffect(() => {

        // Only add the listener if the modal is open
        if (show) {

            // Function checks which key has been pressed and does appropriate action
            const modalKeydowns = (event) => {

                // Escape key pressed --> close modal
                if (event.keyCode === 27) {
                    dispatch(showModal(false));
                }

                // Loop through each Object describing the pressed key and the function to execute
                for (const { key, keyFunction } of keyEvents) {

                    // Execute the function for the specified key code (unless it's escape)
                    if (event.keyCode !== 27 && event.keyCode === key) {
                        keyFunction();
                    }
                }
            }
            
            // Add listener for function
            window.addEventListener('keydown', modalKeydowns);
    
            // Cleanup function
            return () => {
                window.removeEventListener('keydown', modalKeydowns);
            }
        }
    },
    
    [dispatch, show, keyEvents]);
}

export default Modal;