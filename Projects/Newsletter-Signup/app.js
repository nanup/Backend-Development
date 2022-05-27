const bodyParser = require ("body-parser");

const express = require ("express");

const request = require ("request");

const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (reqG, resG) {
    resG.sendFile(__dirname + "/signup.html");
})

app.post("/", function (reqP, resP) {
    
    const firstName = reqP.body.firstName;
    const lastName = reqP.body.lastName;
    const email = reqP.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fileds: {
                    FNAME: firstName,
                    LNAME: lastName
                }
                
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/04fc0e73d8/";

    const options = {
        method: "POST",
        auth: "user:bc54b616ad2b342c35fe04cceb6777ad-us17"
    };

    const request = https.request(url, options, function (response) {
        response.on("data", function(payload) {
            console.log(JSON.parse(payload));
        })
    })

    if (request.statusCode == 200) {
        resP.sendFile(__dirname + "/success.html");
    } else {
        resP.sendFile(__dirname + "/failure.html");
    }

    request.write(jsonData);
    request.end();
})

app.post("/failure", function (req, res) {
    res.redirect("/");
})

app.listen(3000, function () {
    console.log("Server is running on port 3000"); 
})

// API Key
// bc54b616ad2b342c35fe04cceb6777ad-us17

// Segment Name
// Newsletter-Signup

// List ID
// 04fc0e73d8

// Segment ID
// 6333161