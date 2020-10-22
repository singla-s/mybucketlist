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
const wish1 = new Wish({name: "Deep sea diving"});
const wish2 = new Wish({name: "sky diving"});
const wish3 = new Wish({name: "Travel through Europe"});
// Wish.insertMany([wish1,wish2,wish3], function(err) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("All wishes created!");
//     }
// });

app.get("/", function(req, res) {
    const wishList = [];
    Wish.find({},{_id:1, name:1},function(err, wishes) {
        if(err){
            console.log(err);
        } else {
            // wishList
        }
    });

    res.render("bucket-list",{dayName : "Today", wishList : []});
});

app.post("/", function(req, res) {
    const wish = req.body.wish;
    wishList.push(wish);
    console.log(wishList);
    console.log(req.body);
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
