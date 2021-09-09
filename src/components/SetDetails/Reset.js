import React from 'react';

import Custombutton from '../Templates/CustomButton';
import { resetDisplayOptions } from '../../actions';
import '../../css/Reset.css';

function Reset() {
    const resetBtnClass = 'ui button positive reset-button';
    return(
        <Custombutton value="Reset" action={resetDisplayOptions} className={resetBtnClass} />
    )
}

export default Reset;