import React, { useState, useEffect, useRef, useMemo } from 'react';

/**
 * Wrap around children to stop them from being rendered to the DOM until they are within about one 'view height' + buffer
 * of the parent element. Assumes that all child elements are the same size for calculating when to show them.
 * 
 * @prop {number} childHeight Height of child elements, including margin/padding.
 * @prop {number} childWidth Width of child elements, including margin/padding.
 * @prop {number} [gap=0] (Optional) Gap between child elements (in a flexbox).
 * @prop {number} [buffer=2] Number of rows of cards to load beyond the current screen.
 * @prop {string} [scrollingParent=null] (Optional) Specify this string if the element that scrolls is not the window.
 * Input to document.querySelector() that selects the scrolling parent of LazyLoad.
 * @prop {function} [viewWidthFn=null] (Optional) A transformation to apply to the calculation of the view width. View width
 * is initially the offsetWidth of the parent or window.innerWidth if scrollingParent is unspecified.
 * @prop {function} [viewHeightFn=null] (Optional) A transformation to apply to the calculation of the view height. View height
 * is initially the offsetHeight of the parent or window.innerHeight if scrollingParent is unspecified.
 * @returns React.Component that should be wrapped around children that will be lazily loaded.
 */
function LazyLoad({ 
    children, childHeight, childWidth, gap=0, buffer=2, 
    scrollingParent=null, viewWidthFn=null, viewHeightFn=null
}) {

    // Get parent element
    let parent = window;
    let viewHeight = parent.innerHeight;
    let viewWidth = parent.innerWidth;

    // Check if a parent element other than the window is specified
    if (scrollingParent) {
        const element = document.querySelector(scrollingParent);

        // Make sure the query string returned something
        if (element) {

            // Then update parent and call specific height/width properties
            parent = element;
            viewHeight = parent.offsetHeight;
            viewWidth = parent.offsetWidth;
        }
    }

    // Apply transformations to height and width if applicable
    if (viewHeightFn) {
        viewHeight = viewHeightFn(viewHeight);
    }
    if (viewWidthFn) {
        viewWidth = viewWidthFn(viewWidth);
    }

    // Calculate the number of children that can fit in a row
    const childrenPerRow = useMemo(() => {

        // From: NumberChildren * ChildWidth + (NumberChildren - 1) * GapWidth <= ParentWidth
        return Math.floor( (viewWidth + gap) / (childWidth + gap) );
    }, [viewWidth, childWidth, gap]);

    // Track number of children currently shown
    const [numChildrenShown, setNumChildrenShown] = useState(buffer*childrenPerRow);

    // Calculate container height to set so scrollbar is about the right size
    const height =  Math.ceil(children.length/childrenPerRow) * childHeight;

    // Track whether the throttle function is currently active
    const throttleActive = useRef(false); // throttleActive.current = false;

    // Add listener for Y scrolling on page load or resize
    useEffect(() => {
        
        // Watch for scrolling and compute number of children to show
        function onScrollY() { // Function to throttle

            const scrollY = scrollingParent ? parent.scrollTop : parent.scrollY;

            // Calculate number of children to show
            const numChildrenWeNeedToShow = Math.ceil((scrollY + viewHeight) / childHeight) * childrenPerRow;

            // Increment number of children to show if user scrolls down
            if (numChildrenWeNeedToShow + buffer*childrenPerRow > numChildrenShown) {
                setNumChildrenShown(numChildrenWeNeedToShow + buffer*childrenPerRow);
            }
        }

        /**
         * Allows the "throttledFunction" to be run, at most, every "delay" milliseconds.
         * Ignores susequent calls to "throttledFunction" within the delay period.
         * 
         * @param {function} throttledFunction Function to throttle
         * @param {number} delay Number of milliseconds to throttle "throttledFunction"
         */
         function throttle(throttledFunction, delay) {

            // Only accept new function call when throttle is not active
            if (!throttleActive.current) {

                // Set throttle to active state
                throttleActive.current = true;

                // After "delay" milliseconds, run the throttledFunction and clear "active" status of throttle
                setTimeout(() => {

                    // Clear the active status of throttle
                    throttleActive.current = false;

                    // Run the throttled function
                    throttledFunction();
                }, delay);
            }
        }

        // Throttle onScrollY so it's only called, at most, every 200ms
        const throttledOnScrollY = ( () => throttle(onScrollY, 200) );

        // Track scrolling
        parent.addEventListener("scroll", throttledOnScrollY);
        
        // Cleanup
        return () => parent.removeEventListener("scroll", throttledOnScrollY);

    }, [buffer, childHeight, childrenPerRow, numChildrenShown, parent, scrollingParent, viewHeight]);

    // Set height of lazyload div so scroll bar shows true length
    return (
        <div className="lazyLoad" style={{ "minHeight" : `${height}px` }} >

            {/* Only show children if they've been scrolled to */ }
            {children.slice(0, numChildrenShown)}
        </div>
    );
}

export default LazyLoad;
