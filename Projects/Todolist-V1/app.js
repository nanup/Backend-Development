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

let dateEntryItems = [];
let workEntryItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("list", {listTitle: date, entryItems: dateEntryItems})
})

app.post("/", function(req, res) {
    let newEntryItem = req.body.newEntry;

    if (req.body.button == "Work List") {
        workEntryItems.push(newEntryItem);

        res.redirect("/work");
    } else {
        dateEntryItems.push(newEntryItem);

        res.redirect("/");
    }
})

app.get("/work", function (req, res) {
    res.render("list", {listTitle: "Work List", entryItems: workEntryItems})
})

app.get("/about", function(req, res) {
    res.render("about");
})

app.listen(3000, function () {
    console.log("Server is live on port 3000");
})