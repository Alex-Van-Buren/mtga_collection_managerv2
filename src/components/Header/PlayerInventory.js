import React from 'react';
import { useSelector } from 'react-redux';

import gem_img        from '../../images/arena/Gem.png';
import gold_img       from '../../images/arena/Gold.png';
import wcCommon_img   from '../../images/arena/Wildcard_common.png';
import wcUncommon_img from '../../images/arena/Wildcard_uncommon.png';
import wcRare_img     from '../../images/arena/Wildcard_rare.png';
import wcMythic_img   from '../../images/arena/Wildcard_mythic.png';
import vault_img      from '../../images/arena/Vault.png';
import '../../css/PlayerInventory.css';

/**
 * Gets and displays player inventory: vault progress, wildcards, gold, and gems.
 * @returns JSX for Player Inventory
 */
function PlayerInventory() {

    const inventory = useSelector(({inventory}) => {
        
        // Return player inventory if it exists
        if ( inventory && inventory.player ) return inventory.player;

        // Else return null
        return null;
    });

    // Don't display Player Inventory if inventory isn't initialized
    if (!inventory) {
        return null;
    }

    // Destructure values from inventory
    const { wcMythic, wcRare, wcUncommon, wcCommon, gems, gold, vaultProgress } = inventory;

    // Don't display inventory if all inventory values are 0 (assuming this means log file not uploaded)
    if (wcMythic===0 && wcRare===0 && wcUncommon===0 && wcCommon===0 && gems===0 && gold===0 && vaultProgress===0) {
        return null;
    }

    return (
        <div id="playerInventory">

            <div aria-label="Vault Progress" title="Vault Progress">
                <img src={vault_img} alt="Vault Progress" />
                <p>{`${vaultProgress}%`}</p>
            </div>

            <div aria-label="Mythic Wildcards" title="Mythic Wildcards">
                <img src={wcMythic_img} alt="Mythic Wildcards" />
                <p>{wcMythic.toLocaleString()}</p>
            </div>
            <div aria-label="Rare Wildcards" title="Rare Wildcards">
                <img src={wcRare_img} alt="Rare Wildcards" />
                <p>{wcRare.toLocaleString()}</p>
            </div>
            <div aria-label="Uncommon Wildcards" title="Uncommon Wildcards">
                <img src={wcUncommon_img} alt="Uncommon Wildcards" />
                <p>{wcUncommon.toLocaleString()}</p>
            </div>
            <div aria-label="Common Wildcards" title="Common Wildcards">
                <img src={wcCommon_img} alt="Common Wildcards" />
                <p>{wcCommon.toLocaleString()}</p>
            </div>

            <div aria-label="Player Gold" title="Player Gold">
                <img src={gold_img} alt="Player Gold"/>
                <p>{gold.toLocaleString()}</p>
            </div>
            <div aria-label="Player Gems" title="Player Gems">
                <img src={gem_img} alt="Player Gems" />
                <p>{gems.toLocaleString()}</p>
            </div>
        </div>
    );
}

export default PlayerInventory;