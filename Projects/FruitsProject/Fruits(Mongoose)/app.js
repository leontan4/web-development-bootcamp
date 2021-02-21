// Connecting using Mongoose
const mongoose = require("mongoose");

// Will create if database do not exist (else will just access database)
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Creating Fruit schema (Data types of information inserted)
// Also creating collection
const fruitSchema = new mongoose.Schema({
	name: {
		type: String, // Built-in validators
		required: [true, "Please check your data entry, no name specified!"],
	},
	rating: {
		type: Number,
		min: [1, "Sorry, lowest rating is 1"],
		max: [10, "Max is 10"],
	},
	review: String,
});

// Create mongoose model
// Need to be careful here, will add 'S' behind the model
// (eg: Fruit will become Fruits)
const Fruit = mongoose.model("Fruit", fruitSchema);

// Creating People schema (people collection)
const peopleSchema = new mongoose.Schema({
	name: String,
	age: Number,
	favoriteFruit: fruitSchema, //establishing connections between schema (collections)
});

// 'Person' becomes 'People'
const Person = mongoose.model("Person", peopleSchema);

// Creating fruits data
const apple = new Fruit({
	name: "Apple",
	rating: 8,
	review: "Pretty solid as a fruit",
});

const kiwi = new Fruit({
	name: "Kiwi",
	rating: 10,
	review: "The best fruit!",
});

const orange = new Fruit({
	name: "Orange",
	rating: 4,
	review: "Too sour for me",
});

const banana = new Fruit({
	name: "Banana",
	rating: 10,
	review: "Another good fruit!",
});

const peach = new Fruit({
	rating: 1,
	review: "Peaches are worse",
});

const pineapple = new Fruit({
	name: "Pineapple",
	rating: 7,
	review: "Better compare to orange",
});

// Creating person data
const leon = new Person({
	name: "Cindy",
	age: 25,
	favoriteFruit: pineapple,
});

const cindy = new Person({
	name: "Cindy",
	age: 25,
	favoriteFruit: pineapple,
});

// Insert MANY fruits data
// Fruit.insertMany([kiwi, orange, banana], function (err) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log("Successfully saved all the fruits to fruitsDB");
// 	}
// });

// Find fruits data
// Fruit.find(function (err, fruits) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		mongoose.connection.close(); // Will close after looping the function below

// 		// Looping through each object to get name of fruits
// 		fruits.forEach(function (fruit) {
// 			console.log(fruit.name);
// 		});
// 	}
// });

// Updating data
// Fruit.updateOne(
// 	{ _id: "60316ffefa578c47ac86c6f6" },
// 	{ name: "Peach" },
// 	function (err) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log("Succesfully updated the database!");
// 		}
// 	}
// );

// Update by establishing relationship with Fruit schema
Person.updateOne({ name: "Leon" }, { favoriteFruit: banana }, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Succesfully updated the database!");
	}
});

// Delete data
// Fruit.deleteOne({ name: "Peach" }, function (err) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log("Succesfully deleted data!");
// 	}
// });
