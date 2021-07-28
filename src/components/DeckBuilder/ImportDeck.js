/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import getDeckCard from '../../data/getDeckCard';
import { standardSets } from '../../data/setInfo';
import { setDeck, setSideboard, changeCommander, changeCompanion } from '../../actions';

// If adding lands, unless specific card requested, add version of land from most recent set
function ImportDeck({ setModalOpen }) {

    const [importedText, setImportedText] = useState("");

    const cardCollection = useSelector(state => state.inventory.cardCollection);

    const dispatch = useDispatch();

    function onSubmit() {
        const { deck, sideboard, commander: [commander], companion: [companion] } = createSections();
        
        let deckCardsToAdd = [], sideboardCardsToAdd = [];

        // Get array of deck cards to add
        for (const { number, matches } of deck) {
            deckCardsToAdd = deckCardsToAdd.concat(pickCardsFromMatches(number, matches));
        }
        
        // Get array of sideboard cards to add
        for (const { number, matches } of sideboard) {
            sideboardCardsToAdd = sideboardCardsToAdd.concat(pickCardsFromMatches(number, matches));
        }

        // Update redux
        dispatch(setDeck(deckCardsToAdd));
        dispatch(setSideboard(sideboardCardsToAdd));
        dispatch(changeCommander(commander));
        dispatch(changeCompanion(companion));

        // Close modal
        setModalOpen(false);
    }

    /**
     * Parses imported strings, finds matching cards, and returns those sections
     */
    function createSections() {

        try {

            // Splitting lines by "\r\n" or "\n" (removing whitespace from beginning and end)
            const lines = importedText.trim().split(/\r?\n/);

            /* 
                Handles either all names sections: "Deck", "Sideboard", "Commander", & "Companion" 
                or all unnamed sections, and assumes deck is first, followed by sideboard
            */
            let deckStrings = [], sideboardStrings = [], commander = [], companion = [], deck = [], sideboard = [];

            // Handles the start of sections, inner loops handle the sections themselves
            for (let i=0; i<lines.length; i++) {
                
                // Normalize line by trimming excess space and converting to lowercase
                let line = lines[i].toLowerCase().trim();

                // Commander
                if (line === "commander") {

                    // Get following line
                    i++;

                    // Get the corresponding card for that line
                    const temp = getCards([ lines[i].toLowerCase().trim() ]);
                    commander = temp[0].matches;
                }

                // Companion
                else if (line === "companion") {

                    // Get following line
                    i++;

                    // Get the corresponding card for that line
                    const temp = getCards([ lines[i].toLowerCase().trim() ]);
                    companion = temp[0].matches;
                }

                // Deck
                else if (line === "deck") {
                        
                    // Get following line
                    i++;
                    line = lines[i] ? lines[i].toLowerCase().trim() : "";

                    // Add lines to deck until either an empty line or the end of lines is reached
                    while (line !== "" && i !== lines.length) {

                        // Add line to deck array
                        deckStrings.push(line);

                        // Get next line
                        i++;
                        line = lines[i] ? lines[i].toLowerCase().trim() : "";
                    }

                    // Get the deck cards
                    deck = getCards(deckStrings);
                }

                // Sideboard
                else if (line === "sideboard") {

                    // Get following line
                    i++;
                    line = lines[i] ? lines[i].toLowerCase().trim() : "";

                    // Add lines to sideboard until either an empty line or the end of lines is reached
                    while (line !== "" && i !== lines.length) {

                        // Add line to sideboard array
                        sideboardStrings.push(line);

                        // Get next line
                        i++;
                        line = lines[i] ? lines[i].toLowerCase().trim() : "";
                    }

                    // Get the sideboard cards
                    sideboard = getCards(sideboardStrings);
                }

                // Skip empty lines
                else if (line === "") {
                    continue;
                }

                // Otherwise assume there's no header for this section
                else {

                    // First line with no header is treated as deck
                    if (i === 0) {

                        // Add lines to deck until either an empty line or the end of lines is reached
                        while (line !== "" && i !== lines.length) {

                            // Add line to deck array
                            deckStrings.push(line);

                            // Get next line
                            i++;
                            line = lines[i] ? lines[i].toLowerCase().trim() : "";
                        }

                        // Get the deck cards (redefine if already exists)
                        deck = getCards(deckStrings);
                    }

                    // If not first line, section with no header is treated as sideboard
                    else {

                        // Add lines to sideboard until either an empty line or the end of lines is reached
                        while (line !== "" && i !== lines.length) {

                            // Add line to sideboard array
                            sideboardStrings.push(line);

                            // Get next line
                            i++;
                            line = lines[i] ? lines[i].toLowerCase().trim() : "";
                        }

                        // Get the sideboard cards
                        sideboard = getCards(sideboardStrings);
                    }
                }
            }

            return {deck, sideboard, commander, companion};

        } catch (error) {

            setImportedText("Sorry, there was an error importing that file.");
        }
    }

    /**
     * Attempt to choose only owned cards from possible matches. If not enough copies are owned, chooses duplicates
     * of most-owned version to make up the deficit.
     * 
     * @param {number} number The number of requested copies of this card.
     * @param {array} matches The possible cards to pick from. An array of card objects.
     * @returns {array} An array of cards chosen from {matches} of length {number}. Preferentially picks cards that
     * the user owns more copies of; will return only owned cards if possible.
     */
    function pickCardsFromMatches(number, matches) {

        const temp = []; // Return array

        // Return empty array when no matches found
        if (number < 1 || matches.length === 0) {
            // Do nothing here; return empty array
        }

        // If there's only one match, return array with {number} of requested cards
        else if (matches.length === 1) {

            // Push {number} of matches into return array
            for (let i=0; i<number; i++) {
                temp.push({ ...matches[0] });
            }
        }

        // If a basic land is requested, but no specific land, use most recent set
        else if (matches[0].type_line.toLowerCase().includes("basic") && 
                 matches[0].type_line.toLowerCase().includes("land"))
        {
            // Use first entry from standard sets to find the correct land to add
            const [ card ] = getDeckCard(matches[0].name, standardSets[0]);

            // Grab number requested of basic lands
            for (let i=0; i<number; i++) {
                temp.push(card);
            }
        }

        // If there are multiple matches, determine how many copied the user has of each, sort list in descending
        // order, and try to return cards the user already owns
        else {

            // Get the number of copies the user owns and add that property to each match
            for (const match of matches) {

                // Set to 0 if none owned
                const numOwned = cardCollection && cardCollection[match.arenaId] ? cardCollection[match.arenaId]: 0;
                match.numOwned = numOwned;
            }

            // Sort in descending order of number owned
            matches.sort((a, b) => b.numOwned - a.numOwned);

            // Add requested cards to temp if owned
            for (const match of matches) {

                // Get number still needed
                const numNeeded = number - temp.length;

                // Check if done
                if (numNeeded <= 0) {
                    break;
                }

                // Else see if more copies available
                if (match.numOwned === 0) { // Sorted, so break at first instance of 0 copies
                    break;
                }

                // Case where we have enough copies of this match to finish
                if (match.numOwned >= numNeeded) {

                    for(let i=0; i<numNeeded; i++) {
                        temp.push(match);
                    }

                    // Done
                    break;
                }

                // Case where we have DON'T have enough copies of this match to finish
                // Add as many as possible, and move to next match
                for(let i=0; i<match.numOwned; i++) {
                    temp.push(match);
                }
            }

            // Make up deficit with match user owns the most of (not enough copies owned)
            const numNeeded = number - temp.length;
            for(let i=0; i<numNeeded; i++) {
                temp.push(matches[0]);
            }
        }

        // Change some properties while importing
        for (const card of temp) {
            if (card.set.toLowerCase() === "dar") {
                card.set = "dom";
            }
        }

        // Return matching cards
        return temp;
    }

    /**
     * Takes an array of strings that describe cards for a deck (e.g. "10 Forest (M20) 278" or just "10 Forest")
     * and returns an array of objects containing the number of cards requested (e.g. 10) and an array of matching
     * card objects, "matches"
     * - matches array contains only one card if set and collector number are specified and correct.
     * - matches array may contain multiple cards when only number and name are specified, or if set and collector
     * number yielded no results.
     * 
     * @param {array} deckStringsArray The array of strings to parse
     * @returns Array of objects. [ { number, matches: [] }, {...}, ... ]
     * - number: The number of cards requested (zero for no matches).
     * - matches: An array of matching cards (empty array for no matches).
     */
    function getCards(deckStringsArray) {

        // Regex that parses number of cards, name, set, and collection_number
        const regex4 = /(\d+)\s+(.+\S)\s+\((\w{3,4})\)\s+(\d+)/;
        
        // Regex that parses number of cards, name, and set
        const regex3 = /(\d+)\s+(.+\S)\s+\((\w{3,4})\)/;

        // Regex that parses number of cards and name only
        const regex2 = /(\d+)\s+(.+\S)/;

        // Intended to be called on a section of the whole decklist like "deck" or "sideboard"
        const sectionCards = []; // Array of objects: [{ number, matches }, ...]

        // Use regex to extract card info and find matching card(s)
        for (const line of deckStringsArray) {

            // Skip lines that aren't strings
            if (typeof line !== "string") {
                continue;
            }

            // Check if line has all of (number of cards, name, set, and collection_number)
            let match = line.match(regex4);

            // Check if line has all of (number of cards, name, and set), but not collection_number
            if (!match) {
                match = line.match(regex3);
            }

            // Backup when line only has number of cards and name
            if (!match) {
                match = line.match(regex2);
            }

            // Find matching card(s) if there is a match
            const cards = match? getDeckCard(match[2], match[3], match[4]) : [];

            // Add the number of cards and the matching cards to the deckCards array
            sectionCards.push({ "number": match && match[1]? parseInt(match[1], 10) : 0, "matches": cards });
        }

        return sectionCards;
    }

    async function fromFile() {
        try {
    
            // Specify text file type
            const options = {
                types: [{ description: 'Text Files', accept: {'text/plain': ['.txt']} }]
            };

            // Get FileSystemFileHandle from the file picker, chosen from text files
            let [file] = await window.showOpenFilePicker(options);

            // Get the text file from the FileSystemFileHandle
            file = await file.getFile();

            // Get the text from the file
            file = await file.text();

            setImportedText(file);
            
        } catch (error) {

            setImportedText("Sorry, there was an error importing that file.");
        }
    }

    return (
        <div id="importExportContent">
            <h1>Import Deck</h1>

            <h3>Preview/Copy & Paste:</h3>
            <textarea 
                id="deckPreview" value={importedText} onChange={e => setImportedText(e.target.value)} spellCheck="false"
            />

            <div id="fileOrClipboardButtons">

                <button onClick={fromFile}>
                    Import from File
                </button>

                <button onClick={onSubmit}>
                    <strong>Submit</strong>
                </button>
            </div>
        </div>
    );
}

export default ImportDeck;
