import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAddType } from '../../actions';
import '../../css/DeckHeader.css';

/**
 * Creates the header that separates the available cards to add to a deck and the deckList/sideboard. 
 * Contains info about the decklist as well as buttons to help build the deck/sideboard. 
 * @returns JSX
 */
function DeckHeader() {

    const dispatch = useDispatch();

    const { addType, deckType } = useSelector(state => state.deckBuilder);
    const deckOrSideboard = addType === "sideboard" ? false : true;

    // Get the deck array and flatten it;
    let { deck, sideboard } = useSelector(state => state.deckBuilder);
    deck = deck.flat();

    // Initialize deck counts
    const sideboardCount = sideboard.length;
    let deckCount        = 0;
    let landCount        = 0;
    let partialLandCount = 0;
    let creatureCount    = 0; 
    let nonCreatureCount = 0;

    // Count up totals
    for (const card of deck) {
        deckCount++;
        
        // If Creature appears anywhere in the type line update creature count (Do not care if card is double sided)
        if (card.type_line.includes('Creature')) {
            creatureCount++;
        }

        // Check if single sided (Dual sided cards have each type separated by //)
        if (!card.type_line.includes('//')) {

            // if land --> update landcount
            if (card.type_line.includes('Land')) {
                landCount++;
            }
            
            // if not creature AND not land --> update noncreature count
            if (!card.type_line.includes('Creature') && !card.type_line.includes('Land')) {
                nonCreatureCount++;
            }
        }
        // Else double sided
        else {
            // Regular expression to capture each side of the //
            // eg. type_line = 'Instant // Land' --> want to capture 'Instant' and 'Land'
            const sideRegex = /(.+) \/\/ (.+)/;
            const sides = card.type_line.match(sideRegex);
            const frontType = sides[1];
            const backtype = sides[2];
            
            // if double sided and both sides have type line including 'Land' --> update land count
            if (frontType.includes('Land') && backtype.includes('Land')){
                landCount++;
            } else {
                // if double sided and only 1 side has type_lin including 'Land' --> update partialLandCount
                // Since we know that both sides aren't lands, we can check the whole type_line for land to update partialLandCount
                if (card.type_line.includes('Land')) {
                    partialLandCount++;
                }
            }

            // Check if is nonCreature
            if (!card.type_line.includes('Creature') && (!frontType.includes('Land') || !backtype.includes('Land'))){
                nonCreatureCount++;
            }
        }
    }

    let partialLandSpan = null;
    if (partialLandCount > 0) {
        partialLandSpan = <span>{`(+${partialLandCount})`}</span>
    }

    // Function sets the redux that makes the toggle switch sides
    function toggle(event) {

        event.stopPropagation();

        // If currently on deck, swap to sideboard
        if(deckOrSideboard) {
            dispatch(setAddType("sideboard"));
        }
        // If currently on sideboard, swap to deck
        else {
            dispatch(setAddType("deck"));
        }
    }

    // Toggle for deck and sideboard
    const addToggle = (
        <div
            // Accessibility and events
            className="addToggle" tabIndex="0"
            onKeyDown={ e => {if (e.key === "Enter") toggle(e) } }
            onMouseDown={ e => toggle(e) }
            role="checkbox" aria-checked={!deckOrSideboard} aria-label="Toggle add to deck or sideboard"
        >
            {/* Deck */}
            <span className="deck_sideboardToggleLabel">Add to Deck</span>

            {/* Deck or sideboard toggle */}
            <div className="ui fitted toggle checkbox">
                <input 
                    type="checkbox" name="deckOrSideboard" id="deckOrSideboard" tabIndex="-1"
                    checked={!deckOrSideboard} readOnly
                />
                <label tabIndex="-1"></label>
            </div>

            {/* Sideboard */}
            <span className="deck_sideboardToggleLabel">Add to Sideboard</span>
        </div>
    );

    // Set add mode to either commander or companion
    function setComType(event, type) {

        // Don't propagate events to deck header
        event.stopPropagation();

        // Toggle current type
        if (type !== addType) {
            dispatch(setAddType(type));
        } else {
            dispatch(setAddType("deck"));
        }
    }

    function setComButton(type) {

        let buttonText;
        let style = {};

        if (type === addType) {
            style.filter = "brightness(70%)"
        }

        switch (type) {
            case "commander": buttonText = "Set Commander"; break;
            case "companion": buttonText = "Set Companion"; break;
            default: buttonText = ""; break;
        }

        return <button
            // Accessibility and events
            className="setComButton" tabIndex="0" aria-label={`Set ${type} button`}
            onKeyDown={ e => {if (e.key === "Enter") setComType(e, type) } }
            onMouseDown={ e => setComType(e, type) } style={style}
        >
            {buttonText}
        </button>;
    }

    return (
        <div className="deckHeader">

            <div className="left">
                <div className="deck">Deck: {deckCount}</div>
                <div className="landCount">Land: {landCount}{partialLandSpan}</div>
                <div className="creatureCount">Creatures: {creatureCount}</div>
                <div className="nonCreatureCount">Noncreatures: {nonCreatureCount}</div>
            </div>

            <div className="right">
                {deckType === "brawl" || deckType === "custom" ? setComButton("commander") : null}
                {setComButton("companion")}
                <div className="sideboard">Sideboard: {sideboardCount}</div>
                {addToggle}
            </div>
        </div>
    );
}

export default DeckHeader;
