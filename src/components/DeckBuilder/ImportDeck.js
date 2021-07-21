import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function ImportDeck() {

    const [importedText, setImportedText] = useState("");

    const dispatch = useDispatch();

    function onSubmit() {

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

            console.error(error)
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
