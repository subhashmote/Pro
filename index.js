const express = require("express");
const path = require("path");
const collection = require('./mongodb');

const app = express();

app.set("view engine", "ejs");
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    res.render("login.ejs");
});

app.get("/signup", function (req, res) {
    res.render("signup.ejs");
})


app.post("/signup", async function (req, res) {
    const data = {
        name: req.body.fname,
        email: req.body.email,
        password: req.body.password
    };
    const existinguser = await collection.findOne({ name: data.name });

    if (existinguser) {
        res.send("user already exist try another user name");
    }
    else {
        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }

});


app.post("/login",async function(req,res){
    try{
        const check = await collection.findOne({name:req.body.username});
        if(!check){
            res.send("username does not found");
        }

        if(req.body.password === check.password){
            res.render("home.ejs");
        }
        else{
            res.send("wrong password");
        }
    }
    catch(err){
        res.send(err);
        console.log("error found");
    }
})


app.listen(3000);