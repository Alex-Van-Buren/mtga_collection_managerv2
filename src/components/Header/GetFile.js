import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { getCollection, getPlayerInventory, processSetCollection } from '../../actions';
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

        // Make empty player inventory for initial load
        const emptyPlayerInventory = {wcCommon: 0, wcUncommon: 0, wcRare: 0, wcMythic: 0, gold: 0, gems: 0, vaultProgress: 0, boosters: []};
        dispatch( getPlayerInventory(emptyPlayerInventory));
    },
    [dispatch]); // Only updates if dispatch changes value. Just here to make ESLint happy

    /**
     * Uses regular expression to extract card inventory from player log
     * @param {*} file Result from the file reader
     */
    function extractCardInventory(file) {

        // Define the Regex to get all owned arena cards
        const cardRegex = /GetPlayerCards.+payload.+({[\d":,]+})/g;
                
        // Use regex to extract the inventory data from the log
        const matches = [...file.matchAll(cardRegex)];

        // Check if regex returned valid data
        if (matches.length > 0) {

            // Get the last match in the file
            const match = matches[matches.length-1];

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

    /**
     * Uses regular expression to extract player inventory from player log
     * @param {*} file Result from the file reader
     */
    function extractPlayerInventory(file) {

        // Define Regex to get the player inventory
        const inventoryRegex = /GetPlayerInventory.+payload.+("wcCommon":\d*).*("wcUncommon":\d*).*("wcRare":\d*).*("wcMythic":\d*).*("gold":\d*).*("gems":\d*).*("vaultProgress":[\d.]*).*("boosters":\[[\w{}:",]*\])/g;

        // Use regex on the file - finds all matches
        const matches = [...file.matchAll(inventoryRegex)];
        
        // Check if regex returned valid data
        if  (matches.length > 0 ) {

            // Only use the last match in the file
            const match = matches[matches.length-1];
            
            // Make the JSON by composing strings
            let playerInventoryString = "{";

            for (let i=1; i<=8; i++) {
                playerInventoryString += match[i];
                if (i !== 8) {
                    playerInventoryString += ",";
                }
            }
            playerInventoryString += "}";

            // Parse the JSON (String)
            const playerInventory = JSON.parse(playerInventoryString);
            
            // Dispatch playerInventory to Redux
            dispatch(getPlayerInventory(playerInventory));
        }
        // Alert user of invalid Player Log
        else alert(NO_INVENTORY_FOUND);
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