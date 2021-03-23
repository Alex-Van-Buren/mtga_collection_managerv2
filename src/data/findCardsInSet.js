// import allArenaCards from './arenaCards20210314173019.json';
const allArenaCards = require('./arenaCards20210323000926.json');

function findCardsInSet(searchOptions){
    // TODO: Filter by Format legality
    // TODO: Filter by name
    // TODO: Make filterSet work with multiple sets (eg set = ['znr', 'thb'] it should return all cards from both sets)
    // TODO: Make filterColor work with colorless, and multicolored(it should be able to return all cards with multiple colors as well as a specific color combo eg (RG))
    // TODO: Add finalList return options (eg return the img src, cmc, etc.  for each card as well as the name and arenaID )

    const {set, color, rarity, booster} = searchOptions;
    let cardList = allArenaCards;

    // First filter by set if needed
    if(set){
        cardList = filterSet(cardList, set);
    }
    
    // Filter Out Basic Lands
    cardList = filterBasicLands(cardList);

    // Filter by color if needed
    if(color){
        cardList = filterColor(cardList, color);
    }

    // Filter by rarity if needed
    if(rarity){
        cardList = filterRarity(cardList, rarity);
    }

    // Filter booster if needed
    if (booster !== undefined){
        cardList = filterBooster(cardList, booster);
    }

    let finalCardList = [];
    cardList.forEach((card) =>{
        finalCardList.push({name: card.name, arenaId: card.arena_id})
    }); 
    
    // Sort the cards alphabetically
    finalCardList = sortCards(finalCardList);

    return finalCardList;
}

// Filter Set helper function
function filterSet(cardList, set){
    let newCardList = [];
    cardList.forEach((card) =>{
        if(card.set === set){
            newCardList.push(card);
        }
    });
    return newCardList;
}

// Filter Out Basic lands helper funciton
function filterBasicLands(cardList){
    let newCardList = []
    cardList.forEach((card) =>{
        if (!(card.type_line.includes('Basic Land'))){
            newCardList.push(card);
        }
    });        
    return newCardList
}

// Filter by Color helper function
function filterColor(cardList, color){
    let newCardList= [];
    cardList.forEach((card) =>{

        // Edge Case cards with multiple faces where the color is stored under card.card_faces[front, back].color 
        // using front face for color
        if (!card.colors && card.card_faces){
            if(card.card_faces[0].colors.length === 1 && card.card_faces[0].colors[0] === color){
                newCardList.push(card);
            }
        }
        else if(card.colors.length === 1 && card.colors[0] === color){
            newCardList.push(card);
        }
    });
    return newCardList;
}

// Filter by rarity helper function
function filterRarity(cardList, rarity){
    let newCardList = [];
    cardList.forEach((card) =>{

        if(card.rarity === rarity){
            newCardList.push(card)
        }
    });
    return newCardList;
}

// Filter by booster boolean value helper function
function filterBooster(cardList, booster){
    let newCardList = [];
    cardList.forEach((card) =>{
        if(card.booster === booster){
            newCardList.push(card);
        }
    });
    return newCardList;
}

// Helper function that sorts the cards alphabetically
function sortCards(cardList){
    cardList.sort( (card1, card2) => {
        const name1 = card1.name.toUpperCase(); // ignore upper and lowercase
        const name2 = card2.name.toUpperCase(); 
        if (name1 < name2)
            return -1
        if (name1 > name2)
            return 1
        // Names are equal
        return 0
    });
    return cardList;
}


// export default findCardsInSet;
module.exports = findCardsInSet;