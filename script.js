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
    hand = Math.floor((Math.random() * 18) + 4);
    return hand;
}
//function to compare score to 21
function compare21 (a, b) {
    if (a === 21) {
        console.log(b + " has 21 and wins this round!")
    }
    else if (a > 21) {
        console.log(b + " has gone bust and loses this round");
    }
    else if (a < 21) {
        console.log(b + " has drawn " + a + ".");
    }
}

//Deal random number between 4-21 to player.
var playerHand1 = deal421();
console.log(playerHand1);
compare21(playerHand1, user);

//Deals a random number between 2-11 to the dealer
var dealerHand1 = deal211();
console.log(dealerHand1);
compare21(dealerHand1, dealer);

//code to show scores on webpage
