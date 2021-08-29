import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from './Footer';
import Home from './Home';
import SetDetails from '../SetDetails/SetDetails';
import Help from './Help';
import DeckBuilder from '../DeckBuilder/DeckBuilder';
import PageNotFound from './PageNotFound';
import ScrollTop from './ScrollTop';
import Announcements from './Announcements';
import '../../css/App.css';

/**
 * Main Component - displays header and routes
 */
function App() {
    return (
        <Router basename="/mtga_collection_managerv2">
            <div id="contentContainer">
                <div id="keepSomeSpaceBetweenTheContentAndTheFooterAtTheBottomOfThePage">
                    <Header />
                    <Announcements/>

                    <Switch>
                        <Route exact component={Home}   path='/' />
                        <Route component={Help}         path='/help' />
                        <Route component={SetDetails}   path='/set/:setId' />
                        <Route component={DeckBuilder}  path='/deckbuilder' />
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