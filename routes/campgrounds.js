var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");

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

// INDEX ROUTE - SHOW ALL CAMPGROUNDS
router.get("/", function(req, res) {
  // get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log("error");
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});
// CREATE - ADD NEW CAMPGROUND TO DB
router.post("/", isLoggedIn, function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {
    name: name,
    image: image,
    description: description,
    author: author
  };
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log("error");
    } else {
      console.log(newlyCreated);
      res.redirect("/campgrounds");
    }
  });
});
// NEW - SHOW FORM TO CREATE A NEW CAMPGROUND
router.get("/new", isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});
// SHOW - SHOWS MORE INFO ABOUT ONE CAMPGROUND
router.get("/:id", function(req, res) {
  // FIND THE campground WITH PROVIDED ID
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground) {
      if (err) {
        console.log("error");
      } else {
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

// EDIT CAMPGROUND

router.get("/:id/edit", function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.render("campgrounds/edit", { campground: foundCampground });
    }
  });
});

// UPDATE CAMPGROUND

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
