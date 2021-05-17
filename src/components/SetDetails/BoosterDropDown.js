import React from 'react';

import CustomDropDown from './CustomDropDown';

function BoosterDropDown() {
    return (
        
        <CustomDropDown items={['All', 'In Boosters', 'Not In Boosters']} firstSelection= "In Boosters"/>
    )
}

export default BoosterDropDown;