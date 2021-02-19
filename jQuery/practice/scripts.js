$("button").click(function () {
	$("h1").css("color", "purple");
});

$(document).keypress(function (e) {
	$("h1").text(e.key);
});
