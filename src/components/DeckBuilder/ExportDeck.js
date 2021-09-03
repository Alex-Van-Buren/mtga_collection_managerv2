import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

/**
 * The content in the export modal. Contains a preview of the exported deck, save to file button,
 * and copy to clipboard button.
 */
function ExportDeck() {

    const { deckMap, sideboardMap, commander, companion } = useSelector(state => state.deckBuilder);

    const [saveClipboard, setSaveClipboard] = useState("Copy to Clipboard");
    const [saveFile,      setSaveFile]      = useState("Save to File");

    /**
     * Iteratively build deck string output
     */
    const toString = useMemo(() => {
        let deckOutput = '';
        
        // Add deck
        if (Object.keys(deckMap).length) {
            deckOutput += 'Deck\n';

            deckOutput += deck_sideboardOutput(deckMap);
        }

        // Add sideboard
        if (Object.keys(sideboardMap).length) {
            deckOutput += '\nSideboard\n';

            deckOutput += deck_sideboardOutput(sideboardMap);
        }

        // Add commander
        if (commander) {
            deckOutput += '\nCommander\n';
            deckOutput += commander_companionOutput(commander);
        }

        // Add companion
        if (companion) {
            deckOutput += '\nCompanion\n';
            deckOutput += commander_companionOutput(companion);
        }

        return deckOutput;
    }, [commander, companion, deckMap, sideboardMap]);

    /**
     * Gets string for deckMap and sideboardMap
     */
    function deck_sideboardOutput(inputMap) {

        let deckOutput = '';

        // Iterate through each card name in imputMap
        for (let [name, ids] of Object.entries(inputMap)) {
            
            // Iterate through each arenaId of that card name and add it to deckOutput string
            for (const card of Object.values(ids)) {

                // Only list number and name for "pana" and other 4+ letter set codes, or collector numbers
                // with letters, because the game doesn't import them correctly
                if (card.set.length > 3 || /.*[A-Za-z].*/.test(card.col_num)) {

                    // Ex output: 4 Llanowar Elves
                    deckOutput += `${card.copies} ${name}\n`;
                }

                else {
                    
                    // Ex output: 4 Clearwater Pathway (ZNR) 260
                    deckOutput += `${card.copies} ${name} (${card.set.toUpperCase()}) ${card.col_num}\n`;
                }
            }
        }

        return deckOutput;
    }

    /**
     * Get string for commander and/or companion
     */
    function commander_companionOutput(card) {

        let deckOutput = '';

        if (card.set.length > 3 || /.*[A-Za-z].*/.test(card.collector_number)) {
            deckOutput += `1 ${card.name}\n`;
        }

        else {
            deckOutput += `1 ${card.name} (${card.set.toUpperCase()}) ${card.collector_number}\n`;
        }

        return deckOutput;
    }

    /**
     * Copies deck to clipboard
     */
    function toClipboard() {
        const deckString = toString;

        // Write deck to clipboard
        navigator.clipboard.writeText(deckString).then(() => {

            // Update button text
            setSaveClipboard("Copied!");
        });
    }

    /**
     * Saves deck to txt file
     */
    async function toFile() {

        try {
            // Get deck as a string
            const deckString = toString;
    
            // Get location to save file from user
            const options = {
                suggestedName: `deck_${new Date().toISOString().replace(/\..+/g, "").replace(/[T:-]/g, "")}.txt`,
                types: [{ description: 'Text Files', accept: {'text/plain': ['.txt']} }]
            };
            const fileLocation = await window.showSaveFilePicker(options);
    
            // Create a FileSystemWritableFileStream to write to.
            const writable = await fileLocation.createWritable();
    
            // Write the deckString to the stream.
            await writable.write(deckString);
    
            // Close the file and write the contents to disk.
            await writable.close();
    
            // Update button text
            setSaveFile("Saved!");
            
        } catch (error) {

            // Update button text
            setSaveFile("Did not Save");
        }
    }
    
    return (
        <div id="importExportContent">
            <h1>Export Deck</h1>

            <h3>Preview:</h3>
            <p id="deckPreview">{toString}</p>

            <div id="fileOrClipboardButtons">

                <button onClick={toFile}>
                    {saveFile}
                </button>

                <button onClick={toClipboard}
                >
                    {saveClipboard}
                </button>
            </div>
        </div>
    );
}

export default ExportDeck;
