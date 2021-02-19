gamePattern = [];
buttonColours = ["red", "blue", "green", "yellow"];

const nextSequence = function () {
	const randomNumber = Math.floor(Math.random() * 4);

	const randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);

	var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
	audio.play();
};
