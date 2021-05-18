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

        // Else initialize to 0
        const temp = {};
        const playerProps = [ "wcMythic", "wcRare", "wcUncommon", "wcCommon", "gems", "gold", "vaultProgress" ];
        for (const prop of playerProps) {
            temp[prop] = 0;
        }
        return temp;
    });

    // Destructure values from inventory
    const { wcMythic, wcRare, wcUncommon, wcCommon, gems, gold, vaultProgress } = inventory;

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