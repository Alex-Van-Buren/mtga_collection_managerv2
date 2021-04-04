import React from 'react';
import { Link } from 'react-router-dom';

import SetCard from './SetCard';

/**
 * Outputs JSX for each of the card sets to be displayed
 * - Current default sets are: 'eld', 'thb', 'iko', 'm21', 'znr', & 'khm'
 */
function renderSets(sets = ['eld', 'thb', 'iko', 'm21', 'znr', 'khm']) {

    // sets = ['znr'];
    
    // Create each card set Component based on 'sets' input
    const setCards = sets.map( (setId) => {
        const path = `/set/${setId}`;

        return (
            <div className="ui link card" key={setId}>
                <Link to={path}>
                    <SetCard setId={setId} key={setId}/>
                </Link>
            </div>
        );
    });
    
    return (setCards);
}

/**
 * Home Page Component - Displays current card sets and other general info/options
 */
function Home() {
    return(
        <div className="ui container">
            <div className="ui huge center aligned header ">Standard Collection</div>
            <div className="ui four stackable cards">
                {renderSets()}
            </div>
        </div>
    );
}

export default Home;