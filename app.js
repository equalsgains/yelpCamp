var express = require("express");
var app = express();
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Salmon Creek", img: "https://farm6.staticflickr.com/5187/5623797406_ea91016ac3.jpg"},
        {name: "Granite Hill", img: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg"},
        {name: "Mountain Goat's Rest", img: "https://farm3.staticflickr.com/2562/3753652224_7ab88a28df.jpg"}
        
    ]

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(3000, function () {
    console.log("server's running!")
});