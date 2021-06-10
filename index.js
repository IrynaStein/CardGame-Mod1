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
const cardsContainer = document.getElementById('cards-image-containers')
const houseCards = document.querySelector("#extraHOUSEcards-container")
const guestCards = document.querySelector("#extraGUESTcards-container")

const secondFetchData = []

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
        console.log("Please, introduce yourself")
    }
})

let cardValues = []
let hiddenCard = ""


gameOn.addEventListener('click', () => fetchCards(cards4Deck))
//first fetch request draws 4 cards
function fetchCards(url) {
    houseCards.innerHTML = ""
    guestCards.innerHTML = ""
    gameOn.innerText = ""
    gameOn.disabled = true
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
function renderCards(array) {
    const newArray = array.slice(2)
    const { value, image } = array[0]
    hiddenCard = image
    console.log(value)
    const value1 = array[1].value
    // const suit1 = array[1].suit
    let img1 = document.createElement('IMG')
    //refactor all this as a set up for innerHTML
    img1.src = "./images/backcard.png"
    img1.setAttribute("width", "108 px")
    img1.setAttribute("height", "150 px")
    img1.id = "hidden-card"//from array[0]
    displayACard(array[1].image, houseCards)
    houseCards.appendChild(img1)
    newArray.map((card) => {
        displayACard(card.image, guestCards)
    })
    evaluateCards(array)
}



let guestscore = ""
let newScoreArray = ""


//function Evaluate cards
function evaluateCards(array) {
    // console.log(array)
    convertValues(array)
    //summs up values of dealers cards
    guestscore = Number(array[2].value) + Number(array[3].value)
    // console.log(array[2].value , array[3].value) 
    playerScoreDisplay.innerText = guestscore
    console.log(guestscore + "guestscore")
    //sums up values of players cards
    // console.log(array[0].value, array[1].value)
    housescore = Number(array[0].value) + Number(array[1].value)
    houseScoreDisplay.innerText = ""
    console.log(housescore + "housescore")
    calculateDraw(housescore, guestscore)
    //order of rendered cards (0,1 - house; 2,3 - guest)
}
function endOfGame(message) {
    hitButton.disabled = true
    standButton.disabled = true
    document.getElementById('hidden-card').remove()
    displayACard(hiddenCard, houseCards)
    houseScoreDisplay.innerText = housescore
    gameOn.disabled = false
    gameOn.innerText = message
    setTimeout(() => { return gameOn.innerHTML = "NEW GAME" }, 3000)
}


hitButton.addEventListener('click', () => {
    displayACard(popElement(), guestCards)
    let d = convertValues(newScoreArray)
    guestscore = (Number(guestscore) + Number(d))
    console.log(guestscore + "updated guest score")
    playerScoreDisplay.innerText = guestscore
    if (guestscore === 21) {
        endOfGame("GUEST: BLACK JACK")
    }
    else if (guestscore > 21) {
        endOfGame("GUEST: BUST")
    }
    else {
        gameOn.innerText = `IT'S HOUSE TURN`
        hitButton.disabled = true
        standButton.disabled = true
        hitOrStandHouse()
    }
})



function popElement() {
    let a = secondFetchData[0].pop()
    newScoreArray = a.value
    return a.image
}

//function calculates card values 
function calculateDraw(housescore, guestscore) {
    fetchCards4(twoCards)
    hitOrStandPlayer(guestscore, housescore)

}


// functions hold logic of "move" decisions 
function hitOrStandPlayer() {
    if (guestscore <= 20) {
        if (housescore === 21) {
            endOfGame("HOUSE: BLACK JACK")
        }
        else if (housescore > 21) {
            endOfGame("HOUSE: BUST")
        }
        else {
            //hit or stand
            hitButton.disabled = false
            standButton.disabled = false
            // hit - draw another card
            //stand return -> hit or stand House
            standButton.addEventListener('click', () => {
                gameOn.innerHTML = 'GUEST: STANDS'
                hitOrStandHouse()
            })

        }
    }
    else if (guestscore === 21) {
        //Black-Jack
        endOfGame("GUEST: BLACK JACK")
    }
    else if (guestscore > 21) {
        //BUST
        endOfGame("GUEST BUST")
    }
}

let housescore = ""
console.log(housescore)

function hitOrStandHouse() {
    if (housescore <= 17) {
        // hit
        displayACard(popElement(), houseCards)
        let b = convertValues(newScoreArray)
        housescore = (Number(housescore) + Number(b))//DOESNT ADD HERE
        console.log(housescore)
        if (housescore === 21) {
            //Black-Jack
            endOfGame('HOUSE: BLACK JACK')
        }
        else if (housescore < 21) {
            gameOn.innerText = "GUEST: YOUR TURN"
            hitButton.disabled = false
            standButton.disabled = false
        }
        else {
            //BUST
            endOfGame('HOUSE: BUST')
        }
    }
    else if (housescore > 17 && housescore <= 20) {
        const decision = Math.ceil(Math.random() * 10)
        if (decision <= 5) {
            console.log("HOUSE Decision: draw another card", decision)
            displayACard(popElement(), houseCards)
            let c = convertValues(newScoreArray)
            housescore = (Number(housescore) + Number(c))//DOESNT WORK HERE
            console.log(housescore + "updated house score")
            if (housescore === 21) {
                //Black-Jack
                endOfGame('HOUSE: BLACK JACK')
            }
            else if (housescore < 21) {
                gameOn.innerHTML = "GUEST: YOUR TURN"
                hitButton.disabled = false
                standButton.disabled = false
            }
            else {
                //BUST
                endOfGame('HOUSE: BUST')
            }
        } else {
            gameOn.innerHTML = "GUEST: YOUR TURN"
            hitButton.disabled = false
            standButton.disabled = false
        }

    }
    else if (housescore === 21) {
        //Black-Jack
        endOfGame('HOUSE BLACK JACK')
    }
    else if (housescore > 21) {
        //BUST
        endOfGame('HOUSE BUST')
    }
}

function fetchCards4(url) {
    return fetch(url)
        .then(resp => resp.json())
        .then(data => dataProcess(data.cards))
        .catch(function (error) {
            const alertMessage = error.message
            document.body.innerHTML = alertMessage
        })
}


function dataProcess(data) {
    return secondFetchData.push(data)
}

//sets card values to Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand.
function convertValues(array) {
    if (Array.isArray(array)) {
        array.map((element) => {
            if (element.value === "JACK" || element.value === "QUEEN" || element.value === "KING") {
                element.value = 10
            }
            else if (element.value === "ACE") {
                element.value = 11
            }
        })
    }
    else {
        if (array === "JACK" || array === "QUEEN" || array === "KING") {
            return array = 10
        }
        else if (array === "ACE") {
            return array = 11
        }
        else {
            return array
        }
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
        console.log(`Play responsibly. $100 is your max bet`)
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
        console.log(`It's a draw! Play again`)
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



