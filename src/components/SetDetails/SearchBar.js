import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setSearchTerm } from '../../actions';
import '../../css/SearchBar.css';

/**
 * Updates redux state with searchTerm from search bar input
 * @returns Search bar JSX
 */
function SearchBar() {
    
    // Track current search term for controlled input
    const [term, setTerm] = useState("");

    // Get access to dispatch
    const dispatch = useDispatch();

    // Clear any search term in state on render
    useEffect(() => dispatch(setSearchTerm("")), [dispatch]);

    // Send search term to redux
    function onSubmit(event) {
        event.preventDefault();

        dispatch(setSearchTerm(term));
    }

    // Handle change in search bar
    function onChange(event) {
        const currentTerm = event.target.value;

        // Always update controlled input
        setTerm(currentTerm);

        // Look for the user clearing the input
        if (currentTerm === "") {
            dispatch(setSearchTerm(""));
        }
    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <input
                // Data
                type="search" placeholder="Search card names:" className="searchBar"
    
                // Accessibility
                autoomplete="off" aria-describedby="searchKeyboardControls" aria-label="Search Card Names"
                aria-controls="results" autoCapitalize="none" spellCheck="false" aria-haspopup="false"
                
                // Controlled input
                value={term} onChange={ (e) => onChange(e) }
            />
        </form>
    );
}

export default SearchBar;