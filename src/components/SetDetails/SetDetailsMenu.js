import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectDetailsMenu } from '../../actions';
import '../../css/SetDetailsMenu.css';

function SetDetailsMenu() {
    // Get dispatch function
    const dispatch = useDispatch();

    // Get active tab info from redux
    const activeTab = useSelector(state => state.displayOptions.activeTab);
    
    // Fill each class with common class names
    let [cardFiltersClass, packsClass, draftsClass] = Array(3).fill('link item');

    // Add additional class 'active' if tab is active
    switch (activeTab) {
        case 'Card Filters':
            cardFiltersClass += ' active';
            break;

        case 'Packs':
            packsClass += ' active';
            break;

        case 'Drafts':
            draftsClass += ' active';
            break;
            
        default:
           break;
    }
    
    // Return JSX for tab menu
    return (
        <div className="ui pointing menu compact">
            <div className={cardFiltersClass} 
            onClick={()=> dispatch(selectDetailsMenu('Card Filters'))}
            onKeyDown={(e)=> {if(e.key === "Enter"){dispatch(selectDetailsMenu('Card Filters'))}}}
            tabIndex="0" role="button" 
            >
                Filter Displayed Cards
            </div>
            <div className={packsClass} 
            onClick={()=> dispatch(selectDetailsMenu('Packs'))}
            onKeyDown={(e)=> {if(e.key === "Enter"){dispatch(selectDetailsMenu('Packs'))}}}
            tabIndex="0" role="button" 
            >
               Booster Pack Calculator
            </div>
            <div className={draftsClass}
            onClick={()=> dispatch(selectDetailsMenu('Drafts'))}
            onKeyDown={(e)=> {if(e.key === "Enter"){dispatch(selectDetailsMenu('Drafts'))}}}
            tabIndex="0" role="button" 
            >
                Draft Calculator
            </div>
        </div>
    );
}

export default SetDetailsMenu;