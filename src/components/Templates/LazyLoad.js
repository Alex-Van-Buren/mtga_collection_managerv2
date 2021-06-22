import { useState, useEffect } from 'react';


function LazyLoad(
    { children, childHeight, childWidth, viewHeight=window.innerHeight, viewWidth=window.innerWidth }
) {
    
    // Track number of children currently shown
    const [numChildrenShown, setNumChildrenShown] = useState(12);

    // Add listener for Y scrolling
    useEffect(() => {
        function onScrollY() {

            // Calculate number of children to show
            const numChildrenWeNeedToShow = Math.ceil( Math.ceil((window.scrollY + viewHeight) / childHeight) * Math.floor(viewWidth/childWidth) );
            console.log(numChildrenWeNeedToShow)

            // Increment number of children to show if user scrolls down
            if (numChildrenWeNeedToShow > numChildrenShown) {
                setNumChildrenShown(numChildrenWeNeedToShow);
            }
        }

        // Track scrolling
        window.addEventListener("scroll", onScrollY);

        // Cleanup
        return () => window.removeEventListener("scroll", onScrollY);
    }, [childHeight, childWidth, viewWidth, viewHeight, numChildrenShown]);

    return children.slice(0, numChildrenShown);
}

export default LazyLoad;