import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { getCollection, processSetCollection } from '../../actions';
import { NO_INVENTORY_FOUND, INVALID_FILE } from '../../errors';
import makeKeyboardClickable from '../../hooks/makeKeyboardClickable';
import '../../css/GetFile.css'

// const sets = ['eld', 'thb', 'iko', 'm21', 'znr', 'khm'];
// const sets = ['znr'];

function GetFile() {

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

    return (
        <div className="item ">
            <label className="ui positive button" ref={ref}>
                <span role="button" aria-controls="filename" tabIndex="0" onKeyDown={(e) => makeKeyboardClickable(e, ref)}>
                    <i className="upload icon"></i>
                    Upload Log File
                </span>
                <input type="file" id="filename" onChange={handleFile} accept=".log, .txt" tabIndex="-1" />
                
            </label>                
        </div>
    ); 
}

export default GetFile;