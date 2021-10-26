const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Defined paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Bebeto Nyamwamu",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Bebeto Nyamwamu",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help You",
		name: "Bebeto Nyamwamu",
		message: "Welcome, How may I help you",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "Empty!: Provide a proper address",
		});
	}
	geoCode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error });
			}
			forecast(latitude, longitude, (error, { desc, temp, ftemp } = {}) => {
				if (error) {
					return res.send({ error });
				}
				res.send({
					location,
					forecast:
						"It is " +
						desc +
						" and feels like " +
						ftemp +
						" degrees but actually " +
						temp +
						" degrees hot",
				});
			});
		},
	);
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term",
		});
	}

	console.log(req.query.search);
	res.send({
		products: [],
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "Error Article",
		error: "Help Article Not Found",
		name: "Bebeto Nyamwamu",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "Error Page",
		error: "Page Not Found",
		name: "Bebeto Nyamwamu",
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
