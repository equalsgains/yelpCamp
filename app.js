var express   = require("express"),
  app         = express(),
  bodyParser  = require("body-parser"),
  mongoose    = require("mongoose"),
  Campground  = require('./models/campground'),
  seedDB      = require("./seeds");

seedDB();

mongoose.connect("mongodb://localhost:27017/yelpcamp", {
  useMongoClient: true
});
mongoose.connection.once("open", () => {
  console.log("connected to MongoDB at port 27017");
});




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
  var description = req.body.description;
  var newCampground = { name: name, image: image, description: description };
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
