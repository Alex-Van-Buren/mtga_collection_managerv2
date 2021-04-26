import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import useDraft from '../../hooks/useDraft';
import draftsNeeded from '../../data/draftsNeeded';
import '../../css/DraftsCalculator.css';

function DraftsCalculator() {
    const [draftType, setDraftType] = useState("premier");
    const [winRate, setWinRate] = useState(50);
    const [debouncedWinRate, setDebouncedWinRate] = useState(winRate);
    const [cardsPicked, setCardsPicked] = useState(2.5);
    const [debouncedCardsPicked, setDebouncedCardsPicked] = useState(cardsPicked);

    // Grab set id from url
    const { setId } = useParams();

    // Get mythic/rare totals from redux
    const mythicOwnedTotal = useSelector(state => state.inventory.set[setId].mythic.ownedTotal);
    const mythicSetTotal = useSelector(state => state.inventory.set[setId].mythic.setTotal);
    const rareOwnedTotal = useSelector(state => state.inventory.set[setId].rare.ownedTotal);
    const rareSetTotal = useSelector(state => state.inventory.set[setId].rare.setTotal);

    // Track change in win rate input
    useEffect(() => {

        // Wait for user to stop typing
        const timeoutid = setTimeout( () => {
            setWinRate(debouncedWinRate);
        }, 500);

        // Cleanup function to stop timer
        return () => clearTimeout(timeoutid);
    }, [debouncedWinRate])

    // Track change in new cards picked
    useEffect(() => {

         // Wait for user to stop typing
         const timeoutid = setTimeout( () => {
            setCardsPicked(debouncedCardsPicked);
        }, 500);

        // Cleanup function to stop timer
        return () => clearTimeout(timeoutid);
    }, [debouncedCardsPicked]);

    // Get the average gems/packs per draft
    const { gems, packs: rewardPacks } = useDraft(draftType, winRate/100);

    // Calculate number of drafts required to complete rare/mythic collection for this set
    const rareDraftsNeeded = draftsNeeded(setId, "rare", rareOwnedTotal, rareSetTotal, cardsPicked, rewardPacks);
    const mythicDraftsNeeded = draftsNeeded(setId, "mythic", mythicOwnedTotal, mythicSetTotal, cardsPicked, rewardPacks);

    // Calculate cost of drafts (include gems returned)

    // Default is for traditional or premier
    let rareCost =   { gold: rareDraftsNeeded*10000, gems: rareDraftsNeeded*1500 },
        mythicCost = { gold: mythicDraftsNeeded*10000, gems: mythicDraftsNeeded*1500 };

    if (draftType === "quick") {
        rareCost.gold = (rareCost.gold / 2);
        rareCost.gems = (rareCost.gems / 2);
        mythicCost.gold = (mythicCost.gold / 2);
        mythicCost.gems = (mythicCost.gems / 2);
    }

    const totalRareGemReward = Math.floor(rareDraftsNeeded * gems).toLocaleString();
    const totalMythicGemReward = Math.floor(mythicDraftsNeeded * gems).toLocaleString();

    // Dropdown selects draft type
    const renderDropDown = (
        <div>
            {/* Dropdown menu */}
            <label htmlFor="draftType">Draft Type: </label>
            <div className="ui compact menu small">
                <div className="ui simple dropdown item" id="draftType">
                    {draftType}
                    <i className="dropdown icon"></i>
                    <div className="menu">
                        <div className="item" onClick={() => setDraftType("premier")}>Premier</div>
                        <div className="item" onClick={() => setDraftType("traditional")}>Traditional</div>
                        <div className="item" onClick={() => setDraftType("quick")}>Quick</div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Input selects estimated win percentage
    const renderWinRate = (
        <div>
            <label htmlFor="winRate">Average Win Percentage:</label>
            <input
                type="number" name="winRate" id="winRate" min="0" max="100" value={debouncedWinRate}
                onChange={(e) => setDebouncedWinRate(e.target.value)}
            />
        </div>
    );

    // Slider for average number of new rares/mythics picked during draft
    const renderCardsPickedInput = (
        <div>
            <label htmlFor="cardsPicked">Average New Rares/Mythics Picked per Draft:</label>
            <input
                type="number" name="cardsPicked" id="cardsPicked" min="0" max="10" step="0.1" value={debouncedCardsPicked}
                onChange={(e) => setDebouncedCardsPicked(e.target.value)}
            />
        </div>
    );

    const renderOutput = (
        <div>
            <hr />
            <h4>Drafts Needed To Complete:</h4>
            <div className="draftRequired">
                <h5>Rares: {rareDraftsNeeded} Drafts</h5>
                <p>Cost: {(rareCost.gold).toLocaleString()} Gold or {(rareCost.gems).toLocaleString()} Gems</p>
                <p>Rewards: {totalRareGemReward} Gems</p>

                <h5>Mythics: {mythicDraftsNeeded} Drafts</h5>
                <p>Cost: {(mythicCost.gold).toLocaleString()} Gold or {(mythicCost.gems).toLocaleString()} Gems</p>
                <p>Rewards: {totalMythicGemReward} Gems</p>
            </div>
            {/* <div>Drafts needed to complete rares: {rareDraftsNeeded}</div> */}
            {/* <div>Total costs to complete rares:</div> */}
            {/* <div>Gold: {rareCost.gold}, Gems: {rareCost.gems}</div> */}
            {/* <div>Total gem rewards from drafts: {totalRareGemReward}</div> */}
            {/* <div>Difference: {rareCost.gems - totalRareGemReward}</div> */}

            {/* <div>Drafts needed to complete mythics: {mythicDraftsNeeded}</div> */}
            {/* <div>Total costs to complete mythics:</div> */}
            {/* <div>Gold: {mythicCost.gold}, Gems: {mythicCost.gems}</div> */}
            {/* <div>Total gem rewards from drafts: {totalMythicGemReward}</div> */}
            {/* <div>Difference: {mythicCost.gems - totalMythicGemReward}</div> */}
        </div>
    );

    return (
        <div id="draftsCalculator">
            {renderDropDown}
            {renderWinRate}
            {renderCardsPickedInput}
            {renderOutput}
        </div>
    );
}

export default DraftsCalculator;