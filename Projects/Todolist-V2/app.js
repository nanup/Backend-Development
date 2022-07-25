const express = require ("express");
const bodyParser = require ("body-parser");
const mongoose = require ("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/todolistdb")

let itemSchema = new mongoose.Schema ({
    name: String
})

let Item = mongoose.model("Item", itemSchema);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    Item.find(function(err, items) {
        if(err) {
            console.log(err);
        } else {
            todayItemsArray = items;
        }
    });

    res.render("list", {listTitle: "Today", entryItems: todayItemsArray});
});

app.post("/", function(req, res) {
    let newEntryItem = new Item({
        name: req.body.newEntry
    });

    newEntryItem.save( function() {
        res.redirect("/");
    });
});

app.post("/delete", function(req, res){
    let oldEntryItem = req.body.oldEntry;

    Item.deleteOne ({_id: oldEntryItem}, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    })
});

app.get("/:title", function(req, res){
    res.render("list", {listTitle: req.params.title, entryItems: req.params + "ItemsArray"});
})

app.post("/:params", function(req, res) {
    let newEntryItem = new Item({
        name: req.body.newEntry
    });

    newEntryItem.save(function() {
        res.redirect("/");
    });
});

app.listen(3000, function () {
    console.log("Server is live on port 3000");
});