const express = require ("express");
const https = require ("https");
const bodyParser = require ("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (reqG, resG) {

    resG.sendFile(__dirname + "/index.html");

    app.post("/", function(reqP, resP) {

        const queryCityName = reqP.body.queryCityName;
        const apiKey = "9f284fbd61988d1f373a1a3912dedec1";
        const urlGeocoding = "https://api.openweathermap.org/geo/1.0/direct?q=" + queryCityName + "&appid=" + apiKey;

        https.get(urlGeocoding, function(geocodingRes) {
            geocodingRes.on("data", function (geocodingData) {
                const pGeocodingData = JSON.parse(geocodingData);
                const lat = pGeocodingData[0].lat;
                const lon = pGeocodingData[0].lon;

            const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";
            
            https.get(weatherUrl, function (weatherRes) {
                weatherRes.on("data", function (weatherData) {
                    const pWeatherData = JSON.parse(weatherData);
                    var cityName =pWeatherData.name;
                    var cityTemp = pWeatherData.main.temp;
                    var weatherDesc = pWeatherData.weather[0].description;
                    var weatherIcon = pWeatherData.weather[0].icon;
        
                    resP.write("<h1>The temperature in " + cityName + " is " + cityTemp + " degree Celsius.</h1>");
                    resP.write("<p>The weather condition is " + weatherDesc + ".</p>");
                    resP.write("<img src='https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png'>");
                    resP.send();
                })
            })
            })
        })
    })
})

app.listen(3000, function () {
    console.log("Server is live on port 3000")
})