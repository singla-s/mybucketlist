const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true},{ useUnifiedTopology: true });
//Include body parser to read requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
// Use EJS
app.set('view engine', 'ejs');

//////////////////////////Main////////////////////////////////////
const Wish = mongoose.model('wish',{
                    name: String
                })

// Wish.insertMany([wish1,wish2,wish3], function(err) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("All wishes created!");
//     }
// });

app.get("/", function(req, res) {
    Wish.find({},{_id:1, name:1},function(err, wishes) {
        if(err){
            console.log(err);
        } else {
            res.render("bucket-list",{dayName : "Today", wishList : wishes});
        }
    });
});

app.post("/", function(req, res) {
    const wish = req.body.wish;
    const wishObject = new Wish({name: wish});
    wishObject.save(function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("New wish added!");
        }
    });
    res.redirect("/");
});


//About
app.get("/about",function(req, res) {
    res.render("about");
});

// Enable Port
app.listen(3000, function() {
    console.log("Server listening on port 3000");
});
