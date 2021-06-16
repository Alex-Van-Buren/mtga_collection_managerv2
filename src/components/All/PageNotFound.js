import React from 'react';

import B from '../../images/color_imgs/B.svg';
import R from '../../images/color_imgs/R.svg';
import '../../css/PageNotFound.css';

function PageNotFound() {
    return (
        <div className="pageNotFound">
            <img src={R} alt="Red" />
            <h1>404 Page Not Found</h1>
            <img src={B} alt="Black" />
        </div>
    );
}

export default PageNotFound;