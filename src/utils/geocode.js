const request = require("postman-request");
const geoCode = (address, callback) => {
	const url =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		encodeURIComponent(address) +
		".json?access_token=pk.eyJ1IjoicmVhbG9uYmViZXRvIiwiYSI6ImNrdjI1ZXhreDAwdGwzMHBodTN4cDJ5ZjYifQ.wyxZIm7JbpLC2b_Qz1iOXA&limit=1";

	request({ url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback("Unable to connect to location services!", undefined);
		} else if (body.features.length === 0) {
			callback(
				"Unable to match cordinates! Try out with a new search",
				undefined,
			);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geoCode;
