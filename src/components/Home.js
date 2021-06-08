import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import SetCard from './SetCard';
import { standardSets, historicSets } from '../data/setInfo';
import useResizeWidth from '../hooks/useResizeWidth';
import '../css/Home.css';

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


    // State determines whether to show standard or historic sets
    const [showStandard, setShowStandard] = useState(true);

    // Use local storage to decide whether to show standard or historic sets
    useEffect(() => {
        // Get value from local storage
        const standardPreference = window.localStorage.getItem("showStandard");

        if (standardPreference === "false") {
            setShowStandard(false);
        }
        else {
            setShowStandard(true);
        }
    }, []);

    // Use shown sets to determine title
    const collectionTitle = showStandard ? "Standard Collection" : "Historic Collection";

    // Render the standard/historic toggle
    const renderToggle = (
        <div
            // Accessibility
            id="standardToggle" tabIndex="0"
            onKeyDown={ e => {if (e.key === "Enter") toggleStandard(showStandard)} }
            role="checkbox" aria-checked={!showStandard} aria-label="Standard Mode Toggle"
        >
            <div id="standardLabel">Standard</div>

            {/* Standard/Historic Toggle */}
            <div className="ui fitted toggle checkbox" id="labelColorStandardToggle">
                <input 
                    type="checkbox" name="StandardToggle" id="StandardToggle" tabIndex="-1"
                    checked={!showStandard} onChange={() => toggleStandard(showStandard)}
                />
                <label tabIndex="-1"></label>
            </div>

            <div id="historicLabel">Historic</div>
        </div>
    );

    /**
     * Toggles between standard and historic modes
     * @param {boolean} standardEnabled True when standard is enabled
     */
    function toggleStandard(standardEnabled) {
        if (standardEnabled) {

            setShowStandard(false);
            window.localStorage.setItem("showStandard", "false");
        } else {

            setShowStandard(true);
            window.localStorage.setItem("showStandard", "true");
        }
    }

    /**
     * Outputs JSX for each of the card sets to be displayed
     */
    function renderSets() {

        const sets = showStandard ? standardSets : historicSets;
        
        // Create each card set Component based on 'sets' input
        const setCards = sets.map( (setId) => {
            const path = `/mtga_collection_managerv2/set/${setId}`;

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

    return(
        <>
            {renderToggle}

            <div className="ui container">
                <div className="ui huge center aligned header">{collectionTitle}</div>

                <div className={`ui ${numCards} cards`}>
                    {renderSets()}
                </div>
            </div>
        </>
    );
}

export default Home;