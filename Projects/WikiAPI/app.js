const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
	title: String,
	content: String,
};

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
	.get(function (req, res) {
		Article.find(function (err, foundArticles) {
			if (!err) {
				res.send(foundArticles);
			} else {
				res.send(err);
			}
	});
	})
	.post(function(req, res) {
		const newArticle = new Article ({
			title: req.body.title,
			content: req.body.content
		});
	
		newArticle.save(function(err) {
			if (!err) {
				res.send("Successfully added the new article")
			} else {
				res.send(err)
			}
		});
	})
	.delete(function(req, res) {
		Article.deleteMany(function(err) {
			if (!err) {
				res.send("Successfully deleted all the articles")
			} else {
				res.send(err)
			}
		});
	});

app.route("/articles/:title")
	.get(function (req, res) {
		Article.findOne({title: req.params.title}, function(err, foundArticle) {
			if (!err) {
				res.send(foundArticle)
			} else {
				res.send("Not found")
			}
		})
	})
	.put(function (req, res) {
		console.log(req.params.title)
		Article.updateOne(
			{title: req.params.title},
			{title: req.body.title, content: req.body.content},
			function(err) {
				if (!err) {
					res.send("Successfully updated the article")
				} else {
					res.send(err)
				}
			}
		)
	})
	.patch(function(req, res) {
		Article.updateOne(
			{title: req.params.title},
			{$set: req.body},
			function(err) {
				if (!err) {
					res.send("Successfully updated the article")
				} else {
					res.send(err)
				}
			}
		)
	})
	.delete(function(req, res) {
		Article.deleteOne(
			{title: req.params.title},
			function(err) {
			if (!err) {
				res.send("Successfully deleted the article")
			} else {
				res.send(err)
			}
		})
	});

app.listen(3000, function () {
	console.log("Server started on port 3000");
});
