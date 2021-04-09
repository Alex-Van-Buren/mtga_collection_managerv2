import React from 'react';
import {useSelector} from 'react-redux';

import ColorCheckboxes from './ColorCheckboxes';
import CustomButton from './CustomButton';
import { selectRarity, setShowCards } from '../../actions';
import '../../css/SetDetailsOptions.css';

function SetDetailsOptions() {

    const showCards = useSelector(state => state.detailsOptions.showCards);    
    const showListButtons = [
        {value: "=0",  text: "None"}, 
        {value: ">0",  text: "Own at least 1"}, 
        {value: "<4",  text: "Missing at least 1"}, 
        {value: "=4",  text: "Full Playset"}, 
        {value: "all", text: "Show All Cards"} 
    ];

    const renderShowListButtons = showListButtons.map( (button) => {
        let buttonClass = "ui button mini primary showButton";
        if ( button.value !== showCards) {
            buttonClass += " basic";
        }
        return <CustomButton action={setShowCards} className={buttonClass} value={button.value} text={button.text} />
    });

    const raritySelected = useSelector(state => state.detailsOptions.rarity);
    const rarityButtons = [
        {value: 'mythic'},
        {value: 'rare'},
        {value: 'uncommon'},
        {value: 'common'},
        {value: 'all'}
    ];
    
    const renderRarityButtons = rarityButtons.map((button) => {
        let buttonClass = `ui button mini primary rarityButton ${button.value}`;
        if ( button.value !== raritySelected) {
            buttonClass += ' basic';
        }
        return <CustomButton action={selectRarity} className={buttonClass} value={button.value} />
    });

    return (<div className="setDetailsOptions">
        
        {/* Buttons that select cards to show based on number in inventory */}
        <label className="showLabel">Number Owned:</label>
        <div className="showList">            
            {renderShowListButtons}
        </div>

        {/* Checkboxes for color: White, Blue, Black, Red, Green, All Multicolored, Colorless */}
        <ColorCheckboxes/>

        {/* Buttons that select rarity: Mythic, Rare, Uncommon, Common */}
        <label className="rarityLabel">Rarity:</label>
        <div className="showList">
            {renderRarityButtons}
        </div>
    </div>);
}

export default SetDetailsOptions;