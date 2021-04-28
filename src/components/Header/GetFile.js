import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { getCollection, processSetCollection } from '../../actions';
import { NO_INVENTORY_FOUND, INVALID_FILE } from '../../errors';
import makeKeyboardClickable from '../../hooks/makeKeyboardClickable';
import '../../css/GetFile.css'

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

    /**
     * Uses regular expression to extract card inventory from player log
     * @param {*} file Result from the file reader
     */
    function extractCardInventory(file) {

        // Define the Regex (can't use backlookup because of safari)
        const cardRegex = /\[UnityCrossThreadLogger\]<== PlayerInventory\.GetPlayerCards.+payload.+({.*})\}/g;
                
        // Use regex to extract the inventory data from the log
        const match = cardRegex.exec(file);

        // Check if regex returned valid data
        if( match && match[1]){

            // Parse the data into a JSON that can be more easily manipulated
            const inventory = JSON.parse(match[1]);

            // Use getCollection action creator to put the basic inventory into Redux
            dispatch( getCollection(inventory) );
            
            // Put processed set information into Redux                
            dispatch( processSetCollection(inventory) );
        }

        // Alert user of invalid Player Log
        else alert(NO_INVENTORY_FOUND);
    }

    function extractPlayerInventory(file) {

        // Define Regex
        const inventoryRegex = /PlayerInventory\.GetPlayerInventory.+payload.+("wcCommon":\d*).*("wcUncommon":\d*).*("wcRare":\d*).*("wcMythic":\d*).*("gold":\d*).*("gems":\d*).*("vaultProgress":[\d.]*).*("boosters":\[.*?\])/g;

        // Use regex on the file
        const match = inventoryRegex.exec(file);
        console.log(match);

        // Check if regex returned valid data
        if ( match && match[1]) {

            for(let i = 1; i<=8; i++){
                console.info(match[i]);
            }
        }
        else alert('extractPlayerInventory found nothing');
    }

    const handleFile = (event) =>{
    
        // Grab file from user
        const file = event.target.files[0];
    
        // Check that a valid file exists
        if (file != null && file.size > 0) {
            
            const reader = new FileReader();
            reader.readAsText(file);
            
            // After the file loads and is read by the reader
            reader.onloadend = () =>{

                // Use functions to extract the information from player log
                extractCardInventory(reader.result);
                extractPlayerInventory(reader.result);
                
            }
        }
        
        // Alert user of invalid file
        else alert(INVALID_FILE);
    }

    // Make a ref
    const ref = useRef();

    return (
        <div className="heading">
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