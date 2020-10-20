var express = require("express");
var app = express();

var bodyParser = require("body-parser");

//Include body parser to read requests
app.use(bodyParser.urlencoded({extended: true}));

// Use EJS
app.set('view engine', 'ejs');
//load stactic files
// app.use(express.static(__dirname + "style"));
// app.use(express.static(__dirname + "image"));
//////////////////////////Main////////////////////////////////////



app.get("/", function(req, res) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var date = new Date();
    var dateToday = date.toLocaleDateString('en-IN', options);
    res.render("bucket-list",{dayName : dateToday});
});


// Enable Port
app.listen(3000, function() {
    console.log("Server listening on port 3000");
});
