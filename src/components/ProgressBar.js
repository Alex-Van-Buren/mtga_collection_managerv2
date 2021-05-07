import React, { useEffect, useRef } from 'react';

import '../css/ProgressBar.css'

function ProgressBar({percent}) {
    // Make a reference to the inner portion of the progress bar
    const innerRef = useRef();

    useEffect(()=> {
        innerRef.current.style.width = `${percent}%`;

    },[percent])

    return (
        <div className="progress-outer">
            <div className="progress-inner" ref ={innerRef}></div>
        </div>
    )
}

export default ProgressBar;