const md5 = require("md5");
const express = require ("express");
const bodyParser = require ("body-parser");
const ejs = require ("ejs");
const mongoose = require("mongoose");


const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express()

app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({
	extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB")

const userSchema = new mongoose.Schema({
	email: String,
	password: String
});

const secretUser = new mongoose.model("secretUser", userSchema)

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/register", function(req, res) {
	res.render("register");
});

app.get("/login", function(req, res) {
	res.render("login");
});

app.post("/register", function (req, res) {
	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
		if (!err) {
			password = hash
		} else {
			console.log(err);
		};

		const newUser = new secretUser({
			email: req.body.username,
			password: password
			});
	
		newUser.save(function(err) {
			if (!err) {
				res.render("secrets")
			} else {
				console.log(err)
			}
		});
	});

	
});

app.post("/login", function(req, res) {
	secretUser.findOne(
		{username: req.body.username},
		function(err, foundUser) {
			if (err) {
				console.log(err)
			} else {
				const hash = foundUser.password
				bcrypt.compare(req.body.password, hash, function(err, result) {
					if (!err) {
						res.render("secrets")
					} else {
						console.log(err)
					}
				})
			}
		}
	);
});

app.get("/logout", function(req, res) {
	res.render("home");
});

app.listen(3000, function() {
	console.log("Server started on port 3000");
});