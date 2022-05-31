const express = require ("express");
const bodyParser = require ("body-parser");
const ejs = require ("ejs");
const _ = require ("lodash");

const homeStartContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const app = express();

let posts = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function (req, res){
    res.render("home", {homeStartContent: homeStartContent, posts: posts});
})

app.get("/about", function (req, res) {
    res.render("about", {aboutContent: aboutContent});
})

app.get("/contact", function (req, res) {
    res.render("contact", {contactContent: contactContent});
})

app.get("/compose", function (req, res) {
    res.render("compose");
})

app.post("/compose", function(req, res) {
    var post = {
        title: req.body.title, 
        content: req.body.content,
        readMore: "/posts/" + _.replace(_.trim(_.lowerCase(req.body.title)), " ", "-")
    }

    console.log(_.trim(_.lowerCase(req.body.title)));

    posts.push(post);

    res.redirect("/")
})

app.get("/posts/:title", function(req, res) {
    const reqTitle = req.params.title;

    posts.forEach(function(post) {
        const storedTitle = post.title;
        const storedContent = post.content;

        if (_.lowerCase(reqTitle) == _.lowerCase(storedTitle)) {
            res.render("post" , {title: storedTitle, content: storedContent})
        }
    })
})

app.listen(3000, function() {
    console.log("Server is live on port 3000");
})