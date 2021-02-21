const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`public`));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const itemsSchema = new mongoose.Schema({
	name: String,
});

const Item = mongoose.model("Item", itemsSchema);

const database = new Item({
	name: "Database",
});

const leetcode = new Item({
	name: "Leetcode",
});

const react = new Item({
	name: "React",
});

const defaultList = [database, leetcode, react];

const listSchema = {
	name: String,
	items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

// Render front-end data
app.get("/", function (req, res) {
	Item.find(function (err, items) {
		if (items.length <= 0) {
			Item.insertMany([database, leetcode, react], function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("Successfully added item list!");
				}
			});

			// redirect again if list is not empty (Something like recursion)
			res.redirect("/");
		} else {
			res.render("list", {
				listTitle: "Today",
				listItems: items,
			});
		}
	});
});

// Creating custom route and create list for custom route
app.get("/:customListName", function (req, res) {
	const customListName = req.params.customListName;

	// This returns an object that's why "findOne" was used
	// Not the same as the code above, as that one returns an array
	List.findOne({ name: customListName }, function (err, foundList) {
		if (!err) {
			if (!foundList) {
				// Create a new list
				const list = new List({
					name: customListName,
					items: defaultList,
				});
				list.save();
				res.redirect(`/${customListName}`);
			} else {
				// Show an existing list
				res.render("list", {
					listTitle: customListName,
					listItems: foundList.items,
				});
			}
		}
	});
});

app.get("/about", function (req, res) {
	res.render("about");
});

// Render back-end data
app.post("/", function (req, res) {
	// Get value from button in "list.ejs"
	const listName = req.body.list;

	const addItem = new Item({
		name: req.body.newItem,
	});

	if (listName === "Today") {
		addItem.save();

		//Redirect to "GET"
		res.redirect("/");
	} else {
		List.findOne({ name: listName }, function (err, foundList) {
			foundList.items.push(item);
			foundList.save();
			res.redirect(`/${listName}`);
		});
	}
});

app.post("/delete", function (req, res) {
	const deleteItem = req.body.checkbox;
	const listName = req.body.listName;

	Item.deleteOne({ _id: deleteItem }, function (err) {
		res.redirect("/");
	});
});

app.listen(3000, function () {
	console.log("Server started on port 3000.");
});
