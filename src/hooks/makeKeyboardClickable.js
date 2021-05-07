/**
     * Helper function that allows screenreaders to click the input file type with keyboard
     * - Not technically a hook, but generally used like one. Avoids hooks being unable to 
     *   be called conditionally.
     * @param {Event} e Keydown event
     * @param {ref} ref Reference to click
     */
 export default function makeKeyboardClickable(e, ref) {

    // If they hit enter
    if (e.key === "Enter") {

        // Prevent the default action, otherwise it gets clicked twice
        e.preventDefault();           
        
        // Click the label that is referenced using useRef hook
        ref.current.click();
    }
}