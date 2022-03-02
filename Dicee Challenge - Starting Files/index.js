var randomNumber1 = getRandomInt();
var randomNumber2 = getRandomInt();
document.getElementById("dice_1").setAttribute("src", "images/dice"+randomNumber1+".png");
document.getElementById("dice_2").setAttribute("src", "images/dice"+randomNumber2+".png");
var header = document.querySelector("h1");

if(randomNumber1 === randomNumber2) {
    header.innerHTML = "Draw!";
} else if(randomNumber1 > randomNumber2) {
    header.innerHTML = "🚩Player 1 Wins!";
} else {
    header.innerHTML = "Player 2 Wins!🚩";
}

function getRandomInt() {
    return Math.floor(Math.random() * 6) + 1;
}
