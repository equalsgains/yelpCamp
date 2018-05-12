var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");


mongoose.connect("mongodb://localhost:27017/yelpcamp");
mongoose.connection.once("open", () => {
  console.log("connected to MongoDB at port 27017");
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();
// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Once again Rusty wins cutest dog!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
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
  res.render("campgrounds/new");
});
// SHOW - SHOWS MORE INFO ABOUT ONE CAMPGROUND
app.get("/campgrounds/:id", function(req, res){
    // FIND THE campground WITH PROVIDED ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err) {
            console.log("error");
        }   else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });

});

//=============
// comments routes
//================

app.get("/campgrounds/:id/comments/new", function(req, res){
  // find campground by id
    Campground.findById(req.params.id, function(err, campground){
      if(err){
        console.log(err);
      } else {
        res.render("comments/new", {campground: campground});
      }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
  // look up campground using id
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if (err){
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
      
    }
  });
  // create new comment
  // connect new comment to campground
  // redirect to campground show page
});


// Auth routes
// show register form
app.get("/register", function(req, res){
  res.render("register");
});

// handle sign up option
app.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req,res, function(){
      res.redirect("/campgrounds");
    });
  });
});

// show login form
app.get("/login", function(req, res){
  res.render("login");
});
// handle login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

app.listen(3000, function() {
  console.log("server's running!");
});
