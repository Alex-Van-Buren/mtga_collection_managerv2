import React, {useState} from 'react';

import '../../css/SetDetailsMenu.css';

function SetDetailsMenu() {
    const [activeMenuItem, setActiveMenuItem] = useState('Card Filters');
    let cardFiltersClass = 'link item';
    let packsClass = 'link item';
    let draftsClass = 'link item';

    switch (activeMenuItem) {
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
            <div className={cardFiltersClass} onClick={()=> setActiveMenuItem('Card Filters')}>
                Card Filters
            </div>
            <div className={packsClass} onClick={()=> setActiveMenuItem('Packs')}>
                Packs
            </div>
            <div className={draftsClass} onClick={()=> setActiveMenuItem('Drafts')}>
                Drafts
            </div>
        </div>
    )
}

export default SetDetailsMenu;