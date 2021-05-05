import React from 'react';

import '../css/Footer.css';

function Footer() {
    return (
        <div id="footer">

            {/* Copyright */}
            <div>
                <p>© 2021 Alex Van Buren and Nate Sackett. All rights reserved.</p>
            </div>

            {/* MTG Copyright */}
            <div id="mtgCopyright">
                &nbsp; MTGA Collection Manager is unofficial Fan Content permitted under the Fan Content Policy.
                &nbsp; Not approved/endorsed by Wizards.
                &nbsp; Portions of the materials used are property of Wizards of the Coast.
                &nbsp; © Wizards of the Coast LLC.
            </div>
        </div>
    );
}

export default Footer;