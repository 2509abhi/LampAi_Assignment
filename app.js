const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();

let id=5
let list = [
    {
        Id: "1",
        Name: "bunash",
        Year: "3",
        Description: "Make A Game which Make money By Playing",
        Rating: "0",
        Feedback: "NAN"
    },
    {
        Id: "2",
        Name: "Kamlesh",
        Year: "2",
        Description: "Make A Track which Make money By Tracking",
        Rating: "0",
        Feedback: "NAN"

    },
    {
        Id: "3",
        Name: "Doni",
        Year: "3",
        Description: "Make A Game which Make money By Playing",
        Rating: "1",
        Feedback: "Good Idea But Already exist."
    },
    {
        Id: "4",
        Name: "Rani",
        Year: "2",
        Description: "Make A Track which Make money By Tracking",
        Rating: "4",
        Feedback: "Can Get success if try from Good resources."

    }
]

// //MongoDb Schema
// mongoose.connect('mongodb://127.0.0.1:27017/lampaiDB',{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }).then(() => console.log("connected")).catch((error) => console.log(error));

// const lists = new mongoose.Schema({
//     Id: Number,
//     Name: String,
//     Year: Number,
//     Description: String,
//     Rating: Number,
//     Feedback: String
//   });
// const List = mongoose.model("List", lists);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000);

app.get("/", function(req,res){
    res.render("index");
});
app.get("/:name", function (req, res) {
    const n = _.lowerCase(req.params.name);
    if(n == "student" || n == "peer"){
        res.render(n, {item: list })
    }
    else if(n[0] == 'd'){
        delete list[parseInt(req.params.name.slice(3))-1];
        res.redirect("/student");
    }
    else if(n[0] == 1 || n[0] == 2 || n[0] == 3 || n[0] == 4 || n[0] == 5 || n[0] == 6 || n[0] == 7 || n[0] == 8 || n[0] == 9){
        res.render("check", {item: list[n-1] })
    }
    else if(n[0] == "g"){
        res.render("give", {item: list[parseInt(req.params.name.slice(4))-1] })
    }
    else
        res.render(n)
});
app.post("/student", function(req,res){
    let item ={
        Id: id,
        Name: req.body.name,
        Year: req.body.year,
        Description: req.body.description,
        Rating: 0,
        Feedback: "NaN"
    };
    id++;
    list.push(item);
    res.redirect("/student"); 
});
app.post("/peer", function(req,res){
    list[req.body.hidden-1]["Rating"]=req.body.rate;
    list[req.body.hidden-1]["Feedback"]=req.body.feedback;
    res.redirect("/peer"); 
});