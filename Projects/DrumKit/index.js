const drums = document.querySelectorAll(".drum");

// Drum animation
const btnAnimation = function (key) {
	const activeButton = document.querySelector("." + key);
	activeButton.classList.add("pressed");

	// Timer for shading to disappear
	setTimeout(function () {
		activeButton.classList.remove("pressed");
	}, 100);
};

// Drum sound
const drumSound = function (key) {
	for (let i = 0; i < drums.length; i++) {
		let pos = drums[i].classList.value.slice(0, -7);
		if (drums[i].classList.contains(key)) {
			let audio = new Audio(`sounds/${pos}.mp3`);
			audio.play();
		}
	}
};

// Using "click"
// with For Each
drums.forEach(function (elem) {
	elem.addEventListener("click", function () {
		drumSound(this.classList.value.slice(0, -7));
		btnAnimation(this.textContent);
	});
});

// Using "keypress"
document.addEventListener("keypress", function (e) {
	const keyValue = e.key;
	drumSound(keyValue);
	btnAnimation(keyValue);
});
