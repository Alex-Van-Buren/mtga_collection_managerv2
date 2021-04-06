import React, { useState } from 'react';



export default function ColorCheckboxes() {

    const [white, setWhite] = useState(false);
    const [blue, setBlue] = useState(false);
    const [black, setBlack] = useState(false);
    const [red, setRed] = useState(false);
    const [green, setGreen] = useState(false);
    const [multi, setMulti] = useState(false);
    const [colorless, setColorless] = useState(false);

    const checkColor = (event) => {

        const colors = [ white, blue, black, red, green, multi, colorless ];

        console.log(colors);
        // console.log(event.target.name, event.target.checked); //debug
    
        
    }

    return (
        
        /* Checkboxes for color: White, Blue, Black, Red, Green, All Multicolored, Colorless */
        <div>
            <label htmlFor="color">Color(s):</label>
            <span>
                <label htmlFor="white">White</label>
                <input type="checkbox" name="white" id="white" 
                    onClick={(e) => { console.log(e.target.checked); setWhite(e.target.checked); checkColor(e)} }/>

                <label htmlFor="blue">Blue</label>
                <input type="checkbox" name="blue" id="blue" 
                    onClick={(e) => { setBlue(e.target.checked); checkColor(e)} }/>

                <label htmlFor="black">Black</label>
                <input type="checkbox" name="black" id="black" 
                    onClick={(e) => { setBlack(e.target.checked); checkColor(e)} }/>

                <label htmlFor="red">Red</label>
                <input type="checkbox" name="red" id="red" 
                    onClick={(e) => { setRed(e.target.checked); checkColor(e)} }/>

                <label htmlFor="green">Green</label>
                <input type="checkbox" name="green" id="green" 
                    onClick={(e) => { setGreen(e.target.checked); checkColor(e)} }/>

                <label htmlFor="multi">All Multicolored</label>
                <input type="checkbox" name="multi" id="multi" 
                    onClick={(e) => { setMulti(e.target.checked); checkColor(e)} }/>

                <label htmlFor="colorless">Colorless</label>
                <input type="checkbox" name="colorless" id="colorless" 
                    onClick={(e) => { setColorless(e.target.checked); checkColor(e)} }/>
            </span>
        </div>
    );
}
