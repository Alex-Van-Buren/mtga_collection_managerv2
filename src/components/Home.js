import React, { useEffect, useState } from 'react';
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
 * Helper function to stop React from rerendering continuously upon window resize
 */
 function debounce(func, delay) {
    let timer;
    return (() => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            func.apply(this, arguments);
        }, delay);
    });
}

/**
 * Home Page Component - Displays current card sets and other general info/options
 */
function Home() {

    // Use local state to track window size
    const [size, setSize] = useState({ width: window.innerWidth });

    // useEffect refreshes component upon window resize
    useEffect(() => {
        const debouncedResize = debounce(() => {
            setSize({ width: window.innerWidth });
        }, 400)

        window.addEventListener('resize', debouncedResize);

        // Clean up
        return (() => { window.removeEventListener('resize', debouncedResize) });
    });

    // Choose how many cards to show based on window size
    let numCards = "four"; // Default to full width
    if (size.width < 500)
        numCards = "one"
    else if (size.width < 850)
        numCards = "two";
    else if (size.width < 1200)
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