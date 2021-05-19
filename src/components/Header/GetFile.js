import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import {
    getCollection, getPlayerInventory, processSetCollection, showHeaderModal, setHeaderModalContent
} from '../../actions';
import { NO_INVENTORY_FOUND, INVALID_FILE } from '../../errors';
import makeKeyboardClickable from '../../hooks/makeKeyboardClickable';
import '../../css/GetFile.css'

import Modal from '../Modal';

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

            // Successful
            return true;
        }

        // Alert user of invalid Player Log
        else {

            // Unsuccessful
            return false;
        }
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
        if  (matches.length > 0) {

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

            // Successful
            return true;
        }
        // Alert user of invalid Player Log
        else {

            // Unsuccessful
            return false;
        }
    }

    const handleFile = (event) =>{
    
        // Grab file from user
        const file = event.target.files[0];
    
        // Check that a valid file exists
        if (file != null && file.size > 0) {
            
            const reader = new FileReader();
            reader.readAsText(file);
            
            // After the file loads and is read by the reader
            reader.onloadend = () => {

                // Check for error reading file
                let inventoryFound = true;

                // Use functions to extract the information from player log
                inventoryFound = extractCardInventory(reader.result);
                inventoryFound = extractPlayerInventory(reader.result) && inventoryFound;

                // Show error if no inventory found
                if (!inventoryFound) {
                    
                    dispatch(setHeaderModalContent(NO_INVENTORY_FOUND));
                    dispatch(showHeaderModal(true));
                }
            }
        }
        
        // Alert user of invalid file
        else alert(INVALID_FILE);
    }

    // Make a ref
    const ref = useRef();

    return (
        <div
            className="heading" tabIndex="0" aria-roledescription="Upload Player Log File Button"
            // Send events to the input whenever the outer div is selected
            onClick={() => { if (ref.current) ref.current.click() }}
            onKeyDown={(e) => makeKeyboardClickable(e, ref)}
        >
            {/* Stop label from being clickable. Click/keyDown events sent to input via outer div. */}
            <label className="ui positive button" ref={ref} onClick={e => e.stopPropagation()}>

                <span role="button" aria-controls="filename">
                    <i className="upload icon"/>
                    Upload Log File
                </span>

                <input type="file" id="filename" onChange={handleFile} accept=".log, .txt" tabIndex="-1" />
            </label>                
        </div>
    ); 
}

export default GetFile;