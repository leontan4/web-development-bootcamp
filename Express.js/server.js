//jshint esversion: 6
const express = require("express");

const app = express();

app.get("/", function (req, res) {
	res.send("<h1>Hello, world!</h1>");
});

app.get("/contact", function (req, res) {
	res.send("Contact me at: leon.tan004@gmail.com");
});

app.get("/about", function (req, res) {
	res.send("MY name is Leon and I need money");
});

app.get("/hobbies", function (req, res) {
	res.send("<ul><li>Chinese Chess</li><li>LeetCode</li></ul>");
});

app.listen(3000, function () {
	console.log("Server started on port 3000");
});
