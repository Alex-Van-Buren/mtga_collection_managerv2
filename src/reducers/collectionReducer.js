const INITIAL_STATE = {};

export default function collectionReducer(state = INITIAL_STATE, action){
    switch (action.type){
        case "GET_CARD_COLLECTION":
            return {...state, cardCollection: action.payload}
        
        case "PROCESS_SET_COLLECTION_khm":
            return {...state, khm: action.payload}

        case "PROCESS_SET_COLLECTION_eld":
            return {...state, eld: action.payload}

        case "PROCESS_SET_COLLECTION_thb":
            return {...state, thb: action.payload}

        case "PROCESS_SET_COLLECTION_iko":
            return {...state, iko: action.payload}

        case "PROCESS_SET_COLLECTION_m21":
            return {...state, m21: action.payload}

        case "PROCESS_SET_COLLECTION_znr":
            return {...state, znr: action.payload}

        default:
            return state
    }
}