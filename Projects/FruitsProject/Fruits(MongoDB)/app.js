// Connecting using MongoDB
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "fruitsDB";

// Create a new MongoClient
const client = new MongoClient(url, {
	// useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Use connect method to connect to the Server
client.connect(function (err) {
	assert.strictEqual(null, err);
	console.log("Connected successfully to server");

	const db = client.db(dbName);

	// Close after inserting fruits
	// insertFruits(db, function () {
	// 	client.close();
	// });

	// Find collections of fruits and close
	findFruits(db, function () {
		client.close();
	});
});

// Insert Fruits Data
const insertFruits = function (db, callback) {
	// Get the Fruits Data collection
	const collection = db.collection("fruits");

	// Insert some Fruits Data
	collection.insertMany(
		[
			{ name: "Apple", score: 8, review: "Great fruit" },
			{ name: "Orange", score: 6, review: "Kinda sour" },
			{ name: "Banana", score: 9, review: "Great stuff!" },
		],
		function (err, result) {
			assert.strictEqual(err, null); // Making sure no errors

			// Number of results to enter (increment number if more)
			assert.strictEqual(3, result.result.n);
			assert.strictEqual(3, result.ops.length);
			console.log("Inserted 3 documents into the collection");
			callback(result);
		}
	);
};

// Find all the Fruits Data
const findFruits = function (db, callback) {
	// Get the Fruits collection
	const collection = db.collection("fruits");

	// Find some Fruits
	collection.find({}).toArray(function (err, fruits) {
		assert.strictEqual(err, null);
		console.log("Found the following records");
		console.log(fruits);
		callback(fruits);
	});
};
