var express = require('express');
var app = express();
var mongoose = require("mongoose");
const Student = require('./Kids.model');
var bodyParser = require("body-parser");
app.use(express.static(__dirname+"/public"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get("/",function(req,res){
    console.log("request received")
    res.send("Hello Edupoly")
})

app.get("/explore/home/:place",function(req,res){
    console.log(req.params)
    res.send("Hello wait...")
})


app.post("/registerStudent",function(req,res){
    console.log("registerStudent called",req.body)

    mongoose.connect("mongodb+srv://infoedupoly:edupoly83@cluster0.eitlw5l.mongodb.net/rb36?retryWrites=true&w=majority&appName=Cluster0")
    .then(function(){
        var newStudent = new Student(req.body)
        newStudent.save().then(function(data){console.log(data)}).catch(function(err){console.log(err)})
    }).catch(function(){console.log("not connected")})

    res.send("Undu....")
})

app.listen(8086,function(){console.log("server running on 8086")})