import React, { useState, useEffect, useRef, useMemo } from 'react';

// parent width/height will typically use window.innerWidth/.innerHeight as a variable (remember the width of the scrollbar)
// parent and child width/height must have margins factored in
function LazyLoad(
    { 
        children, childHeight, childWidth, viewWidth, gap=0,
        viewHeight=window.innerHeight, forwardedParentRef=null 
    }
) {
    
    // Track number of children currently shown
    const [numChildrenShown, setNumChildrenShown] = useState(12);

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

            // Calculate number of children to show
            const numChildrenWeNeedToShow = Math.ceil((window.scrollY + viewHeight) / childHeight) * childrenPerRow;

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
        window.addEventListener("scroll", throttledOnScrollY);
        
        // Cleanup
        return () => window.removeEventListener("scroll", throttledOnScrollY);

    }, [childHeight, childrenPerRow, numChildrenShown, viewHeight]);

    // Set height of lazyload div so scroll bar shows true length
    return <div className="lazyLoad" style={{ "minHeight" : `${height}px` }} >

        {/* Only show children if they've been scrolled to */ }
        {children.slice(0, numChildrenShown)}
    </div>
}

export default LazyLoad;