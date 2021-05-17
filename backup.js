document.addEventListener('DOMContentLoaded', function () {
    gameOn.style.display = "none"
    evaluate.style.display = "none"

})
const shuffleDeck = 'https://deckofcardsapi.com/api/deck/1f99ujnnyb99/shuffle/'
const regularDeck = "https://deckofcardsapi.com/api/deck/new/draw/?count=2"

const gameOn = document.getElementById('gameOn-button')
const evaluate = document.getElementById('evaluate-button')
const score = document.getElementById('score')

const totalHB = []
console.log(`house total ${totalHB}`)
const totalPB = []
console.log(`player total ${totalPB}`)

score.addEventListener('click',function total() {
let a = totalHB.reduce(function(acc,val){
    return(acc +val);
},0)
console.log(a)
let b = totalPB.reduce(function(acc,val){
    return(acc +val);
},0)
console.log(b)
// houseBank.innerHTML = a
// playerBank.innerHTML = b
// event.preventDefault()
// if (a > b){
//     alert(`Sorry, House won`)
// }
// else {
//     alert(`CONGRATULATIONS!!! YOU WON!`)
// }
})
gameOn.addEventListener('click', fetchCards)


function fetchCards() {
    return fetch(regularDeck)
        .then(resp => resp.json())
        .then(data => renderCards(data.cards))
    //returns an Array of two Objects
}

function renderCards(setOftwoCards) {

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    const cardsContainer = document.getElementById('cards-image-containers')
    if (gameOn.innerHTML === "Lets play!") {
        setOftwoCards.forEach(eachCardObj => {
            let img = document.createElement('IMG')
            img.className = "cardWindow"
            img.src = eachCardObj.image
            cardsContainer.appendChild(img)
            gameOn.innerHTML = "Play again!"


        })
    } else {
        removeAllChildNodes(cardsContainer)
        evaluate.disabled = false
        // playerBank.innerHTML = 0
        // houseBank.innerHTML = 0
        let value1 = []
console.log(value1)
        evaluate.addEventListener('click', compareValues)

        function compareValues() {

            let p1 = value1[0]
            console.log(`p1 ${p1}`)
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
            console.log(`p1 after transitioin${p1}`)
            let p2 = value1[1]
            console.log(`p2 ${p2}`)
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
            console.log(`p2 after transitioin${p2}`)
            // console.log(p1, p2)
            if (parseInt(p1, 10) > parseInt(p2, 10)) {
console.log(parseInt(p1, 10) > parseInt(p2, 10))
                // playerBank.innerHTML = 'Lost'
                // let c = parseInt(betSetter.innerHTML, 10)
                houseBank.innerHTML = parseInt(betSetter.innerHTML, 10)
                playerBank.innerHTML = 0
                totalHB.push(parseInt(betSetter.innerHTML, 10))
                console.log(`pushing ${parseInt(betSetter.innerHTML, 10)} to house`)
            }

            else {
                // let d = 0
                // let d = parseInt(betSetter.innerHTML, 10)
                playerBank.innerHTML = parseInt(betSetter.innerHTML, 10)
                houseBank.innerHTML = 0
                totalPB.push(parseInt(betSetter.innerHTML, 10))
                console.log(`pushing ${parseInt(betSetter.innerHTML, 10)} to player`)
            }

            // event.preventDefault()
        }
        setOftwoCards.forEach(eachCardObj => {
            let img = document.createElement('IMG')
            img.className = "cardWindow"
            img.src = eachCardObj.image
            cardsContainer.appendChild(img)
            let value = eachCardObj.value
            value1.push(value)
        })
    }
}

// function CalculateHouseBank(amount){ //p1
// bankH.push(parseInt(betSetter.innerHTML,10))
// }

// playerBank.innerHTML = 0


// function CalculatePlayerBank(){ //p1
//     playerBank.innerHTML = betSetter.innerHTML  
//     if(playerBank.innerHTML = 0){
//         playerBank.innerHTML = betSetter.innerHTML
//     }
//     else{
//         playerBank.innerHTML =playerBank.innerHTML + betSetter.innerHTML

//     }
// }
const form = document.forms[0]
const greetingMessage = document.getElementById('greeting')
// const betContainer = getElementById('bet-container')
const betIntro = document.getElementById('instruction2')


form.addEventListener('submit', function (event) {
    let submissionNames = {
        name: event.target[0].value,
        playerName: event.target[1].value
    }
    if (submissionNames.name && submissionNames.playerName) {
        greetingMessage.innerHTML = `Welcome to the game ${submissionNames.name} the "${submissionNames.playerName}"!`
        // betIntro.innerHTML = `Hey, ${submissionNames.playerName}, what's your bet?`
        form.reset()
        // betContainer.style.display = 'block';
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

    if (betAmount < 100) {
        betAmount += 5
        betSetter.innerHTML = betAmount
    }
    else {
        alert(`Play responsibly. $100 is your max bet`)
    }
}

function subtractBetMoney() {
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
    gameOn.style.display = "block"
    evaluate.style.display = "block"
    houseNamenDisplay.innerHTML = "house"
    playerNameDisplay.innerHTML = "guest"
    // houseBank.innerHTML = 0
    // playerBank.innerHTML = 0
    betSetter.innerHTML = betAmount
    event.preventDefault()
})

