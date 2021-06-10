import React from 'react';
import { Link } from 'react-router-dom';

import '../css/Footer.css';

function Footer() {
    return (
        <div id="footer">

            <div id="copyrightAndContactUs">

                <div id="footerLinks">

                    <Link to="/">Home</Link>
                    &emsp;

                    <Link to="/help">Help</Link>

                    &emsp;

                    {/* Discord Link */}
                    <a href="https://discord.gg/H2cTG8nekF" target="_blank" rel="noreferrer">Join the Discord</a>

                    &emsp;
                </div>

                {/* Copyright */}
                <div>
                    <p>© 2021 Alex Van Buren and Nate Sackett. All rights reserved.</p>
                </div>
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