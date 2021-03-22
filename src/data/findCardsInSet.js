// import allArenaCards from './arenaCards20210314173019.json';
const allArenaCards = require('./arenaCards20210314173019.json');

function findCardsInSet(set, color, rarity, booster){
    // First filter by set
    let cardList = filterSet(allArenaCards, set);
    
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

function filterRarity(cardList, rarity){
    let newCardList = [];
    cardList.forEach((card) =>{

        if(card.rarity === rarity){
            newCardList.push(card)
        }
    });
    return newCardList;
}

function filterBooster(cardList, booster){
    let newCardList = [];
    cardList.forEach((card) =>{
        if(card.booster === booster){
            newCardList.push(card);
        }
    });
    return newCardList;
}




// export default findCardsInSet;
module.exports = findCardsInSet;