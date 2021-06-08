document.addEventListener('DOMContentLoaded', function () {
    gameOn.style.display = "none"
    evaluate.style.display = "none"
    bankContainer.style.display = "none"

})

const regularDeck = "https://deckofcardsapi.com/api/deck/new/draw/?count=2"
const cards4Deck = "https://deckofcardsapi.com/api/deck/new/draw/?count=4"
// const blackJackDeck = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6'
const gameOn = document.getElementById('gameOn-button')
const evaluate = document.getElementById('evaluate-button')
const score = document.getElementById('score')

const form = document.forms[0]
const greetingMessage = document.getElementById('greeting')

form.addEventListener('submit', function (event) {
    event.preventDefault()
    let submissionNames = {
        name: event.target[0].value,
        playerName: event.target[1].value
    }
    if (submissionNames.name && submissionNames.playerName) {
        greetingMessage.innerHTML = `Welcome to the game ${submissionNames.name} the "${submissionNames.playerName}"!`
        form.reset()

    } else {
        alert("Please, introduce yourself")
    }
})

let cardValues = []

gameOn.addEventListener('click', fetchCards)
//first fetch request draws 4 cards
function fetchCards() {
    return fetch(cards4Deck)
        .then(resp => resp.json())
        .then(data => renderCards2(data.cards))
        .catch(function (error) {
            const alertMessage = error.message
            document.body.innerHTML = alertMessage
        })
}


//function renderCards
//receives an array of 4 cardObjs and iterates over it
//renders first card so you cant see it's value and suite
//for loop - first iteration renders house card (stays hidden)
//2,3,4 iteration renders the players cards and one dealers card (open face)
function renderCards2(array) {
    const cardsContainer = document.getElementById('cards-image-containers')
    const newArray = array.slice(1)
    const { value, suit } = array[0]
    let img1 = document.createElement('IMG')
    //refactor all this as a set up for innerHTML
    img1.src = "./images/backcard.png"
    img1.className = "hiddencard"
    img1.setAttribute("width", "226px")
    img1.setAttribute("height", "318px")
    img1.id = `${value},${suit}`
    console.log(newArray, value, suit)
    newArray.map((card) => {
        let img = document.createElement('IMG')
        img.src = card.image
        cardsContainer.appendChild(img)
    })
    cardsContainer.appendChild(img1)
    evaluateCards(array)
}


function convertValues(array) {
    array.map((element) => {
        if (element.value === "JACK" || element.value === "QUEEN" || element.value === "KING") {
            element.value = 10
        }
        else if (element.value === "ACE") {
            element.value = 11
        }
    })
}



//function Evaluate cards

function evaluateCards(array) {
    convertValues(array)
console.log(array[0].value)
    const housescore = Number(array[1].value) + Number(array[2].value)
    console.log(housescore)
    const guestscore = Number(array[0].value) + Number(array[3].value)
    console.log(guestscore)
    //order of rendered cards below (1,2 - guest cards; 3,0 - house)
    // console.log(array[1].value)
    // console.log(array[2].value)
    // console.log(array[3].value)
    // console.log(array[0].value)
}
//sets card values to Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand.
//summs up values of dealers cards
//sums up values of players cards
//if value is less than 21 offer choice of HIT or Stand, displays current sum


//second fetch request draws 2 cards at a time














// function renderCards(setOftwoCards) {

//     function removeAllChildNodes(parent) {
//         while (parent.firstChild) {
//             parent.removeChild(parent.firstChild);
//         }
//     }

//     const cardsContainer = document.getElementById('cards-image-containers')
//     if (gameOn.innerHTML === "Lets play!") {
//         gameOn.innerHTML = "Draw cards!"
//         score.disabled = true
//     }
//     else {
//         new Audio("./sound/switch.mp3").play()
//         evaluate.disabled = false
//         removeAllChildNodes(cardsContainer)

//         let value1 = []
//         cardValues.unshift(value1)
//         setOftwoCards.forEach(eachCardObj => {
//             let img = document.createElement('IMG')
//             img.className = "cardWindow"
//             img.src = eachCardObj.image
//             cardsContainer.appendChild(img)
//             let value = eachCardObj.value
//             value1.push(value)
//             // let p1 = value1[0]
//             // let p2 = value1[1]
//             score.disabled = true
//         })

