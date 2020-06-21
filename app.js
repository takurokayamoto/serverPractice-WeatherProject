const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname+"/index.html")
});

app.post("/", function (req, res) { 
    const query = req.body.cityName;
    const apiKey = "e8c052c7fbfebc902afc4d3186589b8f";
    const unit = "metric";
    const sampleAPI = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&units="+ unit +"&appid="+ apiKey;
    https.get(sampleAPI, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon
            const iconURL = "https://openweathermap.org/img/wn/"+ weatherIcon +"@2x.png"

            res.write("<h1>Weather Info</h1>");
            res.write("<h3>The weather is " + weatherDescription + ". </h3>");
            res.write("<h3>The temperature in " + query + " is " + temp + " degrees Celcius.</h3>");
            res.write("<img src=" + iconURL + ">");

            res.send();
         });
    });
 })

app.listen(3000, function () {
    console.log("server 3000 is now running");
});


