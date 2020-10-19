var express = require("express");
var app = express();

var bodyParser = require("body-parser");

//Include body parser to read requests
app.use(bodyParser.urlencoded({extended: true}));

//load stactic files
app.use(express.static(__dirname));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});


// Enable Port
app.listen(process.env.PORT || 3000, function() {
    console.log("Server listening on port 3000");
});
