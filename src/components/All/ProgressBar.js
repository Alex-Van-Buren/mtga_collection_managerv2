import React, { useEffect, useRef } from 'react';

import '../../css/ProgressBar.css'

function ProgressBar({percent, innerClass}) {
    // Make a reference to the inner portion of the progress bar
    const innerRef = useRef();

    useEffect(()=> {
        innerRef.current.style.width = `${percent}%`;

    },[percent])

    return (
        <div className="progress-outer">
            <div className={`progress-inner ${innerClass}`} ref ={innerRef}></div>
        </div>
    )
}

export default ProgressBar;