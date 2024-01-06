// Create variables for HTML elements
const startBtn = document.getElementById('start');
const containers = document.querySelectorAll('.hand-container');
const hitBtn = document.getElementById('hitBtn');
const stayBtn = document.getElementById('stayBtn');
const dealerHandText = document.getElementById('dealer-hand');
const playerHandText = document.getElementById('player-hand');
const dealerTotalText = document.getElementById('dealer-total');
const playerTotalText = document.getElementById('player-total');
const gameOver = document.getElementById('game-over');
const playerWinText = document.getElementById('player-wins');
const dealerWinText = document.getElementById('dealer-wins');

// Player objects
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


//FUNCTIONS

// Deal random number
function dealRandom(min, max) {
    const hand = Math.floor((Math.random() * (max - min)) + min);
    return hand;
};

// Calculate handTotal
function sum(arr) {
    const sum = arr.reduce((a,b) => a + b, 0)
    return sum;
};

// Creates the list of 'cards' in hand
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

// Display text at the bottom of the screen
function displayText(string) {
    gameOver.innerHTML = "";
    let gameOverText = document.createElement('p');
    gameOverText.innerHTML = string;
    gameOver.appendChild(gameOverText);
};

//TODO endGame also updates/displays the player wins & losses on screen
// playerWinText.innerText = "Won: " + player.wins;
// dealerWinText.innerText = "Lost: " + dealer.wins;

function endGame(message, winner="none") {
    startBtn.innerText = "Play again";
    startBtn.classList.remove('hidden');
    stayBtn.classList.add('hidden');
    hitBtn.classList.add('hidden');
    if (winner == player) {
        player.wins++;
        displayText(message);
    } else if (winner == dealer) {
        dealer.wins++;
        displayText(message);
    } else if (winner == "none") {
        displayText(message);
    };
};

function start() {
    //reset game elements
    startBtn.classList.add('hidden');
    hitBtn.classList.remove('hidden');
    stayBtn.classList.remove('hidden');
    displayText('');
    player.hand = [];
    dealer.hand = [];
    listCardsInHand(player);
    listCardsInHand(dealer);
    containers.forEach(element => element.classList.remove('hidden'));
    //Deal random numbers between 2-11, two to player and one to dealer.
    player.hand.push(dealRandom(2,11));
    player.hand.push(dealRandom(2,11));
    dealer.hand.push(dealRandom(2,11));
    listCardsInHand(player);
    listCardsInHand(dealer);
    //Scenario if player gets a natural blackjack
    if (player.handTotal == 21) {
        dealer.hand.push(dealRandom(2,11));
        listCardsInHand(dealer);
        if (dealer.handTotal == 21) {
            endGame("You and the dealer both got a natural blackjack (21)! It's a draw!");
        } else {
            endGame("You got a natural blackjack (21)! You win!", player);
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
            endGame("You have gone bust and lose this round.", dealer)
        };
    };
};

function stay() {
    if (player.handTotal <= 21) {
        hitBtn.classList.add("hidden");
        stayBtn.classList.add("hidden");
        while (dealer.handTotal < 17) {
            dealer.hand.push(dealRandom(2,11));
            listCardsInHand(dealer);
            if (dealer.handTotal > 21) {
                endGame("The dealer has gone bust. You win this round!", player);
                break;
            } else if (dealer.handTotal >= 17 && dealer.handTotal <= 21) {
                if (dealer.handTotal > player.handTotal) {
                    endGame("The dealer is sticking. The dealer's hand is closer to 21 - you lose this round.", dealer);
                } else if (dealer.handTotal < player.handTotal) {
                    endGame("The dealer is sticking. Your hand is closer to 21 - you win this round!", player);
                } else if (dealer.handTotal == player.handTotal) {
                    endGame("The dealer is sticking. You both have the same score - it's a draw!");
                };
                break;
            } else {
                displayText("Something went wrong...");
            };
        };
    };
};


startBtn.addEventListener("click", start);
hitBtn.addEventListener("click", hit);
stayBtn.addEventListener("click", stay);
