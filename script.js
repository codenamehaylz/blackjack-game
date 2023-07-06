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
}

//function for calculating handTotal
function sum(arr) {
    const sum = arr.reduce((a,b) => a + b, 0)
    return sum;
}

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
}

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
}

function hit() {
    if (player.handTotal < 21) {
        player.hand.push(dealRandom(2,11));
        listCardsInHand(player);
        if (player.handTotal == 21) {
            displayText("You now have 21 and will stick.");
        } else if (player.handTotal > 21) {
            displayText("You have gone bust and lose this round.")
            dealer.wins++
        };
    }
}


startBtn.addEventListener("click", firstRound);
hitBtn.addEventListener("click", hit);




/*
//if statement so dealer's hand only shown if player does not get 21 in first round.
if (playerHand === 21) {
    alert("You have been dealt 21 and win this round!");
    playerScore++;
}
else if (playerHand < 21) {
    alert("You have been dealt " + playerHand + ".");
    let playerChoice = confirm("You have " + playerHand + " and the dealer has " + dealerHand + ". Select ok to be dealt another card, or cancel to stick.");
    while (playerChoice) {
        const newCard = dealRandom(2,10);
        playerHand = playerHand + newCard;
        alert("You have been dealt " + newCard + ".");
        if (playerHand === 21) {
            alert("You now have " + playerHand + " and will stick.");
            playerChoice = false;
            break;
        }
        else if (playerHand < 21) {
            playerChoice = confirm("You now have " + playerHand + ". Select ok to be dealt another card, or cancel to stick.");
        }
        else if (playerHand > 21) {
            dealerScore++
            alert("You now have " + playerHand + ". You have gone bust and lose this round.");
            break;
        }
    }
    //player has stuck, now dealer gets their cards
    if (!playerChoice) {
        while (dealerHand < 17) {
            const dealerCard = dealRandom(2,10);
            dealerHand = dealerHand + dealerCard;
            alert("Dealer was dealt " + dealerCard + ". The dealer now has " + dealerHand + ".");
            if (dealerHand > 21) {
                playerScore++
                alert("Dealer has " + dealerHand + ". They have gone bust. You win this round!");
                break;
            }
            else if (dealerHand >= 17 && dealerHand <= 21) {
                alert("Dealer has " + dealerHand + " and is sticking.");
                //Dealer has stuck, now compare scores to find winner
                alert("Dealer has " + dealerHand + " and you have " + playerHand + ".");
                if (dealerHand > playerHand) {
                    dealerScore++
                    alert("Dealer's hand is closer to 21. You lose this round.");
                    break;
                }
                else if (playerHand > dealerHand) {
                    playerScore++
                    alert("Your hand is closer to 21. You win this round!");
                    break;
                }
                else {
                    alert("You both got the same score. It's a draw!");
                }
            }
        }
    }
}
}

//Triggers game to begin
alert("Let's play Blackjack!")
playGame();
let playAgain = confirm("Would you like to play another round?");
while (playAgain) {
    playGame();
    playAgain = confirm("Would you like to play another round?");
}
if (!playAgain) {
    alert("Thanks for playing! You won " + playerScore + " time(s), and the dealer won " + dealerScore + " time(s).");
}

console.log("Dealer's score: " + dealerScore);
console.log("Player's score: " + playerScore);
*/
