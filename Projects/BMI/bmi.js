//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function (req, res) {
	const weight = parseFloat(req.body.w);
	const height = parseFloat(req.body.h);
	const n = weight / (height * height);

	res.send("Your BMI is: " + n);
});

app.listen(3000, function () {
	console.log("Server has started running on 3000");
});
