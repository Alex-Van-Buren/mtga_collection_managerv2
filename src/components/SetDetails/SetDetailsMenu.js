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
            <div className={cardFiltersClass} onClick={()=> dispatch(selectDetailsMenu('Card Filters'))}>
                Card Filters
            </div>
            <div className={packsClass} onClick={()=> dispatch(selectDetailsMenu('Packs'))}>
                Packs
            </div>
            <div className={draftsClass} onClick={()=> dispatch(selectDetailsMenu('Drafts'))}>
                Drafts
            </div>
        </div>
    );
}

export default SetDetailsMenu;