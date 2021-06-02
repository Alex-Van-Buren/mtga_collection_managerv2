import React, { useState } from 'react';

function Accordion(props) {
    const [open, setOpen] = useState(false);

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
    let firstElementChild = [elements[0].props.children, expandButton];
    let firstElement = React.cloneElement(elements[0], {}, firstElementChild );

    // Put the rest of the elements into a div that will show/hide based on open state
    
    let renderElements = [firstElement, ...elements.slice(1)];

    return(
        <>
            {renderElements} 
        </>
    )
}

export default Accordion;