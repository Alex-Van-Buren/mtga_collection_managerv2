import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { getCollection, processSetCollection } from '../actions';
import { NO_INVENTORY_FOUND, INVALID_FILE } from '../errors';
import '../css/GetFile.css'

// const sets = ['eld', 'thb', 'iko', 'm21', 'znr', 'khm'];
// const sets = ['znr'];

function GetFile(props) {

    // Get access to Redux dispatch function
    const dispatch = useDispatch();

    // Initial card set processing. Loads null values into Redux state
    useEffect( () => {

        // Get and process initially empty card set
        dispatch( getCollection(null) );
        dispatch( processSetCollection(null) );
    },
    [dispatch]); // Only updates if dispatch changes value. Just here to make ESLint happy

    const handleFile = (event) =>{
    
        // Grab file from user
        const file = event.target.files[0];
    
        // Check that a valid file exists
        if (file != null && file.size > 0) {
            
            const reader = new FileReader();
            reader.readAsText(file);
            
            // After the file loads and is read by the reader
            reader.onloadend = () =>{

                // Define the Regex 
                const cardRegex = /(?<=UnityCrossThreadLogger\]<== PlayerInventory\.GetPlayerCards.+payload.+)\{.*\}(?=})/g;
                
                // Use regex to extract the inventory data from the log
                const match = cardRegex.exec(reader.result);
    
                // Check if regex returned valid data
                if( match && match[0]){

                    // Parse the data into a JSON that can be more easily manipulated
                    const inventory = JSON.parse(match[0]);
        
                    // Use getCollection action creator to put the basic inventory into Redux
                    dispatch( getCollection(inventory) );
                    
                    // Put processed set information into Redux                
                    dispatch( processSetCollection(inventory) );
                }

                // Alert user of invalid Player Log
                else alert(NO_INVENTORY_FOUND);
            }
        }
        
        // Alert user of invalid file
        else alert(INVALID_FILE);
    }

    // Make a ref
    const ref = useRef();

    function makeAccessible(e){
        // If they hit enter
        if (e.key === "Enter") {
            // Prevent the default action, otherwise it gets clicked twice
            e.preventDefault();
            console.log(ref);
            
            ref.current.click();
        }
    }

    return (
        <div className="item ">
            <label className="ui positive button" ref={ref}>
                <span role="button" aria-controls="filename" tabIndex="0" onKeyDown={(e) => makeAccessible(e)}>
                    <i className="upload icon"></i>
                    Upload Log File
                </span>
                <input type="file"  onChange={handleFile} accept=".log, .txt" />
                
            </label>                
        </div>
    ); 
}

export default GetFile;