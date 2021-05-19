document.addEventListener('DOMContentLoaded', function () {
    gameOn.style.display = "none"
    evaluate.style.display = "none"
    bankContainer.style.display = "none"

})

const regularDeck = "https://deckofcardsapi.com/api/deck/new/draw/?count=2"
const gameOn = document.getElementById('gameOn-button')
const evaluate = document.getElementById('evaluate-button')
const score = document.getElementById('score')

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

let cardValues = []

gameOn.addEventListener('click', fetchCards)

function fetchCards() {
    return fetch(regularDeck)
        .then(resp => resp.json())
        .then(data => renderCards(data.cards))
        .catch(function (error) {
            const alertMessage = error.message
            document.body.innerHTML = alertMessage
        })
}

function renderCards(setOftwoCards) {

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    const cardsContainer = document.getElementById('cards-image-containers')
    if (gameOn.innerHTML === "Lets play!") {
        gameOn.innerHTML = "Draw cards!"
        score.disabled = true
    } else {
        new Audio("./sound/switch.mp3").play()
        evaluate.disabled = false
        removeAllChildNodes(cardsContainer)

        let value1 = []
        console.log(value1)
        cardValues.unshift(value1)
        setOftwoCards.forEach(eachCardObj => {
            let img = document.createElement('IMG')
            img.className = "cardWindow"
            img.src = eachCardObj.image
            cardsContainer.appendChild(img)
            let value = eachCardObj.value
            value1.push(value)
            let p1 = value1[0]
            let p2 = value1[1]
            score.disabled = true
        })

    }
}

const form = document.forms[0]
const greetingMessage = document.getElementById('greeting')

form.addEventListener('submit', function (event) {
    let submissionNames = {
        name: event.target[0].value,
        playerName: event.target[1].value
    }
    if (submissionNames.name && submissionNames.playerName) {
        greetingMessage.innerHTML = `Welcome to the game ${submissionNames.name} the "${submissionNames.playerName}"!`
        form.reset()
        event.preventDefault()
    } else {
        alert("Please, introduce yourself")
        event.preventDefault()
    }

})

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
    houseNamenDisplay.innerHTML = "house"
    playerNameDisplay.innerHTML = "guest"
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

    if (p1 === "JACK") {
        p1 = 11
    }
    if (p1 === "QUEEN") {
        p1 = 12
    }
    if (p1 === "KING") {
        p1 = 13
    }
    if (p1 === "ACE") {
        p1 = 14
    }

    let p2 = cardValues[0][1]

    if (p2 === "JACK") {
        p2 = 11
    }
    if (p2 === "QUEEN") {
        p2 = 12
    }
    if (p2 === "KING") {
        p2 = 13
    }
    if (p2 === "ACE") {
        p2 = 14
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
