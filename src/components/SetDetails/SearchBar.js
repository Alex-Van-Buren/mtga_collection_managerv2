import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

    // Get initial search term from redux
    const initialSearchTerm = useSelector(state => state.displayOptions.searchTerm);

    // Update initial Search Term on first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setTerm(initialSearchTerm), []);

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
        <div className="search">
            <input
                // Data
                type="search" placeholder="Search Card Text:" className="searchBar"

                // Accessibility
                autoComplete="off" aria-describedby="searchKeyboardControls" aria-label="Search Card Text"
                aria-controls="results" autoCapitalize="none" spellCheck="false" aria-haspopup="false"
                
                // Controlled input
                value={term} onChange={ (e) => setTerm(e.target.value) }
            />
            <button className="clearSearchBar" onClick={() => setTerm("")}>x</button>
        </div>
    );
}

export default SearchBar;