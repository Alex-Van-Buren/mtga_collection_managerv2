import React from 'react';

import CustomDropdown from '../Templates/CustomDropdown';

function CMCDropdowns() {
    const items = ['Any', 0,1,2,3,4,5,6,7,8,9,10];
    return (
        <CustomDropdown items={items} firstSelection="Any"/>
    )
}

export default CMCDropdowns;