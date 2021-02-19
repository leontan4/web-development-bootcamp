//jshint eversion:6

exports.getDate = function () {
	const today = new Date();

	// Creating object for date format ro trnasform later
	const options = {
		weekday: "long",
		day: "numeric",
		month: "long",
	};

	// Transforming the "options" object into "string"
	return today.toLocaleDateString("en-US", options);
};

exports.getDay = function () {
	const today = new Date();

	// Creating object for date format ro trnasform later
	const options = {
		weekday: "long",
	};

	// Transforming the "options" object into "string"
	return today.toLocaleDateString("en-US", options);
};
