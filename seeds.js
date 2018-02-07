var mongoose = require("mongoose"),
    Campground = require("./models/campground");


Campground.remove({}, function(err){
    if (err){
        console.log(err);
    }
});