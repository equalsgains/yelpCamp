var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment     = require("./models/comment");

var data = [
    { name: "Cloud's Rest", image: "https://images.unsplash.com/photo-1473713984581-b8918cc3652e?ixlib=rb-0.3.5&s=583eeb77d780cfc999af5545f9140b22&auto=format&fit=crop&w=1350&q=80", description: "stuff stuff stuff" },
    { name: "Skystar", image: "https://images.unsplash.com/photo-1496425745709-5f9297566b46?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b084690f83c5e63fafd161f8bc729a1f&auto=format&fit=crop&w=1350&q=80", description: "stuff stuff stuff" },
    { name: "old school", image: "https://images.unsplash.com/photo-1444228250525-3d441b642d12?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ed5183c1120981ce1110f12d31c82e17&auto=format&fit=crop&w=1350&q=80", description: "stuff stuff stuff" }
]

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        // Add a few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added campground");
                    //Create a comment
                    Comment.create(
                        {
                            text: "this place is great, but the wifi is slow",
                            author: "Naruto"
                        }, function (err, comment) {
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                            
                        })
                }
            })
        });
    });
}

module.exports = seedDB;