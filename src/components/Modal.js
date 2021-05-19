import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../css/Modal.css';
/**
 * A generic modal that displays whatever content is passed to it as a prop. Closed when clicking off the modal or
 * by pressing escape. Can be passed functions to call when specified keys are pressed.
 * 
 * @param {JSX} props.content The modal content to display.
 * @param {Array} props.keyEvents Describes the keys to listen for the the functions to execute upon that key being pressed.
 * - keyEvents is an Array of objects; each object contains a key and a function: { key: {Number}, keyFunction: {Function}}
 * - Events for key code 27 (escape) are ignored; it will always close the modal.
 * - Prevents default actions when key pressed.
 * @param {Number} props.keyEvents[].key The key to set an event listener for. Inside an object on the keyEvents array.
 * @param {Function} props.keyEvents[].keyFunction The function to execute when the key is pressed. Inside an object on
 * the keyEvents array.
 */
function Modal({ content, keyEvents, show, showModal }) {

    // Access redux dispatcher
    const dispatch = useDispatch();

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

                // Only listen for additional keys if keyEvents is defined
                if (keyEvents) {

                    // Loop through each Object describing the pressed key and the function to execute
                    for (const { key, keyFunction } of keyEvents) {
    
                        // Execute the function for the specified key code (unless it's escape)
                        if (event.keyCode !== 27 && event.keyCode === key) {
    
                            event.preventDefault();
    
                            keyFunction();
                        }
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
    }, [dispatch, show, keyEvents]);

    // Render Modal over content using a portal to the div with id="modal" in index.html
    return createPortal(
        <div
            onClick={() => dispatch(showModal(false))}
            className="ui dimmer modals visible active cardModal"
        >
            
            <div
                // Don't allow clicks to propagate to lower elements
                onClick={e => e.stopPropagation()}
            >
                {/* Get modal content from props */}
                {content ? content : null}
            </div>

        </div>,
        document.querySelector("#modal")
    );
}

export default Modal;