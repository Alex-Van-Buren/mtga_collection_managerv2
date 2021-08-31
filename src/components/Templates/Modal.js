import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import FocusTrap from 'focus-trap-react';

import '../../css/Modal.css';
/**
 * A generic React modal that displays whatever content is passed to it as a prop. Requires a boolean value that determines
 * whether modal is currently being displayed, and a function to set that boolean value. Additional functions to fire
 * from the modal on specific key press may be specified in the keyEvents object.
 * - Automatically closes when clicking off the modal or when Esc is pressed.
 * 
 * @param {JSX} props.content The modal content to display.
 * @param {array} props.keyEvents (Optional) Describes the keys to listen for and the functions to execute upon key press.
 * - keyEvents is an Array of objects; each object containing a key code and a function to execute: 
 *   { key: {Number}, keyFunction: {Function}}
 * - Events for key code 27 (escape) are ignored; it will always close the modal.
 * - Prevents default actions when specified key pressed unless noDefaultCancel is set to true.
 * @param {array} props.keyEvents[].keys The array of {number} key codes to set event listeners for.
 * @param {function} props.keyEvents[].keyFunction The function to execute when the key is pressed.
 * @param {boolean} props.keyEvents[].noDefaultCancel (Optional) Specifies whether to prevent default events on 
 *  this key press.
 * @param {boolean} props.show The true/false value indicating whether this modal should be displayed currently displayed.
 * @param {function} props.setShow The function used to set the value of show. Used to close modal when clicked off of
 *  or when Esc is pressed.
 * @param {string} [props.modalID="modal"] (Optional, Default="modal") The ID of the HTML element on which to place the React Portal.
 */
function Modal({ content, keyEvents, show, setShow, modalID="modal" }) {

    const [tabbing, setTabbing] = useState(false);

    // Handle keyboard inputs
    useEffect(() => {

        // Only add the listener if the modal is open
        if (show) {

            // Function checks which key has been pressed and does appropriate action
            const modalKeydowns = (event) => {

                // Escape key pressed --> close modal
                if (event.keyCode === 27) {
                    setShow(false);
                }

                // Set tabbing when first tab entered
                if (!tabbing && event.keyCode === 9) {
                    setTabbing(true);
                }

                // Only listen for additional keys if keyEvents is defined
                if (keyEvents) {

                    // Loop through each Object describing the pressed key and the function to execute
                    for (const { keys, keyFunction, noDefaultCancel } of keyEvents) {

                        // Execute the function for the specified key codes (unless it's escape)
                        if (event.keyCode !== 27 && keys.includes(event.keyCode)) {
    
                            // Prevent default events if noDefaultCancel is false or doesn't exist
                            if (!noDefaultCancel) {
                                event.preventDefault();
                            }
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
    }, [show, setShow, keyEvents, tabbing]);

    // Render Modal over content using a portal to the div with id="modal" in index.html
    return createPortal(
        <FocusTrap active={tabbing}>
            <div
                onMouseDown={() => setShow(false)}
                className="ui dimmer modals visible active fixedModal"
                aria-keyshortcuts="Esc (escape) closes pop-up"
            >
                <div
                    // Don't allow clicks to propagate to lower elements
                    onMouseDown={e => e.stopPropagation()}
                >
                    {/* Get modal content from props */}
                    {content}
                </div>

            </div>
        </FocusTrap>,
        document.getElementById(modalID)
    );
}

export default Modal;
