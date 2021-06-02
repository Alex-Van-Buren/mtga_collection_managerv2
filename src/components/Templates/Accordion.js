import React, { useState, useRef, useEffect } from 'react';

import '../../css/Accordion.css';

function Accordion(props) {
    const [open, setOpen] = useState(false);
    const panelRef = useRef();

    useEffect(() => {
        if (open) {
            panelRef.current.style.maxHeight = panelRef.current.scrollHeight +"px";
        } else {
            panelRef.current.style.maxHeight = 0;
        }
    },[open])

    // Copy All the children elements and put into an array
    const elements = React.Children.toArray(props.children);

    // Make a button to expand/collapse the accordion to put in the first child element
    const iconClass = open ? "minus icon" : "plus icon";

    const expandButton = ( 
        <button className="ui icon button" key="expandButton" onClick={()=> setOpen(!open)}>
            <i className={iconClass}></i>
        </button>
    )

    // Put the expand button as a clild of the first element
    const firstElementChildren = [elements[0].props.children, expandButton];
    const firstElement = React.cloneElement(elements[0], {}, firstElementChildren );

    // Put the rest of the elements into a div that will show/hide based on open state
    const collapsableStuff = (
        <div className={open ? "panel panelExpanded" : "panel panelCollapsed"} ref={panelRef}>
            {elements.slice(1)}
        </div>
    )


    return(
        <>
            {firstElement}
            {collapsableStuff} 
        </>
    )
}

export default Accordion;