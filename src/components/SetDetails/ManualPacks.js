import React from "react";
import {useDispatch} from 'react-redux';

import useBooster from "../../hooks/useBooster";
import { setPackNumber } from "../../actions";

function ManualPacks({set}){
    const dispatch = useDispatch();
    const packCount = useBooster(set);

    return (
        <>
            <label htmlFor="Packnum">Packs Owned: </label>
            <input 
                type="number" min="0" name="Pack Number" id="Packnum" value={packCount}
                onChange={(e) => dispatch(setPackNumber(parseInt(e.target.value), set))}
            />
        </>
    );
}

export default ManualPacks;
