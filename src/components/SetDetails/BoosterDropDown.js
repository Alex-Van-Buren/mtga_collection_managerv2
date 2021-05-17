import React from 'react';

import CustomDropDown from './CustomDropDown';

function BoosterDropDown() {
    return (
        <CustomDropDown items={['All', 'In Boosters', 'Not In Boosters']} firstSelection= "All"/>
    )
}

export default BoosterDropDown;