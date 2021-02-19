//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
	const num1 = Number(req.body.n1);
	const num2 = Number(req.body.n2);
	const sum = num1 + num2;

	res.send("The result of calculation is: " + sum);
});

app.listen(3000, function () {
	console.log("Server is running now");
});
