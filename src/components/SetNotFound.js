import React from 'react';

import U from '../images/color_imgs/U.svg';
import G from '../images/color_imgs/G.svg';
import '../css/PageNotFound.css';

function SetNotFound() {
    return (
        <div className="pageNotFound">
            <img src={U} alt="Blue" />
            <h1>404 Set Not Found</h1>
            <img src={G} alt="Green" />
        </div>
    );
}

export default SetNotFound;