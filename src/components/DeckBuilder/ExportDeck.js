import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

/**
 * The content in the export modal. Contains a preview of the exported deck, save to file button,
 * and copy to clipboard button.
 */
function ExportDeck() {

    const deckMap = useSelector(state => state.deckBuilder.deckMap);

    const [saveClipboard, setSaveClipboard] = useState("Copy to Clipboard");
    const [saveFile,      setSaveFile]      = useState("Save to File");

    /**
     * Iteratively build deck string output
     */
    const toString = useMemo(() => {
        let deckOutput = "Deck\n";
        
        // Iterate through each card name in deckMap
        for (let [name, ids] of Object.entries(deckMap)) {
            
            // Iterate through each arenaId of that card name and add it to deckOutput string
            for (const card of Object.values(ids)) {

                // Only list number and name for "pana" and other 4+ letter set codes, 
                // because the games doesn't handle them well
                if (card.set.length > 3 || /[a-zA-Z]/.test(card.collector_number)) {

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
    }, [deckMap]);

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
