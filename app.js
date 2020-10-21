var express = require("express");
var app = express();
const path = require("path");
const date = require(path.join(__dirname, "date.js"));

var bodyParser = require("body-parser");

//Include body parser to read requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
// Use EJS
app.set('view engine', 'ejs');

//load stactic files
// app.use(express.static(__dirname + "style"));
// app.use(express.static(__dirname + "image"));
//////////////////////////Main////////////////////////////////////
var wishList = ["Learn horse riding", "Sky diving", "Travel through Europe"];


app.get("/", function(req, res) {
    const dateToday = date.getDate();
    res.render("bucket-list",{dayName : dateToday, wishList : wishList});
});

app.post("/", function(req, res) {
    var wish = req.body.wish;
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
