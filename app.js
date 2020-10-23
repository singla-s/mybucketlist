const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true, useUnifiedTopology: true });
//Include body parser to read requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
// Use EJS
app.set('view engine', 'ejs');

//////////////////////////Main////////////////////////////////////
const wishSchema = {
                    name: String
                };
const Wish = mongoose.model('wish',wishSchema);
const List = mongoose.model("list", {
                    name: String,
                    wishes: [wishSchema]
});
// Wish.insertMany([wish1,wish2,wish3], function(err) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("All wishes created!");
//     }
// });

app.get("/", function(req, res) {
    const customListName = req.params.customListName;
    Wish.find({},{_id:1, name:1},function(err, wishes) {
        if(err){
            console.log(err);
        } else {
            res.render("bucket-list",{listName : "Today", wishList : wishes});
        }
    });
});

app.post("/", function(req, res) {
    const customListName = req.body.button;
    const wishObject = new Wish({name: req.body.wish});
    if(customListName === "Today") {
        wishObject.save();
        res.redirect("/");
    } else {
        List.findOne({name: customListName}, function(err, wishList) {
        wishList.wishes.push(wishObject);
        wishList.save();
        res.redirect("/" + customListName);
    });
    }
});

app.get("/:customListName", function(req, res) {
    const customListName = req.params.customListName;
    List.findOne({name: customListName},{_id: 0, wishes: 1},function(err, wishLists) {
        if(err){
            console.log(err);
        } else {
            if(wishLists == null) {
                wishLists = [];
                const list = new List({name: customListName, wishes: []});
                list.save();
            }
            res.render("bucket-list",{listName : customListName, wishList : wishLists.wishes});
        }
    });
});

app.post("/delete/:id/:listName", function(req, res) {
    const listName = req.params.listName;
    const deleteWish = req.params.id;
    if(listName === "Today") {
        Wish.deleteOne({_id: deleteWish},function(err) {
            res.redirect("/");
        });
    } else {
        const list = List.findOne({name: listName}, function(err, wishes) {
            wishes["wishes"].forEach(function(wish,index) {
                if(deleteWish == wish["_id"]) {
                    wishes.wishes.splice(index, 1);
                    wishes.save();
                    res.redirect("/" + listName);
                }
            });
        });
    }
});

//About
app.get("/about",function(req, res) {
    res.render("about");
});

// Enable Port
app.listen(3000, function() {
    console.log("Server listening on port 3000");
});
