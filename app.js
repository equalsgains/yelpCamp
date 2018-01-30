var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelpcamp", {
  useMongoClient: true
});
mongoose.connection.once("open", () => {
  console.log("connected to MongoDB at port 27017");
});

// SCHEMA SET UP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Mountain Goat's Rest",
//     image: "https://farm3.staticflickr.com/2562/3753652224_7ab88a28df.jpg",
//     description: "Beautiful campgrounds. more more more more"
//   },
//   function(err, campground) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Newly Created Camp");
//       console.log(campground);
//     }
//   }
// );

// var campgrounds = [
//   {
//     name: "Salmon Creek",
//     img: "https://farm6.staticflickr.com/5187/5623797406_ea91016ac3.jpg"
//   },
//   {
//     name: "Granite Hill",
//     img: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg"
//   },
//   {
//     name: "Mountain Goat's Rest",
//     img: "https://farm3.staticflickr.com/2562/3753652224_7ab88a28df.jpg"
//   },
//   {
//     name: "Salmon Creek",
//     img: "https://farm6.staticflickr.com/5187/5623797406_ea91016ac3.jpg"
//   },
//   {
//     name: "Granite Hill",
//     img: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg"
//   },
//   {
//     name: "Mountain Goat's Rest",
//     img: "https://farm3.staticflickr.com/2562/3753652224_7ab88a28df.jpg"
//   },
//   {
//     name: "Salmon Creek",
//     img: "https://farm6.staticflickr.com/5187/5623797406_ea91016ac3.jpg"
//   },
//   {
//     name: "Granite Hill",
//     img: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg"
//   },
//   {
//     name: "Mountain Goat's Rest",
//     img: "https://farm3.staticflickr.com/2562/3753652224_7ab88a28df.jpg"
//   }
// ];

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});
// INDEX ROUTE - SHOW ALL CAMPGROUNDS
app.get("/campgrounds", function(req, res) {
  // get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log("error");
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});
// CREATE - ADD NEW CAMPGROUND TO DB
app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log("error");
    } else {
      res.redirect("/campgrounds");
    }
  });
});
// NEW - SHOW FORM TO CREATE A NEW CAMPGROUND
app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});
// SHOW - SHOWS MORE INFO ABOUT ONE CAMPGROUND
app.get("/campgrounds/:id", function(req, res){
    // FIND THE campground WITH PROVIDED ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log("error");
        }   else {
            res.render("show", {campground: foundCampground});
        }
    });

});

app.listen(3000, function() {
  console.log("server's running!");
});
