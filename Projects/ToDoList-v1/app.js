const express = require("express");
const bodyParser = require("body-parser");
const date = require(`${__dirname}/date.js`);
const mongoose = require("mongoose");

const app = express();

// using "ejs" as engine
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// CSS folders (public)
app.use(express.static("public"));

// Setup Mongoose Database
mongoose.connect("mongodb://localhost:27017/todolistDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Setting up properties (part of mongoose)
const itemSchema = {
	name: String,
};

// Will be singular first, the plural when create (part of mongoose)
const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
	name: "Welcome to your todolist!",
});

const item2 = new Item({
	name: "Hit the + button to add a new item.",
});

const item3 = new Item({
	name: "<-- Hit this to delete an item.",
});

const defaultItems = [item1, item2, item3];

const listSchema = {
	name: String,
	items: [itemSchema],
};

const List = mongoose.model("List", listSchema);

// Adding items into ToDoList
app.get("/", function (req, res) {
	// data to be entered in the "input" field in "list.ejs"
	// const day = date.getDate();

	Item.find(function (err, foundItems) {
		if (foundItems.length === 0) {
			// Insert item into database
			Item.insertMany(defaultItems, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("Successfully added items.");
				}
			});
			res.redirect("/");
		} else {
			// Use to render "list" which is the "ejs" file as first argument
			// Second argument is the object (which is in the ejs file)
			res.render("list", { listTitle: "Today", newListItems: foundItems });
		}
	});
});

app.get("/:customListName", function (req, res) {
	const customListName = req.params.customListName;

	List.findOne({ name: customListName }, function (err, foundList) {
		if (!err) {
			if (!foundList) {
				// Create new list
				const list = new List({
					name: customListName,
					items: defaultItems,
				});
				list.save();
				res.redirect(`/${customerListName}`);
			} else {
				// Show an existing list
				res.render("list", {
					listTitle: foundList.name,
					newListItems: foundList.items,
				});
			}
		}
	});
});

app.post("/", function (req, res) {
	// "post" always will need to use "body-parser"
	const itemName = req.body.newItem;
	const listName = req.body.list;

	const item = new Item({
		name: itemName,
	});

	if (listName === "Today") {
		item.save();
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
	const checkedItemId = req.body.checkbox;

	Item.findByIdAndRemove({ _id: checkedItemId }, function (err) {
		if (!err) {
			console.log("Successfully deleted checked item!");
			res.redirect("/");
		}
	});
});

app.listen(3000, function () {
	console.log("Server is running on port 3000...");
});
