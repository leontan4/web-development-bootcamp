let randomNumber1 = Math.floor(Math.random() * 6 + 1);
let newAttr1 = "images/dice" + randomNumber1 + ".png";
let dice1 = document.querySelector(".img1").setAttribute("src", newAttr1);

let randomNumber2 = Math.floor(Math.random() * 6 + 1);
let newAttr2 = "images/dice" + randomNumber2 + ".png";
let dice2 = document.querySelector(".img2").setAttribute("src", newAttr2);

if (randomNumber1 > randomNumber2) {
	document.querySelector("h1").textContent = "🚩Player 1 Wins!";
} else if (randomNumber1 === randomNumber2) {
	document.querySelector("h1").textContent = "🚩Draw!🚩";
} else {
	document.querySelector("h1").textContent = "Player 2 Wins!🚩";
}
