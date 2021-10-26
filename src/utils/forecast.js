const request = require("postman-request");

const forecast = (lat, long, callback) => {
	const url =
		"http://api.weatherstack.com/current?access_key=552d35f127c3a796fd5cec7f79718062&query=" +
		encodeURIComponent(lat) +
		"," +
		encodeURIComponent(long);
	request({ url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback("Unable to connect to weather service!", undefined);
		} else if (body.error) {
			callback("Unable to find location");
		} else {
			callback(undefined, {
				desc: body.current.weather_descriptions[0],
				temp: body.current.temperature,
				ftemp: body.current.feelslike,
				ccover: body.current.cloudcover,
				rain: body.current.precip,
				humidity: body.current.humidity,
				swind: body.current.wind_speed,
			});
		}
	});
};

module.exports = forecast;
