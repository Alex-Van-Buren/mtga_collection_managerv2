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

    // Track change in search bar
    useEffect(() => {

        // Wait for user to stop typing
        const timeoutid = setTimeout( () => {
            dispatch(setSearchTerm(term));
        }, 500);

        // Cleanup function to stop search
        return () => clearTimeout(timeoutid);
    }, [term, dispatch])

    return (
        <input
            // Data
            type="search" placeholder="Search card names:" className="searchBar"

            // Accessibility
            autoomplete="off" aria-describedby="searchKeyboardControls" aria-label="Search Card Names"
            aria-controls="results" autoCapitalize="none" spellCheck="false" aria-haspopup="false"
            
            // Controlled input
            value={term} onChange={ (e) => setTerm(e.target.value) }
        />
    );
}

export default SearchBar;