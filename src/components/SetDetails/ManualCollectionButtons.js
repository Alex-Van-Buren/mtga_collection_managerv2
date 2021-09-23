import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addCardToCollection, removeCardFromCollection } from "../../actions";
import '../../css/ManualCollectionButtons.css';

function ManualCollectionButtons({ children, card }) {
    const dispatch = useDispatch();
    const [ hovering, setHovering ] = useState("invisible");

    return (
        <div 
            id="ManualCollectionButtons"
            onMouseEnter={() => setHovering("")}
            onMouseLeave={() => setHovering("invisible")}
        >
            <button
                className={hovering}
                onClick={() => dispatch(removeCardFromCollection(card))}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.stopPropagation();
                    }
                }}
            >
                <i className="minus icon"></i>
            </button>
            {children}
            <button
                className={hovering}
                onClick={() => dispatch(addCardToCollection(card))}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.stopPropagation();
                    }
                }}
            >
                <i className="plus icon"></i>
            </button>
        </div>
    );
    
}

export default ManualCollectionButtons;