//     }
// }

const increaseBet = document.getElementById('increase')
const decreaseBet = document.getElementById('decrease')
const betSetter = document.getElementById('bet')
let betAmount = 5

function addBetMoney() {
    new Audio("./sound/ascend.mp3").play()
    if (betAmount < 100) {
        betAmount += 5
        betSetter.innerHTML = betAmount
    }
    else {
        alert(`Play responsibly. $100 is your max bet`)
    }
}

function subtractBetMoney() {
    new Audio("./sound/descend.mp3").play()
    if (betAmount > 5) {
        betAmount -= 5
        betSetter.innerHTML = betAmount
    }
}

increaseBet.addEventListener('click', addBetMoney)
decreaseBet.addEventListener('click', subtractBetMoney)

const submitBet = document.getElementById('submit-bet')
const houseNamenDisplay = document.getElementById('house')
const playerNameDisplay = document.getElementById('playerName')
const bankContainer = document.querySelector('.bank-container')
const playerBank = document.getElementById('playerBank')
const houseBank = document.getElementById('houseBank')

submitBet.addEventListener('click', event => {
    const snd = new Audio("./sound/preview.mp3");
    snd.play();
    bankContainer.style.display = "block"
    gameOn.style.display = "block"
    evaluate.style.display = "block"
    houseNamenDisplay.innerHTML = "GUEST"//switched to guest
    playerNameDisplay.innerHTML = "HOUSE"//switched to house
    houseBank.innerHTML = betAmount
    playerBank.innerHTML = betAmount
    betSetter.innerHTML = betAmount
    event.preventDefault()
})

evaluate.addEventListener('click', function () {
    new Audio("./sound/calculate.mp3").play()
    score.disabled = false
    compareValues()
})

function compareValues() {
    let p1 = cardValues[0][0]

    switch (p1) {
        case "JACK":
            p1 = 11
            break;
        case "QUEEN":
            p1 = 12
            break;
        case "KING":
            p1 = 13
            break;
        case "ACE":
            p1 = 14
            break;
    };

    let p2 = cardValues[0][1]

    switch (p2) {
        case "JACK":
            p2 = 11
            break;
        case "QUEEN":
            p2 = 12
            break;
        case "KING":
            p2 = 13
            break;
        case "ACE":
            p2 = 14
            break;
    }
    if (parseInt(p1, 10) > parseInt(p2, 10)) {
        houseBank.innerHTML = parseInt(betSetter.innerHTML, 10)
        playerBank.innerHTML = 0
        totalHB.push(parseInt(betSetter.innerHTML, 10))
    }
    else if (parseInt(p1, 10) === parseInt(p2, 10)) {
        alert(`It's a draw! Play again`)
    }
    else {
        playerBank.innerHTML = parseInt(betSetter.innerHTML, 10)
        houseBank.innerHTML = 0
        totalPB.push(parseInt(betSetter.innerHTML, 10))
    }
}

const totalHB = []
const totalPB = []

score.addEventListener('click', function total() { //add dropdown that allows to choose between "show current score" and "play anew game"
    let a = totalHB.reduce(function (acc, val) {
        return (acc + val);
    }, 0)
    let b = totalPB.reduce(function (acc, val) {
        return (acc + val);
    }, 0)

    if (a > b) {
        houseBank.className = "display"
        houseBank.innerHTML = a
        playerBank.innerHTML = b
        setTimeout(function () {
            houseBank.innerHTML = 0
            playerBank.innerHTML = 0
            houseBank.className = ""
        }, 6000);
        new Audio("./sound/fail.mp3").play()

    }
    else {
        playerBank.className = "display"
        houseBank.innerHTML = a
        playerBank.innerHTML = b
        setTimeout(function () {
            houseBank.innerHTML = 0
            playerBank.innerHTML = 0
            playerBank.className = ""
        }, 6000);
        new Audio("./sound/applause.mp3").play()
    }

})
