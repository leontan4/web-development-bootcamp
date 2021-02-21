const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`public`));

const listItems = [];
const workItems = [];

// Render front-end data
app.get("/", function (req, res) {
	const day = date.getDate();

	res.render("list", {
		listTitle: day,
		listItems: listItems,
	});
});

app.get("/work", function (req, res) {
	res.render("list", { listTitle: `Work List`, listItems: workItems });
});

app.get("/about", function (req, res) {
	res.render("about");
});

// Render back-end data
app.post("/", function (req, res) {
	const item = req.body.newItem;

	if (req.body.list === "Work List") {
		workItems.push(item);

		//Redirect to "GET"
		res.redirect("/work");
	} else {
		listItems.push(item);

		//Redirect to "GET"
		res.redirect("/");
	}
});

app.listen(3000, function () {
	console.log("Server started on port 3000.");
});
