

const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb://localhost:27017/logindb");

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});


const collection = mongoose.model("user",userschema);

module.exports = collection;