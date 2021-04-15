import React from 'react';
import { createPortal } from 'react-dom';

function Modal(props) {
    return createPortal(
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            
            <div onClick={e => e.stopPropagation()} className="ui standard modal visible active">
                <div className="header">{props.title}</div>
                <div className="content">{props.content}</div>
                <div className="actions">{props.actions}</div>
            </div>

        </div>,
        document.getElementById("modal") // Render to modal div on body
    ); 
}

export default Modal;