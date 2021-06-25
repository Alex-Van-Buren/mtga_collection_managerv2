import React, { useState, useEffect, useRef, useMemo } from 'react';

/**
 * Doesn't allow children to be rendered to the DOM until they are within about one 'view height' of the parent element.
 * 
 * @prop {number} childHeight Height of child elements, including margin/padding.
 * @prop {number} childWidth Width of child elements, including margin/padding.
 * @prop {number} [gap=0] (Optional) Gap between child elements (in a flexbox).
 * @prop {number} [viewWidth=window.innerWidth] (Optional) The width of the area in which the child elements are visible.
 * Assumes width of window if not specified.
 * @prop {number} [viewHeight=window.innerHeight] (Optional) The height in which child elements should be visible. Not equal
 * to the total height of the list of children, just the visible portion. Assumes height of window if not specified.
 * @prop {ref} [forwardedParentRef=null] (Optional) A forwarded ref (see React.forwardRef) of the parent element that
 * scrolls, if not the window. If the window is the scrolling element, then do not specify.
 * @prop {number} [numberInitiallyShown=12] Number of children to show before scrolling has occurred.
 * @returns React.Component that should be wrapped around the list that will be lazy loaded.
 * @example <LazyLoad childHeight={children[0].height} childWidth={children[0].width} gap={20}> {children} </LazyLoad>
 */
function LazyLoad(
    {
        children, childHeight, childWidth, gap=0, viewWidth=window.innerWidth, viewHeight=window.innerHeight, 
        forwardedParentRef=null, numberInitiallyShown=12
    }
) {
    
    // Track number of children currently shown
    const [numChildrenShown, setNumChildrenShown] = useState(numberInitiallyShown);

    // Get parent element
    const parent = forwardedParentRef ? forwardedParentRef.current : window;

    // Calculate the number of children that can fit in a row
    const childrenPerRow = useMemo(() => {

        // From: NumberChildren * ChildWidth + (NumberChildren - 1) * GapWidth <= ParentWidth
        return Math.floor( (viewWidth + gap) / (childWidth + gap) );
    }, [viewWidth, childWidth, gap]);

    // Calculate container height to set so scrollbar is about the right size
    const height = useMemo(() => {

        return Math.ceil(children.length/childrenPerRow) * childHeight;
    }, [children, childrenPerRow, childHeight]);

    // Track whether the throttle function is currently active
    const throttleActive = useRef(false); // throttleActive.current = false;

    // Add listener for Y scrolling on page load or resize
    useEffect(() => {
        
        // Watch for scrolling and compute number of children to show
        function onScrollY() { // Function to throttle

            const scrollY = forwardedParentRef ? parent.scrollTop : parent.scrollY;

            // Calculate number of children to show
            const numChildrenWeNeedToShow = Math.ceil((scrollY + viewHeight) / childHeight) * childrenPerRow;

            // Increment number of children to show if user scrolls down
            if (numChildrenWeNeedToShow > numChildrenShown) {
                setNumChildrenShown(numChildrenWeNeedToShow);
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

    }, [childHeight, childrenPerRow, forwardedParentRef, numChildrenShown, parent, viewHeight]);

    // Set height of lazyload div so scroll bar shows true length
    return <div className="lazyLoad" style={{ "minHeight" : `${height}px` }} >

        {/* Only show children if they've been scrolled to */ }
        {children.slice(0, numChildrenShown)}
    </div>
}

export default LazyLoad;
