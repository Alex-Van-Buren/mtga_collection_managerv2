import React from 'react';
import { Link } from 'react-router-dom';

import SetCard from './SetCard';
import { standardSets as sets } from '../data/setInfo';
import useResizeWidth from '../hooks/useResizeWidth';

/**
 * Outputs JSX for each of the card sets to be displayed
 * - Current default sets are: 'eld', 'thb', 'iko', 'm21', 'znr', & 'khm'
 */
function renderSets() {
    
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

    // Use custom hook to get current window width. Updates whenever window width changes
    const width = useResizeWidth();

    // Choose how many cards to show based on window size
    let numCards = "four"; // Default to full width
    if (width < 580)
        numCards = "one"
    else if (width < 992)
        numCards = "two";
    else if (width < 1200)
        numCards = "three";

    return(
        <div className="ui container">
            <div className="ui huge center aligned header">Standard Collection</div>
            <div className={`ui ${numCards} cards`}>
                {renderSets()}
            </div>
        </div>
    );
}

export default Home;