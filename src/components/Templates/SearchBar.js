import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSearchTerm, setSearchType } from '../../actions';
import '../../css/SearchBar.css';

/**
 * Updates redux state with searchTerm from search bar input
 * @returns Search bar JSX
 */
function SearchBar() {
    
    // Track current search term for controlled input
    const [term, setTerm] = useState("");
    const [type, setType] = useState(null);
    const [typeIndex, setTypeIndex] = useState(0); //TODO: temporary = use dropdown instead

    // Get access to dispatch
    const dispatch = useDispatch();

    // Get initial search term from redux
    const initialSearchTerm = useSelector(state => state.displayOptions.searchTerm);
    const initialSearchType = useSelector(state => state.displayOptions.searchType);

    // Update initial Search Term and Type on first load
    useEffect(() => {
        setTerm(initialSearchTerm);
        setType(initialSearchType);
    }, [initialSearchTerm, initialSearchType]);

    // Track change in search bar (debounced)
    useEffect(() => {

        // Wait for user to stop typing
        const timeoutid = setTimeout( () => {
            dispatch(setSearchTerm(term));
        }, 500);

        // Cleanup function to stop search
        return () => clearTimeout(timeoutid);
    }, [term, dispatch]);

    // Track change in search type (not debounced)
    useEffect(() => dispatch(setSearchType(type)), [type, dispatch]);

    const searchTypes = [null, "name", "type_line", "oracle_text"]; //TODO: temporary = use dropdown instead

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
            <button className="clearSearchBar" onClick={() => setTerm("")}><i className="close icon"/></button>
            <button className="advancedSearchBar" onClick={() => {
                //TODO: temporary = use dropdown instead
                let index = typeIndex+1;
                if (index >= searchTypes.length) {
                    index = 0;
                }

                setTypeIndex(index);
                setType(searchTypes[index]);
            }}><i className="cog icon"/>{searchTypes[typeIndex]}</button>
        </div>
    );
}

export default SearchBar;