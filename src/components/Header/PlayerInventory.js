import React, { useCallback } from 'react';
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

    // Destructure values from player inventory in redux
    const { Gems, Gold, TotalVaultProgress, WildCardCommons, WildCardUnCommons, WildCardRares, WildCardMythics
    } = useSelector(state => state.inventory.player);

    /**
     * Helper Component to set inventory items. Only initialized once.
     * @param {string} name 
     * @param {number|*} value Commas are added to value if a number
     * @param {HTMLImageElement} image Image source
     * @returns div with nested img and label
     */
     const inventoryItem = useCallback((name, value, image) => {
        if (typeof value === "number") {
            value = value.toLocaleString();
        }
        return (
            <div aria-label={name} title={name}>
                <img src={image} alt={name} id={name}/>
                <label htmlFor={name}> {value} </label>
            </div>
        );
    }, []);

    // Don't display inventory if uninitialized or 0 (assuming this means log file not uploaded)
    if ( !WildCardMythics && !WildCardRares && !WildCardUnCommons && !WildCardCommons && !Gems && !Gold && !TotalVaultProgress ) {
        return null;
    }

    return (<div id="playerInventory">

        {inventoryItem("Vault Progress", `${(TotalVaultProgress/10).toLocaleString()}%`, vault_img)}

        {inventoryItem("Mythic Wildcards", WildCardMythics, wcMythic_img)}
        {inventoryItem("Rare Wildcards", WildCardRares, wcRare_img)}
        {inventoryItem("Uncommon Wildcards", WildCardUnCommons, wcUncommon_img)}
        {inventoryItem("Common Wildcards", WildCardCommons, wcCommon_img)}

        {inventoryItem("Player Gold", Gold, gold_img)}
        {inventoryItem("Player Gems", Gems, gem_img)}
    </div>);
}

export default PlayerInventory;
