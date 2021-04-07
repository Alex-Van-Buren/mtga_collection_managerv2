import React from 'react';

import ColorCheckbox from './ColorCheckbox';

export default function ColorCheckboxes() {

    // List card colors and create color checkboxes for each
    const colors = ['white', 'blue', 'black', 'red', 'green', 'multi', 'colorless'];
    const renderColors = colors.map(color => <ColorCheckbox color={color} key={color} />)

    return (
        
        // Checkboxes for color: White, Blue, Black, Red, Green, All Multicolored, Colorless
        <div>
            <label htmlFor="color">Color(s):</label>
            {renderColors}
        </div>
    );
}
