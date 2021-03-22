import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import GetFile from './GetFile';
import Home from './Home';
import SetDetails from './SetDetails';



class App extends React.Component {
    render() {
        return (
            <Router >
                <GetFile />
                <Route exact component={Home} path='/' />
                <Route component={SetDetails} path='/set/:setId' />

            </Router>
        );
    }
}

export default App;