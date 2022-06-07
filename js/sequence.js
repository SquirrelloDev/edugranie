//Umieść logikę gry
let sequence = []
let yourSequence = []
let level = 0

const startButton = document.querySelector("#start-button");
const info = document.querySelector("#info");
const TilesContainer = document.querySelector('.grid');

function resetGame(text){
    alert(text)
    sequence = []
    yourSequence = []
    level = 0
    startButton.classList.remove('hidden')
    info.classList.add('hidden')
    TilesContainer.classList.add('unclickable')
}


function humanTurn(level){
    TilesContainer.classList.remove('unclickable')
    info.textContent = "Twoja kolej!"
}

function activateTile(color){
    const tile = document.querySelector(`[data-tile='${color}']`)

    tile.classList.add('activated')
    setTimeout(()=> {
        tile.classList.remove('activated')
    },300)
}

function playRound(nextSequence){
    nextSequence.forEach((color,index) => {
        setTimeout(()=>{
            activateTile(color)
        },(index+1)*600)
    })
}

function nextStep(){
    const tiles = ['red', 'green','blue','yellow']
    const random = tiles[Math.floor(Math.random()*tiles.length)]

    return random;
}

function nextRound(){
    level += 1
    TilesContainer.classList.remove('unclickable');
    info.textContent = "Zaczekaj na wzór od komputera!"

    const nextSequence = [...sequence]
    nextSequence.push(nextStep())
    playRound(nextSequence)

    sequence = [...nextSequence]
    setTimeout(()=>{
        humanTurn(level)
    }, level * 600 + 1000)
}

function handleClick(tile){
    const index = yourSequence.push(tile) - 1
    const remainingTaps = sequence.length - yourSequence.length

    if(yourSequence.length === sequence.length){
        if(yourSequence.length===10){
            resetGame("Brawo! Ukończyłeś wszystkie poziomy!")
            return
        }
    }
    
    if(yourSequence[index]!==sequence[index]){
        resetGame("Ups! Coś poszło nie tak, spróbuj jeszcze raz!")
        return;
    }

    if(yourSequence.length === sequence.length){
        yourSequence = []
        info.textContent = "Dobrze Ci idzie!"
        TilesContainer.classList.add('unclickable');
        setTimeout(()=>{
            nextRound()
        }, 1000)
        return
    }

    info.textContent = "Twoja kolej! Pozostała ilość kliknięć: " + remainingTaps

}

function startGame() {
    startButton.classList.add('hidden')
    info.classList.remove('hidden')
    info.textContent = "Zaczekaj na wzór od komputera!"
    TilesContainer.classList.remove('unclickable');
    nextRound()
}
startButton.addEventListener('click', startGame)
TilesContainer.addEventListener('click',event=>{
    const {tile} = event.target.dataset

    if(tile) handleClick(tile)
})