import React, { useRef } from 'react';

import '../css/ScrollTop.css';

function ScrollTop() {
    // Create a reference to the button
    const scrollButton = useRef();


    // Use custom window scroll function user scrolls
    window.onscroll = windowScroll;

    function windowScroll(){

        // Check the scrollPosition of the user
        // Need 2 statements here for different browsers
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            scrollButton.current.style.display = 'block';
        } else {
            scrollButton.current.style.display = 'none';
        }
    }

    // onClick function that scrolls the user to the top of the page
    function goTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <button onClick={goTop} id="ScrollTop" ref={scrollButton} className="ui icon button ">
            <i className="chevron up icon"></i>
            <div>Scroll</div>
            <div>to Top</div>
        </button>
    )
}

export default ScrollTop;