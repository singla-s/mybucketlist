const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true});
//Include body parser to read requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
// Use EJS
app.set('view engine', 'ejs');

//////////////////////////Main////////////////////////////////////
const Wish = mongoose.model('wish',{
                    name: String
                })


app.get("/", function(req, res) {
    res.render("bucket-list",{dayName : "Today", wishList : wishList});
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
