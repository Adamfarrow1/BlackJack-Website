var cards = new Array();
let playerValue = 0;
let dealerValue = 0;
let gameOver = false;
let playerAceCount = 0;
let dealerAceCount = 0;
window.onload = startGame;
function startGame() {
    let randomSuite;
    let randomNum;
    let randomFace;
    const suites = ["H","D","S","C"];
    const faces = ["K", "Q", "J"];
    for(let i = 0 ; i < 56 ; i++){
        randomNum = Math.floor((Math.random() * 12)) + 1;
        randomSuite = Math.floor(Math.random() * 3);
        if(randomNum > 10){
            randomFace = Math.floor((Math.random() * faces.length));
            cards.push(faces[randomFace] + "-" + suites[randomSuite]);
            continue;
        }
        if(randomNum == 1){
            cards.push("A" + "-" + suites[randomSuite]);
            continue;
        }
        cards.push(randomNum + "-" + suites[randomSuite]);
    }
    console.log(cards)
    hit();
    hit();
    dealerStart();
    console.log("start")

}
function dealerStart(){
    let cardImg = document.createElement("img");
    let card = cards.pop();
    updateDealerValue(card);
    cardImg.src = "./cards/" + card + ".png";
    cardImg.className = "cards"; 
    document.getElementById("dealer-cards").append(cardImg);

}

function hit(){
    if(gameOver) return;
    let cardImg = document.createElement("img");
    let card = cards.pop();
    cardImg.src = "./cards/" + card + ".png";
    cardImg.className = "cards";
    document.getElementById("your-cards").append(cardImg);
    let cSplit = card.split("-");
    updatePlayerValue(cSplit);
    if(playerValue > 21){
        document.getElementById("result").innerText = "Bust!";
        gameOver = true;
        card = cards.pop();
        document.getElementById("back").src = "./cards/" + card + ".png";
        updateDealerValue(card.split("-"));
     }
     if(playerValue == 21){
         stand();
     }
}

function updatePlayerValue(cSplit){
    if(parseInt(cSplit[0])){
        playerValue += parseInt(cSplit[0]);
    }
    else if(cSplit[0] == "A"){
        playerValue += 11;
        playerAceCount++;
    }
    else{
        playerValue += 10;
    }
    while(playerAceCount > 0 && playerValue > 21){
        playerValue -= 10;
        playerAceCount--;
    }
    document.getElementById("player-sum").innerText = playerValue;
}

function updateDealerValue(cSplit){
    if(parseInt(cSplit[0])){
        dealerValue += parseInt(cSplit[0]);
    }
    else if(cSplit[0] == "A"){
        dealerValue += 11;
    }
    else{
        dealerValue += 10;
    }
    while(dealerAceCount > 0 && dealerValue > 21){
        dealerValue -= 10;
        dealerAceCount--;
    }
    document.getElementById("dealer-sum").innerText = dealerValue;
}

function stand(){
    if(gameOver){
        return;
    }
    gameOver = true;
    let cardImg = document.createElement("img");
    let card = cards.pop();
    document.getElementById("back").src = "./cards/" + card + ".png";
    while(dealerValue < 17){
    cardImg.src = "./cards/" + card + ".png";
    cardImg.className = "cards";
    document.getElementById("dealer-cards").append(cardImg);
    let cSplit = card.split("-");
    updateDealerValue(cSplit);
}
    console.log(dealerValue);
    updateWinner();
}


function updateWinner(){
    if(playerValue > dealerValue && playerValue <= 21){
        document.getElementById("result").innerText = "Player Wins!"
    }
    else if(playerValue < dealerValue){
        document.getElementById("result").innerText = "Dealer Wins!"
    }
    else{
        document.getElementById("result").innerText = "Draw";
    }
}

function resetGame(){
    playerAceCount = 0
    playerValue = 0
    dealerAceCount = 0
    dealerValue = 0
    gameOver = false
    cards.splice(0, cards.length)

    document.getElementById("your-cards").textContent = ''
    document.getElementById("dealer-cards").textContent = ''

    let back = document.createElement("img");
    back.src = "./cards/BACK.png"
    back.className = "cards"
    back.id = "back"
    document.getElementById("dealer-cards").append(back)

    document.getElementById("result").innerText = ""
    document.getElementById("player-sum").innerText = "";
    document.getElementById("dealer-sum").innerText = "";
    

    startGame();
}

