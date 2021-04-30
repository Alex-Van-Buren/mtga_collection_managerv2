import React, {useState} from 'react';

import '../css/DropDown.css'

function DropDown(props) {
    const [open, setOpen] = useState(false);
    return (
        <div className="dd-title" onClick={() => setOpen(!open)}>{props.title} <i className={open ? "icon chevron up" : "icon chevron down"}></i>
            <ul className={open ? "dd-items" : "dd-items hidden"}>
                <li className="dd-item">Eldraine</li>
                <li className="dd-item">Strixhaven</li>
                <li className="dd-item">Ikoria</li>
            </ul>
        </div>
    )
}

export default DropDown;