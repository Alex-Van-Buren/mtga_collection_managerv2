import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import useDraft from '../../hooks/useDraft';
import draftsNeeded from '../../data/draftsNeeded';
import '../../css/DraftsCalculator.css';
import gem_img from '../../images/arena/Gem.png';
import gold_img from '../../images/arena/Gold.png';

function DraftsCalculator() {
    const [draftType, setDraftType] = useState("premier");
    const [winRate, setWinRate] = useState(50);
    const [debouncedWinRate, setDebouncedWinRate] = useState(winRate);
    const [raresPicked, setRaresPicked] = useState(2.625);
    const [debouncedRaresPicked, setDebouncedRaresPicked] = useState(raresPicked);
    const [mythicsPicked, setMythicsPicked] = useState(0.375);
    const [debouncedMythicsPicked, setDebouncedMythicsPicked] = useState(mythicsPicked);

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

    // Track change in new rares picked
    useEffect(() => {

         // Wait for user to stop typing
         const timeoutid = setTimeout( () => {
            setRaresPicked(debouncedRaresPicked);
        }, 500);

        // Cleanup function to stop timer
        return () => clearTimeout(timeoutid);
    }, [debouncedRaresPicked]);

    // Track change in new mythics picked
    useEffect(() => {

        // Wait for user to stop typing
        const timeoutid = setTimeout( () => {
           setMythicsPicked(debouncedMythicsPicked);
       }, 500);

       // Cleanup function to stop timer
       return () => clearTimeout(timeoutid);
   }, [debouncedMythicsPicked]);

    // Get the average gems/packs per draft
    const { gems, packs: rewardPacks } = useDraft(draftType, winRate/100);

    // Calculate number of drafts required to complete rare/mythic collection for this set
    const rareDraftsNeeded = draftsNeeded(setId, "rare", rareOwnedTotal, rareSetTotal, raresPicked, rewardPacks);
    const mythicDraftsNeeded = draftsNeeded(setId, "mythic", mythicOwnedTotal, mythicSetTotal, mythicsPicked, rewardPacks);

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
    // Validation function for winRate that will keep the input between 0 and 100
    function checkWinRate(value){
        let valueNum = value;
        if ( valueNum > 100 ) {
            valueNum = 100;
        } 
        if ( valueNum < 0 ) {
            valueNum = 0;
        }
        return valueNum;
    }

    // Validation function for Rare and mythic Cards Picked during drafts. Prevents negative numbers and sets to 0.
    function checkCardsPicked(value) {
        let valueNum = value;
        if ( valueNum < 0 ) {
            valueNum = 0;
        }
        return valueNum;
    }

    // Input selects estimated win percentage
    const renderWinRate = (
        <div>
            <label htmlFor="winRate">Average Win Percentage:</label>
            <input
                type="number" name="winRate" id="winRate" min="0" max="100" value={debouncedWinRate}
                onChange={(e) => setDebouncedWinRate(checkWinRate(e.target.value))}
            />
        </div>
    );
    
    // Input for average number of new rares picked during draft
    const renderRaresPickedInput = (
        <div>
            <label htmlFor="raresPicked">Average New Rares Picked per Draft:</label>
            <input
                type="number" name="raresPicked" id="raresPicked" min="0" max="10" step="0.1" value={debouncedRaresPicked}
                onChange={(e) => setDebouncedRaresPicked(checkCardsPicked(e.target.value))}
            />
        </div>
    );

    // Input for average number of new mythics picked during draft
    const renderMythicsPickedInput = (
        <div>
            <label htmlFor="mythicsPicked">Average New Mythics Picked per Draft:</label>
            <input
                type="number" name="mythicsPicked" id="mythicsPicked" min="0" max="10" step="0.1" value={debouncedMythicsPicked}
                onChange={(e) => setDebouncedMythicsPicked(checkCardsPicked(e.target.value))}
            />
        </div>
    );

    const renderOutput = (
        <div>
            <hr />
            <h4>Drafts Needed To Complete:</h4>
            <div className="draftRequired">
                <h5>Rares: {rareDraftsNeeded} Drafts</h5>
                <p>Cost: <img src={gold_img} alt="gold" className="goldImg"/> {(rareCost.gold).toLocaleString()} or <img src={gem_img} alt="gem" className="gemImg"/> {(rareCost.gems).toLocaleString()}</p>
                <p>Rewards: <img src={gem_img} alt="gem" className="gemImg"/> {totalRareGemReward} </p>

                <h5>Mythics: {mythicDraftsNeeded} Drafts</h5>
                <p>Cost: <img src={gold_img} alt="gold" className="goldImg"/>{(mythicCost.gold).toLocaleString()} or <img src={gem_img} alt="gem" className="gemImg"/> {(mythicCost.gems).toLocaleString()}</p>
                <p>Rewards: <img src={gem_img} alt="gem" className="gemImg"/> {totalMythicGemReward} </p>
            </div>
        </div>
    );

    return (
        <div id="draftsCalculator">
            {renderDropDown}
            {renderWinRate}
            {renderRaresPickedInput}
            {renderMythicsPickedInput}
            {renderOutput}
        </div>
    );
}

export default DraftsCalculator;