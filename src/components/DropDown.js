import React, {useState} from 'react';

import '../css/DropDown.css'

function DropDown(props) {
    const [open, setOpen] = useState(false);

    let titleClass = "dd-title " + props.extraClass;
    if (open) {
        titleClass +=" active";
    }

    return (
        <>
        
        <div className={titleClass} onClick={() => setOpen(!open)}>{props.title} <i className={open ? "icon chevron up" : "icon chevron down"}></i>            
        </div>
        <div className={open ? "dd-items" : "dd-items hidden"}>
            <div className="dd-item ">Eldraine</div>
            <div className="dd-item">Strixhaven</div>
            <div className="dd-item">Ikoria</div>
        
        </div>
        </>
    )
}

export default DropDown;