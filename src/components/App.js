import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header/Header';
import Footer from './Footer';
import Home from './Home';
import SetDetails from './SetDetails/SetDetails';
import Help from './Help';
import DeckBuilder from '../components/DeckBuilder/DeckBuilder';
import PageNotFound from './PageNotFound';
import ScrollTop from './ScrollTop';
import '../css/App.css';

/**
 * Main Component - displays header and routes
 */
function App() {
    return (
        <Router >
            <div id="contentContainer">
                <div id="keepSomeSpaceBetweenTheContentAndTheFooterAtTheBottomOfThePage">
                    <Header />

                    <Switch>
                        <Route exact component={Home}   path='/mtga_collection_managerv2/' />
                        <Route component={Help}         path='/mtga_collection_managerv2/help' />
                        <Route component={SetDetails}   path='/mtga_collection_managerv2/set/:setId' />
                        <Route component={DeckBuilder}  path='/mtga_collection_managerv2/deckbuilder' />
                        <Route component={PageNotFound} />
                    </Switch>

                    <ScrollTop />
                </div>

                <div id="thisIsTheDivThatKeepsTheFooterAtTheBottomOfThePage">
                    <Footer />
                </div>
            </div>
        </Router>
    );
}

export default App;