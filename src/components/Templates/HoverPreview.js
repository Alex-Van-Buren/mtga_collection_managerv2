import React from 'react';
import { createPortal } from 'react-dom';

import '../../css/HoverPreview.css'

function HoverPreview({ imgs, show=true, x, y }) {

    let renderImages = null;
    if (show) {

        const style = { left: x, top: y };

        renderImages = <div className="hoverPreviewDiv" style={style}>
            <img src={imgs.front} alt="hoverPreviewFrontImg" className="hoverPreviewImg"/>
            {imgs.back ? <img src={imgs.back} alt="hoverPreviewBackImg" className="hoverPreviewImg" /> : null}
        </div>
    }

    return createPortal(
        renderImages,
        document.getElementById("hoverPreview")
    );
}

export default HoverPreview;
