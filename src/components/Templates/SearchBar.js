import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSearchTerm, setSearchType } from '../../actions';
import CustomDropdown from './CustomDropdown';
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
    const initialSearchType = useSelector(state => state.displayOptions.searchType);

    // Update initial Search Term and Type on first load
    useEffect(() => {
        setTerm(initialSearchTerm);
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

    const searchTypes = {Normal: null, Name: "name", "Type line": "type_line", Text: 'oracle_text'};
    
    // Function that is put into dropdown to select a search term and update redux
    function searchTypeSelect(item) {
        dispatch(setSearchType(searchTypes[item]));
    }
    
    // Function that returns the key that the corresponding value is attributed to
    function getKeyByValue(object, val) {
        return Object.keys(object).find(key => object[key] === val);
    }
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
            <CustomDropdown 
                items={Object.keys(searchTypes)} key={`SearchType ${initialSearchType}`} 
                firstSelection={getKeyByValue(searchTypes, initialSearchType)} 
                selectfn={searchTypeSelect}
            />
        </div>
    );
}

export default SearchBar;