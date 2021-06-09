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

const cardsContainer = document.getElementById('cards-image-containers')
//function renderCards
//receives an array of 4 cardObjs and iterates over it
//renders first card so you cant see it's value and suite
//for loop - first iteration renders house card (stays hidden)
//2,3,4 iteration renders the players cards and one dealers card (open face)
function renderCards(array) {
    const newArray = array.slice(1)
    const { value, suit } = array[0]
    let img1 = document.createElement('IMG')
    //refactor all this as a set up for innerHTML
    img1.src = "./images/backcard.png"
    img1.className = "smallcard"
    img1.setAttribute("width", "226px")
    img1.setAttribute("height", "318px")
    img1.id = `${value},${suit}`
    console.log(newArray, value, suit)
    newArray.map((card) => {
        let img = document.createElement('IMG')
        img.src = card.image
        img.className = "smallcard"
        cardsContainer.appendChild(img)
    })
    cardsContainer.appendChild(img1)
    evaluateCards(array)
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

function fetchCards2(url, position, housescore, guestscore) {
    return fetch(url)
        .then(resp => resp.json())
        .then(data => renderOneCard(data.cards, position, housescore, guestscore))
        .catch(function (error) {
            const alertMessage = error.message
            document.body.innerHTML = alertMessage
        })
}

const hitButton = document.createElement('button')
const standButton = document.createElement('button')
hitButton.className = "buttons"
standButton.className = "buttons"
hitButton.innerText = "HIT"
standButton.innerText = "STAND"
hitButton.disabled = true
standButton.disabled = true
document.body.append(standButton, hitButton)

function renderOneCard(data, position, housescore, guestscore) {
    // (function renderValues(data) {
    //     if (data.value === "JACK" || data.value === "QUEEN" || data.value === "KING") {
    //         data.value = 10
    //     }
    //     else if (data.value === "ACE") {
    //         data.value = 11
    //     }
    // })(data)
    convertValues(data)
    let img2 = document.createElement('IMG')
    img2.src = data[0].image
    img2.className = "smallcard"
    const extraGuestCards = document.querySelector("#extraGUESTcards-container")
    extraGuestCards.appendChild(img2)
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
            let img3 = document.createElement('IMG')
            img3.src = data[1].image
            img3.className = "smallcard"
            const extraHouseCards = document.querySelector("#extraHOUSEcards-container")
            extraHouseCards.appendChild(img3)
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
                let img3 = document.createElement('IMG')
                img3.src = data[1].image
                img3.className = "smallcard"
                const extraHouseCards = document.querySelector("#extraHOUSEcards-container")
                extraHouseCards.appendChild(img3)
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
    // if (position === "guest") {
    //     let img2 = document.createElement('IMG')
    //     img2.src = data[0].image
    //     img2.className = "smallcard"
    //     const extraGuestCards = document.querySelector("#extraGUESTcards-container")
    //     extraGuestCards.appendChild(img2)
    //     let newPlayerScoreG = (Number(data[0].value) + Number(playerScore))
    //     console.log(newPlayerScoreG)
    //     if (newPlayerScoreG < 21) {
    //         console.log("Now it.s House turn")
    // let img4 = document.createElement('IMG')
    //     img4.src = data[3].image 
    //     img4.className = "smallcard"
    //     const extraHouseCards = document.querySelector("#extraHOUSEcards-container")
    //     extraHouseCards.appendChild(img4)
    // hitButton.addEventListener('click', ()=>console.log("HIT"))
    // standButton.addEventListener('click', ()=>console.log("STAND"))
    // }
    // if (newPlayerScoreG === 21) {
    //     hitButton.disabled = true
    //     standButton.disabled = true
    //     alert("Guest, you got a Black Jack")
    // }
    // if (newPlayerScoreG > 21) {
    //     hitButton.disabled = true
    //     standButton.disabled = true
    //     alert("Guest, you are BUSTED! House wins")

    // }
    // else {
    //     let img4 = document.createElement('IMG')
    //         img4.src = data[3].image 
    //         img4.className = "smallcard"
    //         const extraGuestCards = document.querySelector("#extraGUESTcards-container")
    //         extraGuestCards.appendChild(img4)
    // }


    // }
    // if (position === "both"){
    //     let img4 = document.createElement('IMG')
    //     img4.src = data[0].image 
    //     img4.className = "smallcard"
    //     const extraGuestCards = document.querySelector("#extraGUESTcards-container")
    //     extraGuestCards.appendChild(img4)

    // }
    // else if (position === "house") {
    //     if (playerScore >= 17) {
    //         console.log("Decision: HOUSE stands")
    //     }
    //     if (playerScore < 17) {
    //         let img3 = document.createElement('IMG')
    //         img3.src = data[1].image
    //         img3.className = "smallcard"
    //         const extraHouseCards = document.querySelector("#extraHOUSEcards-container")
    //         extraHouseCards.appendChild(img3)
    //         let newPlayerScoreH = (Number(data[1].value) + Number(playerScore))
    //         console.log(newPlayerScoreH)
    //         if (newPlayerScoreH === 21) {
    //             console.log(newPlayerScoreH)
    //             alert("House, you got a Black Jack")
    //             hitButton.disabled = true
    //             standButton.disabled = true
    //         }
    //         if (newPlayerScoreH > 21) {
    //             console.log(newPlayerScoreH)
    //             alert("House is a BUST! Guest wins")
    //             hitButton.disabled = true
    //             standButton.disabled = true
    //         }

    //     }

    // }
}

//if value is less than 21 offer choice of HIT or Stand, displays current sum
function calculateDraw(housescore, guestscore, position) {
    // if (position === "guest") {
    if (guestscore <= 20) {
        //fetch request for 1 card
        console.log('GUEST: Choose HIT or STAND')
        // fetchCards1(oneCard, position, playerScore)
        hitButton.disabled = false
        standButton.disabled = false
        hitButton.addEventListener('click', () => fetchCards2(twoCards, "guest", housescore, guestscore))
        //     standButton.addEventListener('click', () => {
        //         console.log("House Turn")
        //         if (housescore < 17){
        //             console.log("render additional")
        //         }
        //         if (housescore >= 17 && housescore <= 20) {
        //             const decision = Math.ceil(Math.random() * 10)
        //             if (decision <= 5) {
        //                 console.log("HOUSE Decision: draw another", decision)
        //             }
        //             else {
        //                 console.log('HOUSE: Decision: I stand', decision)
        //             }
        //         }

        // })
    }
    if (guestscore === 21) {
        //congratulations;displays wonner name; end game - do you want to play another game?
        console.log("Guest, you got a Black Jack")
        // const newGameButton = document.createElement('button')
        // newGameButton.innerText = "New Game"
        // document.body.appendChild(newGameButton)
        // newGameButton.addEventListener('click', ()=>{
        //     cardsContainer.innerHTML = ""
        //     fetchCards(cards4Deck)
        // })
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

    // }//end of else
}

//function Evaluate cards

function evaluateCards(array) {
    convertValues(array)
    //summs up values of dealers cards
    let guestscore = Number(array[1].value) + Number(array[2].value)
    console.log(guestscore)
    //sums up values of players cards
    let housescore = Number(array[0].value) + Number(array[3].value)
    console.log(housescore)
    calculateDraw(housescore, guestscore)
    // calculateDraw(housescore, guestscore, "house")
    //order of rendered cards below (1,2 - guest cards; 3,0 - house)
    // console.log(array[1].value)
    // console.log(array[2].value)
    // console.log(array[3].value)
    // console.log(array[0].value)

}








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
