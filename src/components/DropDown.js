import React, {useState} from 'react';

import useResizeWidth from '../hooks/useResizeWidth';
import '../css/DropDown.css'

function DropDown(props) {
    const [open, setOpen] = useState(false);

    let titleClass = "dd-title " + props.extraClass;
    if (open) {
        titleClass +=" active";
    }
    const items = (
    <div className={open ? "dd-items" : "dd-items hidden"}>
        <div className="dd-item ">Eldraine</div>
        <div className="dd-item">Strixhaven</div>
        <div className="dd-item">Ikoria</div>

    </div>)

    let hamburgerItems, normalItems ;
    const width = useResizeWidth();
    if ( width <= 739 ) {
        hamburgerItems = items;
        normalItems = null;
    } else {
        hamburgerItems = null;
        normalItems = items;
    }

    return (
        <>
        
            <div className={titleClass} onClick={() => setOpen(!open)}>{props.title} <i className={open ? "icon chevron up" : "icon chevron down"}></i>
                {normalItems}
            </div>
            {hamburgerItems}
        </>
    )
}

export default DropDown;