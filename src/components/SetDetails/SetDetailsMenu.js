import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectDetailsMenu } from '../../actions';
import '../../css/SetDetailsMenu.css';

function SetDetailsMenu() {
    const dispatch = useDispatch();

    const activeTab = useSelector(state => state.displayOptions.activeTab);
    
    let cardFiltersClass = 'link item';
    let packsClass = 'link item';
    let draftsClass = 'link item';

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
           break
    }
    
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
    )
}

export default SetDetailsMenu;