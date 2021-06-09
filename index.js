document.addEventListener('DOMContentLoaded', function () {
    gameOn.style.display = "none"
    evaluate.style.display = "none"
    bankContainer.style.display = "none"

})

const twoCards = "https://deckofcardsapi.com/api/deck/new/draw/?count=4"
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

gameOn.addEventListener('click', () => fetchCards(cards4Deck))
//first fetch request draws 4 cards
function fetchCards(url) {
    return fetch(url)
        .then(resp => resp.json())
        .then(data => renderCards(data.cards))
        .catch(function (error) {
            const alertMessage = error.message
            document.body.innerHTML = alertMessage
        })
}

function displayACard(srcUrl, appendTo) {
    let img = document.createElement('IMG')
    img.src = srcUrl
    img.setAttribute("width", "108 px")
    img.setAttribute("height", "150 px")
    appendTo.appendChild(img)
}

const cardsContainer = document.getElementById('cards-image-containers')
const houseCards = document.querySelector("#extraHOUSEcards-container")
const guestCards = document.querySelector("#extraGUESTcards-container")


function renderCards(array) {
    console.log(array)
    const newArray = array.slice(2)
    const { value, suit } = array[0]
    const value1 = array[1].value
    const suit1 = array[1].suit
    let img1 = document.createElement('IMG')
    //refactor all this as a set up for innerHTML
    img1.src = "./images/backcard.png"
    img1.setAttribute("width", "108 px")
    img1.setAttribute("height", "150 px")
    houseCards.appendChild(img1)
    img1.id = `${value},${suit}`//from array[0]
    displayACard(array[1].image, houseCards)
    console.log(newArray, value + suit, value1 + suit1)
    newArray.map((card) => {displayACard(card.image, guestCards)
    })   
    evaluateCards(array)
}

//function Evaluate cards
function evaluateCards(array) {
    console.log(array)
    convertValues(array)
    //summs up values of dealers cards
    let guestscore = Number(array[1].value) + Number(array[2].value)
    playerScoreDisplay.innerText = guestscore
    console.log(guestscore)
    //sums up values of players cards
    let housescore = Number(array[0].value) + Number(array[3].value)
    houseScoreDisplay.innerText = ""
    console.log(housescore)
    calculateDraw(housescore, guestscore)
    // calculateDraw(housescore, guestscore, "house")
    //order of rendered cards below (1,2 - guest cards; 3,0 - house)
    // console.log(array[1].value)
    // console.log(array[2].value)
    // console.log(array[3].value)
    // console.log(array[0].value)

}

function hitOrStandPlayer(score){
    if (position === guest){
        if (score <=20){
            //hit or stand
// hit - draw another card
//stand return -> hit or stand House
        }
        if (score === 21){
            //Black-Jack
        }
        else {
            //BUST
        }
    }
}

function hitOrStandHouse(score){
        if (score <=17){
            // hit
        }
        if (score > 17 && score <=20){
            //Math.random decision to hit of stand
            //if hit -> draw a card
            //if stand hitOrStand player
        }
        if (score === 21){
            //Black-Jack
        }
        else {
            //BUST
        }
    }

//sets card values to Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand.
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

const hitButton = document.createElement('button')
const standButton = document.createElement('button')
hitButton.className = "buttons"
standButton.className = "buttons"
hitButton.innerText = "HIT ME"
standButton.innerText = "STAND"
hitButton.disabled = true
standButton.disabled = true
evaluate.append(standButton, hitButton)
const submitBet = document.getElementById('submit-bet')
const houseNamenDisplay = document.getElementById('houseName')
const playerNameDisplay = document.getElementById('guestName')
const bankContainer = document.querySelector('.bank-container')
const playerBank = document.getElementById('guestBank')
const houseBank = document.getElementById('houseBank')
const houseScoreDisplay = document.querySelector("#houseScoreBoard")
const playerScoreDisplay = document.querySelector("#guestScoreBoard")


function fetchCards2(url, position, housescore, guestscore) {
    return fetch(url)
        .then(resp => resp.json())
        .then(data => renderOneCard(data.cards, position, housescore, guestscore))
        .catch(function (error) {
            const alertMessage = error.message
            document.body.innerHTML = alertMessage
        })
}



