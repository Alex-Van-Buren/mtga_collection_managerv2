import React from 'react';
import { useSelector } from 'react-redux';

import ColorCheckboxes from './ColorCheckboxes';
import CustomButton from './CustomButton';
import SearchBar from './SearchBar';
import { selectRarity, setShowCards } from '../../actions';
import '../../css/DisplayOptions.css';

function DisplayOptions() {

    const showCards = useSelector(state => state.displayOptions.showCards);
    const raritySelected = useSelector(state => state.displayOptions.rarity);

    const showListButtons = [
        {value: "=0",  text: "None"},
        {value: ">0",  text: "Own at least one"},
        {value: "<4",  text: "Missing at least one"},
        {value: "=4",  text: "Full Playset"},
        {value: "all", text: "Show All Cards"}
    ];

    const renderShowListButtons = showListButtons.map( (button) => {
        let buttonClass = "ui button primary showButton";
        if ( button.value !== showCards) {
            buttonClass += " basic";
        }
        return (
            <CustomButton 
                action={setShowCards} className={buttonClass} value={button.value}
                text={button.text} key={button.value} 
            />
        );
    });

    const rarityButtons = [
        {value: 'mythic'},
        {value: 'rare'},
        {value: 'uncommon'},
        {value: 'common'},
        {value: 'all'}
    ];
    
    const renderRarityButtons = rarityButtons.map((button) => {
        let buttonClass = `ui button primary rarityButton ${button.value}`;
        if ( button.value !== raritySelected) {
            buttonClass += ' basic';
        }
        return <CustomButton action={selectRarity} className={buttonClass} value={button.value} key={button.value} />
    });

    return (<div className="DisplayOptions">
        <SearchBar/>
        
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

export default DisplayOptions;