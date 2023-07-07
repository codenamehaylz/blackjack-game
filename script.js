//create variables for HTML elements
const startBtn = document.getElementById('start');
const containers = document.querySelectorAll('.hand-container');
const hitBtn = document.getElementById('hitBtn');
const stayBtn = document.getElementById('stayBtn');
const dealerHandText = document.getElementById('dealer-hand');
const playerHandText = document.getElementById('player-hand');
const dealerTotalText = document.getElementById('dealer-total');
const playerTotalText = document.getElementById('player-total');
const gameOver = document.getElementById('game-over');

//Player objects
const player = {
    name: "You",
    hand: [],
    handTotal: 0,
    wins: 0
};

const dealer = {
    name: "Dealer",
    hand: [],
    handTotal: 0,
    wins: 0
};

//Variables for keeping score of both player and dealer
let playerScore = 0;
let dealerScore = 0;

//FUNCTIONS
//function to deal random number
function dealRandom(min, max) {
    const hand = Math.floor((Math.random() * (max - min)) + min);
    return hand;
};

//function for calculating handTotal
function sum(arr) {
    const sum = arr.reduce((a,b) => a + b, 0)
    return sum;
};

//function for creating a list of cards in hand
function listCardsInHand(participant) {
    if (participant == player) {
        playerHandText.innerHTML = "";
    } else if (participant == dealer) {
        dealerHandText.innerHTML = "";
    };
    for (i = 0; i < participant.hand.length; i++) {
        const cardElement = document.createElement('li');
        cardElement.innerHTML = participant.hand[i];
        if (participant == player) {
            playerHandText.appendChild(cardElement);
            player.handTotal = sum(player.hand);
            playerTotalText.innerHTML = player.handTotal;
        } else if (participant == dealer) {
            dealerHandText.appendChild(cardElement);
            dealer.handTotal = sum(dealer.hand);
            dealerTotalText.innerHTML = dealer.handTotal;
        };
    };
};

//function to determine the text that shows up
function displayText(string) {
    gameOver.innerHTML = "";
    let gameOverText = document.createElement('p');
    gameOverText.innerHTML = string;
    gameOver.appendChild(gameOverText);
};

//wraps whole game in function so it can be replayed
//function playGame() {


function firstRound() {
    //remove button and add game elements
    startBtn.classList.add('hidden');
    containers.forEach(element => element.classList.remove('hidden'));
    //Deal random number between 4-21 to player, and number between 2-11 to dealer.
    player.hand.push(dealRandom(2,11));
    player.hand.push(dealRandom(2,11));
    dealer.hand.push(dealRandom(2,11));
    listCardsInHand(player);
    listCardsInHand(dealer);
    //Scenario if player gets a natural blackjack
    if (player.handTotal == 21) {
        dealer.hand.push(dealRandom(2,11));
        dealer.handTotal = sum(dealer.hand);
        listCardsInHand(dealer);
        if (dealer.handTotal == 21) {
            displayText("You and the dealer both got a natural blackjack (21)! It's a draw!");
        } else {
            displayText("You got a natural blackjack (21)! You win!");
            player.wins++
        };
    };
};

function hit() {
    if (player.handTotal < 21) {
        player.hand.push(dealRandom(2,11));
        listCardsInHand(player);
        if (player.handTotal == 21) {
            displayText("You now have 21 and will stick.");
            stay();
        } else if (player.handTotal > 21) {
            displayText("You have gone bust and lose this round.")
            dealer.wins++
        };
    }
};

function stay() {
    if (player.handTotal <= 21) {
        while (dealer.handTotal < 17) {
            dealer.hand.push(dealRandom(2,11));
            listCardsInHand(dealer);
            if (dealer.handTotal > 21) {
                displayText("The dealer has gone bust. You win this round!");
                player.wins++;
                break;
            } else if (dealer.handTotal >= 17 && dealer.handTotal <= 21) {
                if (dealer.handTotal > player.handTotal) {
                    displayText("The dealer is sticking. The dealer's hand is closer to 21 - you lose this round.");
                    dealer.wins++;
                } else if (dealer.handTotal < player.handTotal) {
                    displayText("The dealer is sticking. Your hand is closer to 21 - you win this round!");
                    player.wins++;
                } else if (dealer.handTotal == player.handTotal) {
                    displayText("The dealer is sticking. You both have the same score - it's a draw!");
                };
                break;
            } else {
                displayText("Something went wrong...");
            }
        };
    };
};


startBtn.addEventListener("click", firstRound);
hitBtn.addEventListener("click", hit);
stayBtn.addEventListener("click", stay);
