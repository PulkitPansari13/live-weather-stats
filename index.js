const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const appid = "YourAppID";
let loc = 'mumbai';

app.get('/', function(req,res){
    let d = new Date();
    let date = d.toLocaleDateString();
    const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" + loc + '&APPID=' + appid;
    https.get(url,function (response) {
        if(response.statusCode >= 200 && response.statusCode <300){
        response.on('data', function (data) {
            const weather = JSON.parse(data);
            const temp = weather.main.temp;
            const icon = weather.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            const description = weather.weather[0].description;
            const humidity = weather.main.humidity;
            const visibility = weather.visibility;
            const windspeed = weather.wind.speed;
            const pressure = weather.main.pressure;

            const context = {temp,imgurl,description,humidity,visibility,windspeed,pressure,date,loc};
            res.render('main.ejs',context);

        })
    }
    else{
        const temp = 'N.A';
        const description = 'N.A';
        const humidity = 'N.A';
        const visibility = 'N.A';
        const pressure = 'N.A';
        const windspeed = 'N.A';
        const imgurl = "http://openweathermap.org/img/wn/50d@2x.png";
        const context = {temp,imgurl,description,humidity,visibility,windspeed,pressure,date,loc};
            res.render('main.ejs',context);
    }
    })
})

app.post('/',function(req,res){
    loc = req.body.loc.toLowerCase();
    let d = new Date();
    let date = d.toLocaleDateString();
    const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" + loc + '&APPID=' + appid;
    https.get(url,function (response) {
        if(response.statusCode >= 200 && response.statusCode <300){
        //todo: parse data only when status code is in 200s
        response.on('data', function (data) {
            const weather = JSON.parse(data);
            const temp = weather.main.temp;
            const icon = weather.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            const description = weather.weather[0].description;
            const humidity = weather.main.humidity;
            const visibility = weather.visibility;
            const windspeed = weather.wind.speed;
            const pressure = weather.main.pressure;

            const context = {temp,imgurl,description,humidity,visibility,windspeed,pressure,date,loc};
            res.render('main.ejs',context);
        })
    }
    else{
        const temp = 'N.A';
        const description = 'N.A';
        const humidity = 'N.A';
        const visibility = 'N.A';
        const pressure = 'N.A';
        const windspeed = 'N.A';
        const imgurl = "http://openweathermap.org/img/wn/50d@2x.png";
        const context = {temp,imgurl,description,humidity,visibility,windspeed,pressure,date,loc};
            res.render('main.ejs',context);
    }
    })

})

app.listen(process.env.PORT || port, function() {
  console.log("Server started on port 3000");
});
