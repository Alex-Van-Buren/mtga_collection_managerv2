import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CustomDropdown from '../Templates/CustomDropdown';
import ManualPacks from './ManualPacks';
import useBooster from '../../hooks/useBooster';
import useDraft from '../../hooks/useDraft';
import draftsNeeded from '../../data/draftsNeeded';
import { setInfo } from '../../data/setInfo';
import '../../css/DraftsCalculator.css';

import gem_img from '../../images/arena/Gem.png';
import gold_img from '../../images/arena/Gold.png';

function DraftsCalculator() {
    const [draftType, setDraftType] = useState("premier");
    const [winRate, setWinRate] = useState(50);
    const [debouncedWinRate, setDebouncedWinRate] = useState(winRate);
    const [raresPicked, setRaresPicked] = useState(2.6);
    const [debouncedRaresPicked, setDebouncedRaresPicked] = useState(raresPicked);
    const [mythicsPicked, setMythicsPicked] = useState(0.4);
    const [debouncedMythicsPicked, setDebouncedMythicsPicked] = useState(mythicsPicked);
    
    // Reset the default values for winRate, raresPicked, mythicsPicked, and draftType to values from localstate if possible
    useEffect(() => {
        // Get the values from localstorage --> will be null if user hasn't used before or cleared the localStorage
        const draftWinRate = window.localStorage.getItem('draftWinRate');
        const draftRaresPicked = window.localStorage.getItem('draftRaresPicked');
        const draftMythicsPicked = window.localStorage.getItem('draftMythicsPicked');
        const preferredDraftType = window.localStorage.getItem('preferredDraftType');

        // set the values and debounced values to the localStorage values if the value was found in localStorage
        if ( draftWinRate ){
            setDebouncedWinRate(draftWinRate);
            setWinRate(draftWinRate);
        }
        if ( draftRaresPicked ){
            setDebouncedRaresPicked(draftRaresPicked);
            setRaresPicked(draftRaresPicked);
        }
        if ( draftMythicsPicked ){
            setDebouncedMythicsPicked(draftMythicsPicked);
            setMythicsPicked(draftMythicsPicked);
        }
        if ( preferredDraftType ) {
            setDraftType(preferredDraftType);
        }

    },[]);
    
    // Grab set id from url
    const { setId } = useParams();

    const ownedBoosters = useBooster(setId);

    // Get mythic/rare totals from redux
    const { ownedTotal: mythicsOwned, setTotal: mythicsTotal } = useSelector( ({inventory}) => inventory.set[setId].mythic);
    const { ownedTotal: raresOwned,   setTotal: raresTotal   } = useSelector( ({inventory}) => inventory.set[setId].rare);

    // Track change in win rate input
    useEffect(() => {

        // Wait for user to stop typing
        const timeoutid = setTimeout( () => {
            setWinRate(debouncedWinRate);
            window.localStorage.setItem('draftWinRate', debouncedWinRate);
        }, 500);

        // Cleanup function to stop timer
        return () => clearTimeout(timeoutid);
    }, [debouncedWinRate])

    // Track change in new rares picked
    useEffect(() => {

         // Wait for user to stop typing
         const timeoutid = setTimeout( () => {
            setRaresPicked(debouncedRaresPicked);
            window.localStorage.setItem('draftRaresPicked', debouncedRaresPicked);
        }, 500);

        // Cleanup function to stop timer
        return () => clearTimeout(timeoutid);
    }, [debouncedRaresPicked]);

    // Track change in new mythics picked
    useEffect(() => {

        // Wait for user to stop typing
        const timeoutid = setTimeout( () => {
           setMythicsPicked(debouncedMythicsPicked);
           window.localStorage.setItem('draftMythicsPicked',debouncedMythicsPicked);
       }, 500);

       // Cleanup function to stop timer
       return () => clearTimeout(timeoutid);
   }, [debouncedMythicsPicked]);

    // Get the average gems/packs per draft
    const { gems, packs: rewardPacks } = useDraft(draftType, winRate/100);

    // Check if the set is not draftable (reminder: the collationId is the value for the booster pack of the set)
    if (!setInfo[setId].collationId) {
        const message = `${setInfo[setId].name} is not a draftable set`;
        return (
            <div id="notAvailable">
                <h2>{message}</h2>
            </div>
        );
    }
    // Calculate number of drafts required to complete rare/mythic collection for this set
    const rareDraftsNeeded = draftsNeeded(setId, "rare", raresOwned, raresTotal, raresPicked, rewardPacks, ownedBoosters);
    const mythicDraftsNeeded = draftsNeeded(setId, "mythic", mythicsOwned, mythicsTotal, mythicsPicked, rewardPacks, ownedBoosters);

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

    // Callback for CustomDropdown
    function selectDraftType(item) {
        setDraftType(item);
        window.localStorage.setItem('preferredDraftType', item);
    }
    // Dropdown selects draft type
    const renderDropDown = (
        <div className="drafttype-dropdown">
            {/* Dropdown menu */}
            <label>Draft Type: </label>
            <CustomDropdown 
                items={['quick', 'premier', 'traditional']} key={draftType} ariaLabel="Select Draft Type"
                firstSelection={draftType} selectfn={selectDraftType} 
            />
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
            <label htmlFor="winRate">Win Rate: </label>
            <input
                type="number" name="winRate" id="winRate" min="0" max="100" value={debouncedWinRate}
                onChange={(e) => setDebouncedWinRate(checkWinRate(e.target.value))}
            />
        </div>
    );
    
    // Input for average number of new rares picked during draft
    const renderRaresPickedInput = (
        <div>
            <label htmlFor="raresPicked">Rares: </label>
            <input
                type="number" name="raresPicked" id="raresPicked" min="0" max="10" step="0.1" value={debouncedRaresPicked}
                onChange={(e) => setDebouncedRaresPicked(checkCardsPicked(e.target.value))}
            />
        </div>
    );

    // Input for average number of new mythics picked during draft
    const renderMythicsPickedInput = (
        <div>
            <label htmlFor="mythicsPicked">Mythics: </label>
            <input
                type="number" name="mythicsPicked" id="mythicsPicked" min="0" max="10" step="0.1" value={debouncedMythicsPicked}
                onChange={(e) => setDebouncedMythicsPicked(checkCardsPicked(e.target.value))}
            />
        </div>
    );

    const renderOutput = (
        <div>
            <hr />
            <h3>Results:</h3>
            <div className="draftsRequired">
                <div className="rares">
                    <h4>Collect All Rares: <span className="resultNumber">{rareDraftsNeeded} Drafts</span></h4>
                    <p>Cost: 
                        <img src={gold_img} alt="gold" className="goldImg"/> {(rareCost.gold).toLocaleString()} <span className="slash">/</span>  
                        <img src={gem_img} alt="gem" className="gemImg"/> {(rareCost.gems).toLocaleString()}
                    </p>
                    <p>
                        Rewards: <img src={gem_img} alt="gem" className="gemImg"/> {totalRareGemReward} &#38; {Math.floor(rewardPacks * rareDraftsNeeded)} Packs
                    </p>
                </div>
                <div className="mythics">
                    <h4>Collect All Mythics: <span className="resultNumber">{mythicDraftsNeeded} Drafts</span></h4>
                    <p>Cost: 
                        <img src={gold_img} alt="gold" className="goldImg"/> {(mythicCost.gold).toLocaleString()} <span className="slash">/</span> 
                        <img src={gem_img} alt="gem" className="gemImg"/> {(mythicCost.gems).toLocaleString()}
                    </p>
                    <p>Rewards: <img src={gem_img} alt="gem" className="gemImg"/> {totalMythicGemReward} &#38; {Math.floor(rewardPacks * mythicDraftsNeeded)} Packs </p>
                </div>
            </div>
        </div>
    );

    return (
        <div id="draftsCalculator">
            <h3>Calculator Options 
                <a 
                href="/help?openSection=usingDraftCalculator#usingDraftCalculator"
                target="_blank">
                    <i className="info circle icon"></i>
                </a>
            </h3>
            <div className="top">
                <div className="typeAndWinRate">
                    {renderDropDown}
                    {renderWinRate}
                </div>
                <p>New Cards Picked:</p>
                <div className="cardsPicked">
                    {renderRaresPickedInput}
                    {renderMythicsPickedInput}

                </div>
                <p>
                    <ManualPacks set={setId} />
                </p>
            </div>
            {renderOutput}
        </div>
    );
}

export default DraftsCalculator;
