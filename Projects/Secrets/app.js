require("dotenv").config();
const express = require ("express")
const bodyParser = require ("body-parser")
const ejs = require ("ejs")
const mongoose = require("mongoose")
const encrypt = require("mongoose-encryption")

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

const secret = process.env.SECRET

userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});

const secretUser = new mongoose.model("secretUser", userSchema)

app.get("/", function(req, res) {
	res.render("home")
});

app.get("/register", function(req, res) {
	res.render("register")
});

app.get("/login", function(req, res) {
	res.render("login")
});

app.post("/register", function (req, res) {
	const newUser = new secretUser({
		email: req.body.username,
		password: req.body.password
	})

	newUser.save(function(err) {
		if (!err) {
			res.render("secrets")
		} else {
			console.log(err)
		}
	})
});

app.post("/login", function(req, res) {
	secretUser.findOne(
		{username: req.body.username},
		function(err, foundUser) {
			if (err) {
				console.log(err)
			} else {
				if (foundUser.password == req.body.password) {
					res.render("secrets")
				} 
			}
		}
	)
})

app.get("/logout", function(req, res) {
	res.render("home")
});

app.listen(3000, function() {
	console.log("Server started on port 3000")
})