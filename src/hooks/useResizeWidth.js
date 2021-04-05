import { useEffect, useState } from 'react'

/**
 * Helper function to stop React from rerendering continuously upon window resize
 */
function debounce(func, delay) {
    let timer;
    return (() => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            func.apply(this, arguments);
        }, delay);
    });
}

/**
 * Custom hook that returns the width of the current window upon resizing
 * @returns Width of current window
 */
export default function useResizeWidth() {
    // Use local state to track window size
    const [size, setSize] = useState({ width: window.innerWidth });

    // useEffect adds event listener for window resize
    useEffect(() => {
        const debouncedResize = debounce(() => {
            setSize({ width: window.innerWidth });
        }, 100);

        window.addEventListener('resize', debouncedResize);

        // Clean up
        return (() => { window.removeEventListener('resize', debouncedResize) });
    }, []);

    // Return new width on window resize
    return size.width;
}