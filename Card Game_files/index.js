document.addEventListener('DOMContentLoaded',function(){

})
const shuffledDeck = 'https://deckofcardsapi.com/api/deck/c8l3pg7nyyg5/shuffle/'
const regularDeck = "https://deckofcardsapi.com/api/deck/ndzbgc6via0d/draw/?count=2"
const testAPI = "https://dog.ceo/api/breeds/image/random/4"

function fetchCards() {
    return fetch(regularDeck)
      .then(resp => resp.json())
      .then(data => console.log(data))//returns an Array of two Objects
  }
//   function renderCards(allImages) {
//     const cardsContainer = document.getElementById('cards-image-containers')
//     allImages.forEach(dogImage => {
//         let img = document.createElement('IMG')
//         img.src = dogImage
//        cardsContainer.appendChild(img)
//     })
// }

// function renderCards(setOftwoCards){
//     console.log(setOftwoCards)
//     const cardsContainer = document.getElementById('cards-image-containers')
//     setOftwoCards.forEach(eachCardObj => {
//         // console.log(eachCardObj)
//          let img = document.createElement('IMG')
//          img.className = "cardWindow"
//          img.src = eachCardObj.image
        //  cardsContainer.appendChild(img)
        //  console.log(eachCardObj.image)
        // const suit = eachCardObj.suit
        // const value = eachCardObj.value
      
    // })

    // }



const form = document.forms[0]
const greetingMessage = document.getElementById('greeting')

form.addEventListener('submit', function(event){
    const submissionNames = {
        name: event.target[0].value,
        playerName: event.target[1].value
    }
    if (submissionNames.name && submissionNames.playerName){
        greetingMessage.innerHTML = `Welcome to the game ${submissionNames.name} the "${submissionNames.playerName}"!`
        form.reset()
        event.preventDefault()
    } else {
        alert("Please, introduce yourself")
        event.preventDefault()
    }
    
})


