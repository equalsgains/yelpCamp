var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
    {name: "Salmon Creek", img: "https://farm6.staticflickr.com/5187/5623797406_ea91016ac3.jpg"},
    {name: "Granite Hill", img: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg"},
    {name: "Mountain Goat's Rest", img: "https://farm3.staticflickr.com/2562/3753652224_7ab88a28df.jpg"},
    {name: "Salmon Creek", img: "https://farm6.staticflickr.com/5187/5623797406_ea91016ac3.jpg"},
    {name: "Granite Hill", img: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg"},
    {name: "Mountain Goat's Rest", img: "https://farm3.staticflickr.com/2562/3753652224_7ab88a28df.jpg"},
    {name: "Salmon Creek", img: "https://farm6.staticflickr.com/5187/5623797406_ea91016ac3.jpg"},
    {name: "Granite Hill", img: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg"},
    {name: "Mountain Goat's Rest", img: "https://farm3.staticflickr.com/2562/3753652224_7ab88a28df.jpg"}    
]

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, img: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(3000, function () {
    console.log("server's running!")
});