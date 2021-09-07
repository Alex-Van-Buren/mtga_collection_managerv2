import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import '../../css/HoverPreview.css'

/**
 * Wrap HoverPreview around JSX to create a hover preview. Returns the children wrapped in a div that's used
 * to determine the location of the JSX as well as add onClick, onMouseOver, and onMouseLeave events. Also creates
 * a portal to "#hoverPreview" to display the preview.
 * @prop {object} imgs An object of images to display. Requires imgs.front to contain an <img>, with imgs.back 
 * to optionally display a second <img> tag next to it. Both images assumed to be same size.
 * @prop {number} [height=350] Optional height of image(s).
 * @prop {number} [width=247.07] Optional width of a SINGLE image. (Automatically doubled when imgs.back exists)
 * @prop {number} [delay=500] Optional parameter to set the delay time in ms.
 */
export default function HoverPreview({ children, imgs, height=350, width=247.07, delay=500 }) {

    // Stores current timer when it exists
    const timerID = useRef(null);
    
    // Cancel timers on unmount
    useEffect(() => () => {
        if (timerID.current) {
            clearTimeout(timerID.current);
        }
    }, []);
    
    // Location of div wrapped around the children, used to determine hover preview location
    const locationRef = useRef();

    // Track whether to show this hover preview
    const [show, setShow] = useState(false);

    let images = null;
    
    // Add hover preview when locationRef is fully initialized
    if (locationRef.current && imgs) {

        // (x,y) coordinates of top, left corner
        const { left, top } = locationRef.current.getBoundingClientRect();

        // Will store the final (x,y) coordinates for the hover preview
        const { x, y } = getPosition(height, imgs.back ? width*2 : width, left, top); // Double width if imgs.back
        
        images = (
            <div className="hoverPreviewDiv" style={{ left: x, top: y }}>
                <img src={imgs.front} alt="hoverPreviewFrontImg" className="hoverPreviewImg"/>
                {imgs.back ? <img src={imgs.back}  alt="hoverPreviewBackImg" className="hoverPreviewImg"/> : null}
            </div>
        );
    }
    
    // Wrap children in a div to easily reference location
    return (<>
        <div
            onMouseOver={setTimer} onMouseOut={onMouseOut} onClick={setTimer} ref={locationRef}
            onFocus={setTimer} onBlur={onMouseOut} onDragStart={onMouseOut}
        >
            {children}
        </div>
        {show ? createPortal( images, document.getElementById("hoverPreview") ) : null}
    </>);

    /**
     * Cancels any active or pending hover preview when the mouse leaves this target.
     */
    function onMouseOut() {

        // Clear the timer when the mouse leaves the target
        clearTimeout(timerID.current);
        timerID.current = null;

        // Forcefully stop the hover preview on mouse leave
        setShow(false);
    }

    /**
     * Forcefully sets timer
     */
    function setTimer() {

        // Clear any active timer
        clearTimeout(timerID.current);

        // Hide hover preview until timer is complete
        setShow(false);

        // Set a delay before showing the hover preview
        timerID.current = setTimeout(() => {
            
            // Check if timer is still valid
            if (timerID.current) {

                // Clear timers
                timerID.current = null;

                // Show the hover preview once the coordinates are set
                setShow(true);
            }
        }, delay);
    }

    /**
     * Gets the x and y coordinates to place the preview at
     */
    function getPosition(height, width, left, top) {

        // Get screen height and width
        const { clientHeight, clientWidth } = document.documentElement;

        // Default position at upper left corner of target
        let x = left, y = top;

        // Shift image left if off screen to the right
        if (left + width > clientWidth) {
            x = clientWidth - width - 1;
        }

        // Shift image up or down if off screen vertically
        if (top < 0) {
            y = 0;
        } else if (top + height > clientHeight) {
            y = clientHeight - height - 1;
        }

        // Set coordinates for the hover preview after ensuring the preview will be on-screen
        return { x, y };
    }
}