function renderOneCard(data, position, housescore, guestscore) {
    convertValues(data)
    displayACard(data[0].image, guestCards )
    let newPlayerScoreG = (Number(data[0].value) + Number(guestscore))
    console.log(newPlayerScoreG)
    if (newPlayerScoreG === 21) {
        hitButton.disabled = true
        standButton.disabled = true
        alert("Guest, you got a Black Jack")
    }
    if (newPlayerScoreG > 21) {
        hitButton.disabled = true
        standButton.disabled = true
        alert("Guest, you are BUSTED! House wins")
    }
    if (newPlayerScoreG < 21) {
        console.log("Guest, it's house turn")
        if (housescore < 17) {
            displayACard(data[1].image, houseCards)
            let newPlayerScoreH = (Number(data[1].value) + Number(housescore))
            console.log(newPlayerScoreH)
            if (newPlayerScoreH > 21) {
                console.log("House you are BUSTED! Guest wins")
            }
            if (newPlayerScoreH === 21) {
                console.log("House, you got BLACK JACK")
            }
            if (newPlayerScoreH < 21) {
                console.log("Need another card")
            }
        }
        if (housescore >= 17 && housescore <= 20) {
            const decision = Math.ceil(Math.random() * 10)
            if (decision <= 5) {
                console.log("HOUSE Decision: draw another card", decision)
                displayACard(data[1].image, houseCards)
                let newPlayerScoreH = (Number(data[1].value) + Number(housescore))
                console.log(newPlayerScoreH)
                if (newPlayerScoreH > 21) {
                    console.log("House you are BUSTED! Guest wins")
                }
                if (newPlayerScoreH === 21) {
                    console.log("House, you got BLACK JACK")
                }
                if (newPlayerScoreH < 21) {
                    console.log("Need another card#2")
                }
            }
            else {
                console.log('HOUSE: Decision: I stand', decision)
            }
        }

    }
}

//function calculates card values 
function calculateDraw(housescore, guestscore, position) {
    if (guestscore <= 20) {
        console.log('GUEST: Choose HIT or STAND')
        hitButton.disabled = false
        standButton.disabled = false
        hitButton.addEventListener('click', () => fetchCards2(twoCards, "guest", housescore, guestscore))

    }
    if (guestscore === 21) {
        //congratulations;displays wonner name; end game - do you want to play another game?
        console.log("Guest, you got a Black Jack")

    }
    if (guestscore > 21) {
        //too bad; displays winner's name; end game - do you want to play another game
        console.log("Guest, you are BUSTED! House wins")

    }
    // }
    // if (position === "house") {
    if (housescore < 17) {
        //fetch request for 1 card
        console.log('HOUSE: draw another card')
        // fetchCards1(oneCard, position, playerScore)
    }
    if (housescore >= 17 && housescore <= 20) {
        const decision = Math.ceil(Math.random() * 10)
        if (decision <= 5) {
            console.log("HOUSE Decision: draw another", decision)
        }
        else {
            console.log('HOUSE: Decision: I stand', decision)
        }
    }
    if (housescore === 21) {
        console.log("House, you got a Black Jack")

    }
    if (housescore > 21) {
        console.log("House is a BUST! Guest wins")

    }

}



//create a button within Modal Box for a new game 
        // const newGameButton = document.createElement('button')
        // newGameButton.innerText = "New Game"
        // document.body.appendChild(newGameButton)
        // newGameButton.addEventListener('click', ()=>{
        //     cardsContainer.innerHTML = ""
        //     fetchCards(cards4Deck)
        // })




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



submitBet.addEventListener('click', event => {
    const snd = new Audio("./sound/preview.mp3");
    snd.play();
    bankContainer.style.display = "block"
    gameOn.style.display = "block"
    evaluate.style.display = "block"
    houseNamenDisplay.innerHTML = "HOUSE"
    playerNameDisplay.innerHTML = "GUEST"
    houseBank.innerHTML = betAmount
    playerBank.innerHTML = betAmount
    betSetter.innerHTML = betAmount
    event.preventDefault()
})

// evaluate.addEventListener('click', function () {
//     new Audio("./sound/calculate.mp3").play()
//     score.disabled = false
//     compareValues()
// })

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
