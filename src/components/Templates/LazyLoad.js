import React, { useState, useEffect, useMemo } from 'react';

/**
 * 
 * @param {Number} props.childHeight
 * @returns 
 */
function LazyLoad(
    { children, childHeight, childWidth, viewHeight=window.innerHeight, viewWidth=window.innerWidth }
) {
    
    // Track number of children currently shown
    const [numChildrenShown, setNumChildrenShown] = useState(12);

    // Avoid recomputing number of children per row/column when not needed
    const childrenPerRow = useMemo(() => Math.floor(viewWidth/childWidth), [viewWidth, childWidth]);
    const height = useMemo(() => (children.length/childrenPerRow * childHeight), [children, childrenPerRow, childHeight]);

    // Add listener for Y scrolling on page load or resize
    useEffect(() => {
        
        // Watch for scrolling and compute number of children to show
        function onScrollY() {

            throttle(() => { // Function to throttle

                // Calculate number of children to show
                const numChildrenWeNeedToShow = Math.ceil((window.scrollY + viewHeight) / childHeight) * childrenPerRow;
    
                // Increment number of children to show if user scrolls down
                if (numChildrenWeNeedToShow > numChildrenShown) {
                    setNumChildrenShown(numChildrenWeNeedToShow);
                }

            }, 200); // Delay

        }

        // Create a timer id
        let id;

        // Throttle scrolling event function
        function throttle(throttledFunction, delay) {

            // Do nothing if the timeout hasn't completed yet (otherwise id would be undefined)
            if (id) {
                return;
            }

            // Call {throttledFunction} after {delay} and set timeout id
            id = setTimeout(() => {

                // Run the throttled function after the delay
                throttledFunction();

                // And clear the timer id
                id = undefined;
            }, delay);
        }

        //TODO: clean up event listener when done, call less often?, load more than a row at a time?, track scrollY?

        // Track scrolling
        window.addEventListener("scroll", onScrollY);
        
        // Cleanup
        return () => window.removeEventListener("scroll", onScrollY);

    }, [childHeight, childrenPerRow, numChildrenShown, viewHeight]);
    
    

    // Set height of lazyload div so scroll bar shows true length
    return <div className="lazyLoad" style={{ "height" : {height} }} >

        {/* Only show children if they've been scrolled to */ }
        {children.slice(0, numChildrenShown)}
    </div>
}

export default LazyLoad;