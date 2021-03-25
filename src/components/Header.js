import React from 'react';
import {Link} from 'react-router-dom';

import GetFile from './GetFile';

class Header extends React.Component {
    render(){
        return (
            <div className="ui menu">
                <Link to='/' className="item">Home</Link>
                <div className="item">Another thing</div>
                <div className="right menu">
                    <div className="ui input">
                        <GetFile />
                    </div>
                    <div className="item">Help</div>
                </div>
            </div>           
        );
    }
}

export default Header;