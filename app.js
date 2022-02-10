const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const city = req.body.cityName;
  const apiKey = '849992dd178238320e4234e397d12648';
  const unit = 'metric';
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=' + unit;

  https.get(url, (response) => {
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const iconUrl = 'https://openweathermap.org/img/wn/'+ weatherIcon + '@2x.png'
      res.write(`
        <p>The weather is currently ${weatherDesc}</p><h1>The temp in ${city} is ${temp}&#176; Celcius</h1>`);
      res.write("<img src=" + iconUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
