//create variables for HTML elements
const hitBtn = document.querySelector('#hitBtn');
const stayBtn = document.querySelector('#stayBtn');
const dealerTextEl = document.querySelector('#dealer-hand');
const playerTextEl = document.querySelector('#player-hand');
const dealerTotalText = document.querySelector('#dealer-total');
const playerTotalText = document.querySelector('#player-total');
const gameOverText = document.querySelector('#game-over');

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

//wraps whole game in function so it can be replayed
function playGame() {

//Deal random number between 4-21 to player, and number between 2-11 to dealer.
let playerHand = dealRandom(4,18);
let dealerHand = dealRandom(2,10);

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
    //DONE removed the scenario where dealer reaches 21 and wins automatically - will now just stick.
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


//TODO ake game playable on the page instead of prompts
//TODO create game object that stores player and dealer info