import React, { useState, useRef, useEffect } from 'react';

import '../../css/Accordion.css';
/**
 * Make a collapsible section with a right floated button to expand/collapse the section. 
 * To Use just wrap the elements with the Accordion Element. The first element will be the title element with a 
 * button on the right and will always be visible. The remaining elements will be expandable. Ex: 
 * @example
 * <Accordion> 
 *      <div> title </div> 
 *      <div> content </div> 
 *      <div> more content </div> 
 * </Accordion> 
 * @param {*} props Grabs the children of Accordion
 * @returns Collapsible section
 */
function Accordion(props) {
    let startState = props.open;
    if (props.open === undefined) {
        startState = false;
    }
    const [open, setOpen] = useState(startState);
    const panelRef = useRef();

    // Copy All the children elements and put into an array
    const elements = React.Children.toArray(props.children);
    
    // Change the height of the collapsable panel based on open state
    useEffect(() => {
        if (open) {
            panelRef.current.style.maxHeight = panelRef.current.scrollHeight +"px";
        } else {
            panelRef.current.style.maxHeight = 0;
        }
    },[open]);    

    // Make a button to expand/collapse the accordion to put in the first child element
    const iconClass = open ? "minus icon" : "plus icon";

    const expandButton = ( 
        <button className="expandButton" key="expandButton" 
        onClick={()=> setOpen(!open)}
        aria-expanded={open} aria-label="Expand/Collapse Section">
            <i className={iconClass}></i>
        </button>
    )

    // Put the expand button as a clild of the first element
    const firstElementChildren = [elements[0].props.children, expandButton];
    const firstElement = React.cloneElement(elements[0], {}, firstElementChildren );

    // Put the rest of the elements into a div that will show/hide based on open state
    const collapsableStuff = (
        <div className="panel" ref={panelRef}>
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