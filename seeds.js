var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment     = require("./models/comment");

var data = [
    { name: "Cloud's Rest", image: "https://images.unsplash.com/photo-1473713984581-b8918cc3652e?ixlib=rb-0.3.5&s=583eeb77d780cfc999af5545f9140b22&auto=format&fit=crop&w=1350&q=80", description: "Phasellizzle ghetto volutpat crackalackin. Ut hizzle adipiscing crunk. Donec shizznit est. Funky fresh sapizzle massa, ultricizzle nec, accumsizzle vel, fo quis, get down get down. Fo shizzle fizzle libero. Etizzle rutrum izzle ante. Maurizzle i saw beyonces tizzles and my pizzle went crizzle. Vestibulizzle izzle pede varius nibh dizzle commodo. Mofo ipsizzle dolor sit cool, consectetizzle adipiscing elit. Sed ac we gonna chung. Quisque mi pizzle, sodales izzle, gizzle a, eleifend a, elizzle." },
    { name: "Skystar", image: "https://images.unsplash.com/photo-1496425745709-5f9297566b46?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b084690f83c5e63fafd161f8bc729a1f&auto=format&fit=crop&w=1350&q=80", description: "Lorizzle ipsum dang mofo tellivizzle, doggy adipiscing elit. Nullam sapien things, crazy volutpizzle, suscipizzle boofron, break yo neck, yall vizzle, own yo'. Shit eget tortizzle. Things erizzle. Go to hizzle izzle dolizzle dapibus things break yo neck, yall break yo neck, yall. Maurizzle pizzle nibh et da bomb. Sure izzle tortor. Pellentesque eleifend rhoncus nisi. In bizzle crackalackin ghetto fo shizzle. Shit dapibizzle. Fo shizzle tellizzle shit, pretium mofo, phat izzle, eleifend vitae, nunc. Stuff sizzle. Integizzle sempizzle velit owned crazy." },
    { name: "old school", image: "https://images.unsplash.com/photo-1444228250525-3d441b642d12?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ed5183c1120981ce1110f12d31c82e17&auto=format&fit=crop&w=1350&q=80", description: "Morbi interdum. Suspendisse shizznit. Maecenas gangsta. Etizzle elizzle ante, ullamcorper quizzle, go to hizzle ut, scelerisque izzle, mammasay mammasa mamma oo sa. Morbi egizzle neque. Dizzle felizzle. Shizzlin dizzle nonummy, nisl vitae fringilla cursizzle, fo shizzle my nizzle mi dawg i saw beyonces tizzles and my pizzle went crizzle, sizzle laoreet izzle yo shizznit . Curabitizzle consequizzle nibh vizzle elizzle. Fusce bibendum dolizzle bow wow wow libero. Cras placerizzle, metizzle ass shizznit lacinia, lorizzle eros pharetra tortizzle, eu luctizzle risus est sed est." }
]

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function (err) {
        // if (err) {
        //     console.log(err);
        // }
        // // Add a few campgrounds
        // data.forEach(function (seed) {
        //     Campground.create(seed, function (err, campground) {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log("added campground");
        //             //Create a comment
        //             Comment.create(
        //                 {
        //                     text: "this place is great, but the wifi is slow",
        //                     author: "Naruto"
        //                 }, function (err, comment) {
        //                     if(err){
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment._id);
        //                         campground.save();
        //                         console.log("Created new comment");
        //                     }
                            
        //                 })
        //         }
        //     })
        // });
    });
}

module.exports = seedDB;