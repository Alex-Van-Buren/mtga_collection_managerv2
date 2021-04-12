import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import SetDetails from './SetDetails/SetDetails';
import '../css/App.css';

/**
 * Main Component - displays header and routes
 */
function App() {
    return (
        <Router >
            <Header />
            <Switch>
                <Route exact component={Home} path='/' />
                <Route component={SetDetails} path='/set/:setId' />
            </Switch>
        </Router>
    );
}

export default App;