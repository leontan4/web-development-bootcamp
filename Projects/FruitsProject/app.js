// const MongoClient = require("mongodb").MongoClient;
// const assert = require("assert");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const fruitSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please check your data entry, no name specified!"],
	},
	rating: {
		type: Number,
		min: 1,
		max: 10,
	},
	review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const apple = new Fruit({
	name: "Apple",
	rating: 8,
	review: "Pretty solid as a fruit.",
});

// apple.save();
// const orange = new Fruit({
// 	name: "orange",
// 	rating: 4,
// 	review: "Quite sour.",
// });

// const kiwi = new Fruit({
// 	name: "Kiwi",
// 	rating: 5,
// 	review: "Very green.",
// });

// const durian = new Fruit({
// 	name: "Durian",
// 	rating: 8,
// 	review: "King of fruits.",
// });

// Insert with mongoose
// Fruit.insertMany([orange, kiwi, durian], function (err) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(`Succesfully saved all the fruits to fruitsDB.`);
// 	}
// });

// Looping with forEach
Fruit.find(function (err, fruits) {
	if (err) {
		console.log(err);
	} else {
		console.log(fruits);
		// mongoose.connection.close();
		// fruits.forEach(function (fruit) {
		// 	console.log(fruit.name);
		// });
	}
});

//Update with mongoose
Fruit.updateOne({ name: "Apple" }), {};

// Connecting using MongoDB
// Connection URL
// const url = "mongodb://localhost:27017";

// // Database Name
// const dbName = "fruitsDB";

// // Create a new MongoClient
// const client = new MongoClient(url, { useUnifiedTopology: true });

// // Use connect method to connect to the Server
// client.connect(function (err) {
// 	assert.strictEqual(null, err);
// 	console.log("Connected successfully to server");

// 	const db = client.db(dbName);

// 	findCollections(db, function () {
// 		client.close();
// 	});
// });

// Insert collections using MongoDB
// const insertCollections = function (db, callback) {
// 	// Get the fruits collection
// 	const collection = db.collection("fruits");

// 	// Insert some fruits
// 	collection.insertMany(
// 		[
// 			{ name: "Apple", score: 8, review: "Great fruit" },
// 			{ name: "Orange", score: 6, review: "Kinda sour" },
// 			{ name: "Banana", score: 9, review: "Great stuff!" },
// 		],
// 		function (err, result) {
// 			assert.strictEqual(err, null);
// 			assert.strictEqual(3, result.result.n);
// 			assert.strictEqual(3, result.ops.length);
// 			console.log("Inserted 3 fruits into the collection");
// 			callback(result);
// 		}
// 	);
// };

// Find collections
// const findCollections = function (db, callback) {
// 	// Get the fruits collection
// 	const collection = db.collection("fruits");
// 	// Find some fruits
// 	collection.find({}).toArray(function (err, fruits) {
// 		assert.strictEqual(err, null);
// 		console.log("Found the following records");
// 		console.log(fruits);
// 		callback(fruits);
// 	});
// };
