const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	res.sendFile(`${__dirname}/index.html`);
});

app.post("/", function (req, res) {
	const query = req.body.cityName;
	const apiKey = "21dd9194f85e74d4ef82f759b9dad56c";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;

	// Get data (when we want data from external resource)
	https.get(url, function (response) {
		response.on("data", function (data) {
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const weatherDescription = weatherData.weather[0].description;

			const icon = weatherData.weather[0].icon;
			const urlImage = "https://openweathermap.org/img/wn/" + icon + "@4x.png";

			res.write(
				`<h1>The temperature at ${query} is ${temp} degrees Celsius.</h1>`
			);
			res.write(`<p>The weather is currently ${weatherDescription}.</p>`);
			res.write(`<img src=${urlImage}>`);
			res.send();
		});
	});
});

app.listen(3000, function () {
	console.log("Server is running on port 3000");
});
