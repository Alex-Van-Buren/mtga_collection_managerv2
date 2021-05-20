import React from 'react';

import Custombutton from './CustomButton';
import { resetDisplayOptions } from '../../actions';

function Reset() {
    const resetBtnClass = 'ui primary button';
    return(
        <Custombutton value="Reset" action={resetDisplayOptions} className={resetBtnClass} />
    )
}

export default Reset;