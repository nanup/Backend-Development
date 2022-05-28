const express = require ("express");
const bodyParser = require ("body-parser");

const app = express();

let todate = new Date();
let dateOptions = {
    weekday: "long",
    month: "long",
    day: "numeric"
}
let date = todate.toLocaleDateString("en-US", dateOptions);

let entryItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("list", {date: date, entryItems: entryItems})
})

app.post("/", function(req, res) {
    let newEntryItem = req.body.newEntry;

    entryItems.push(newEntryItem);

    res.redirect("/");
})

app.listen(3000, function () {
    console.log("Server is live on port 3000");
})