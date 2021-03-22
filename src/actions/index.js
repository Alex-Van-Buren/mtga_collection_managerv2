import totalOwned from '../data/totalOwned';

export function getCollection(collection) {
    return {
        type: "GET_CARD_COLLECTION",
        payload: collection
    }
}

export function processSetCollection(set, collection){        
    return{
        type: `PROCESS_SET_COLLECTION_${set}`,
        payload: {mythic: totalOwned(set, collection, 'mythic'),
                  rare: totalOwned(set, collection, 'rare'),
                  uncommon: totalOwned(set, collection, 'uncommon'),
                  common: totalOwned(set, collection, 'common')}
    }
}