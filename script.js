//Player needs option to 'hit' or 'stay'
//'Hit' = add another random number between 2-11, unless > 21, then they are bust
//'Stay' = if dealer score is below 17, add a random number. Repeat until score is over 17 and less than 21. If over 21, dealer is bust.
//Dealer stops and neither bust, compare scores. Closest to 21 wins.

//Need variables for keeping score of both player and dealer
var playerScore = 0;
var dealerScore = 0;
var user = "The player";
var dealer = "The dealer"

//FUNCTIONS
//function to deal random number between 2-11
function deal211() {
    var hand = Math.floor((Math.random() * 10) + 2);
    return hand;
} 
//function to deal random number between 4-21
function deal421() {
    var hand = Math.floor((Math.random() * 18) + 4);
    return hand;
}
//function to compare score to 21
function compare21 (a, b, c, d) {
    if (a === 21) {
        alert(b + " has 21 and wins this round!");
        c++
    }
    else if (a > 21) {
        alert(b + " has gone bust and loses this round");
        d++
    }
}


//Deal random number between 4-21 to player, and number between 2-11 to dealer.
var playerHand = deal421();
var dealerHand = deal211();
console.log(playerHand);
console.log(dealerHand);
//if statement so dealer's hand only shown if player does not get 21 in first round.
if (playerHand === 21) {
    alert(user + " has drawn 21 and wins this round!");
    playerScore++;
}
else if (playerHand < 21) {
    alert(user + " has drawn " + playerHand + ".");
    var playerChoice = confirm("You have " + playerHand + " and the dealer has " + dealerHand + ". Select ok to be dealt another card, or cancel to stick.");
    while (playerChoice) {
        var newCard = deal211();
        var playerHand = playerHand + newCard;
        alert(user + " was dealt " + newCard + ". You now have " + playerHand + ".");
        if (playerHand === 21) {
            playerScore++
            alert("You have 21 and have won this round!");
            break;
        }
        if (playerHand < 21) {
            var playerChoice = confirm("You have " + playerHand + ". Select ok to be dealt another card, or cancel to stick.");
        }
        else if (playerHand > 21) {
            dealerScore++
            alert("You have gone bust and lose this round.");
            break;
        }
    }
}

console.log(dealerScore);
console.log(playerScore);





//code to show scores on webpage
