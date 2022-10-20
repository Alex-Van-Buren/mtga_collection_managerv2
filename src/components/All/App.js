import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
// import Announcements from './Announcements';
import ScrollTop from './ScrollTop';
import Footer from './Footer';
import '../../css/App.css';

const Home = lazy(() => import('./Home'));
const Help = lazy(() => import('./Help'));
const SetDetails = lazy(() => import('../SetDetails/SetDetails'));
const DeckBuilder = lazy(() => import('../DeckBuilder/DeckBuilder'));
const PageNotFound = lazy(() => import('./PageNotFound'));

/**
 * Main Component - displays header and routes
 */
function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div id="contentContainer">
                <div id="keepSomeSpaceBetweenTheContentAndTheFooterAtTheBottomOfThePage">
                    <Header />
                    {/* <Announcements/> */}

                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route exact component={Home}   path='/' />
                            <Route component={Help}         path='/help' />
                            <Route component={SetDetails}   path='/set/:setId' />
                            <Route component={DeckBuilder}  path='/deckbuilder' />
                            <Route component={PageNotFound} />
                        </Switch>
                    </Suspense>

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