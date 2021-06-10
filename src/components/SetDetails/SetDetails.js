import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CardList from './CardList';
import RarityCollectionItem from '../RarityCollectionItem';
import SetDetailsMenu from './SetDetailsMenu';
import DisplayOptions from './DisplayOptions';
import PacksCalculator from './PacksCalculator';
import DraftsCalculator from './DraftsCalculator';
import { setInfo } from '../../data/setInfo';
import CardModal from './CardModal';
import SetNotFound from '../SetNotFound.js';
import useResizeWidth from '../../hooks/useResizeWidth';
import '../../css/SetDetails.css';

function SetDetails() {

    // Get set Id from url
    const { setId } = useParams();

    // Get current screen width
    const width = useResizeWidth();

    // Get active tab from redux
    const activeTab = useSelector(state => state.displayOptions.activeTab);

    /*
     * Calculate totals from redux state 
     */
    const ownedTotal = useSelector( ({ inventory: {set} }) => {
        let sum = 0;
        if (set && set[setId]) {
            // Sum the total cards owned
            Object.keys(set[setId]).forEach( rarity => {sum += set[setId][rarity].ownedTotal} );
        }
        return sum;
    });

    const setTotal = useSelector( ({ inventory: {set} }) => {
        let sum = 0;
        if (set && set[setId]) {
            // Sum the total cards in the set
            Object.keys(set[setId]).forEach( rarity => {sum += set[setId][rarity].setTotal} );
        }
        return sum;
    });

    // Check if set exists
    if (!setInfo[setId]) {
        
        // Return error page if set doesn't exist
        return <SetNotFound/>;
    }

    // Calculate and round percent owned
    const percentOwned = ((ownedTotal / setTotal) * 100).toFixed(1);
    const setName = setInfo[setId].name;

    // Determine active tab and resulting component to display
    const activeTabComponent = (() => {

        switch (activeTab) {
            case 'Card Filters':
                return <DisplayOptions />;
            case 'Packs':
                return <PacksCalculator />;
            case 'Drafts':
                return <DraftsCalculator />;
            default:
                return null;
        }
    })();

    // Break up set details and display options at small width
    let setDetailsColumns = "six";
    let displayOptionsColumns = "ten";

    if (width < 740) {
        setDetailsColumns = "sixteen";
        displayOptionsColumns = "sixteen";
    }

    let detailsHeader = <div className="ui center aligned header">{setName}</div>
    if ( setInfo[setId].logo ) {
        detailsHeader = <div className="ui center aligned header">
                <img src={setInfo[setId].logo} alt={setName} aria-label={setName} title={setName}/>
            </div>
    }
    return (<>
        {/* Card modal is only shown when a card is clicked */}
        <CardModal/>

        <div className="ui grid container" id="setDetailsSpacer">

            {/* Set Details */}
            <div className={`${setDetailsColumns} wide column`}>
                {/* <div className="ui center aligned header">{setName}</div> */}
                {/* <div className="ui center aligned header"><img src={setInfo[setId].logo} alt={setName} /></div> */}
                {detailsHeader}
                <div className="ui center aligned sub header">
                    Set Progress:
                    &nbsp; &nbsp; &nbsp; {/* Spacers */}
                    <span>{ownedTotal} / {setTotal} ({percentOwned}%)</span>
                </div>

                <div className="ui middle aligned list">
                    <RarityCollectionItem setId={setId} rarity="mythic" />                    
                    <RarityCollectionItem setId={setId} rarity="rare" />
                    <RarityCollectionItem setId={setId} rarity="uncommon" />
                    <RarityCollectionItem setId={setId} rarity="common"/>
                </div>
            </div>

            {/* Display options for SetDetails */}
            <div className={`${displayOptionsColumns} wide column`}>
                <SetDetailsMenu />
                {activeTabComponent}
            </div>
        </div>
        
        <hr className="lineBreak"/>

        {/* Cards matching display options */}
        <CardList setId={setId}/>
    </>);
    
}

export default SetDetails;