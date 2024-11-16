var express = require("express");
var app = express();
var mongoose = require("mongoose");
var User = require('./models/user.model')
var Course = require('./models/course.model')
var bodyParser = require("body-parser");

var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.set("view engine","pug")

app.use(express.static(__dirname+"/public"));
app.get("/",function(req,res){
    mongoose.connect("mongodb+srv://infoedupoly:edupoly83@cluster0.eitlw5l.mongodb.net/rb36?retryWrites=true&w=majority&appName=Cluster0")
    .then(function(){
        Course.find({})
        .then((data)=>{
            res.render("home",{courses:data})

        })
        .catch(()=>{
            res.send("errpr")
        })
        
        
    }).catch(function(){console.log("not connected")})

})
app.post("/addCourse",function(req,res){
    console.log(req)
    mongoose.connect("mongodb+srv://infoedupoly:edupoly83@cluster0.eitlw5l.mongodb.net/rb36?retryWrites=true&w=majority&appName=Cluster0")
    .then(function(){

        User.findOne({username:req.body.username,password:req.body.password})
        .then((data)=>{
            var newCourse = new Course(req.body);
            newCourse.save().then(function(data){
                console.log(data)
                res.send("New Course Added")
            })
        })
        .catch(()=>{})
        
    }).catch(function(){console.log("not connected")})

})
app.post("/login",function(req,res){
    console.log("user details::",req.body)
    mongoose.connect("mongodb+srv://infoedupoly:edupoly83@cluster0.eitlw5l.mongodb.net/rb36?retryWrites=true&w=majority&appName=Cluster0")
    .then(function(){

        User.findOne({username:req.body.username,password:req.body.password})
        .then((data)=>{
            console.log(data)
            if(data){
                res.cookie("username",data.username)
                res.cookie("password",data.password)
                res.redirect("/")
            }
            else{
                res.json({msg:'failed'})
            }
        })
        .catch(()=>{})
        
    }).catch(function(){console.log("not connected")})
})
app.post("/register",function(req,res){
    console.log(req.body);
    mongoose.connect("mongodb+srv://infoedupoly:edupoly83@cluster0.eitlw5l.mongodb.net/rb36?retryWrites=true&w=majority&appName=Cluster0")
    .then(function(){
        var newUser = new User(req.body);
        newUser.save().then((ns)=>{
            console.log(ns)
            res.redirect("/login.html")
        }).catch(err=>console.log(err))
    }).catch(function(){console.log("not connected")})


})

app.get("/course/:id",(req,res)=>{
    mongoose.connect("mongodb+srv://infoedupoly:edupoly83@cluster0.eitlw5l.mongodb.net/rb36?retryWrites=true&w=majority&appName=Cluster0")
    .then(function(){
        Course.findById(req.params.id)
        .then((data)=>{
            console.log(data)
            res.render("courseDetails",{course:data})
        })
        .catch(()=>{})
    }).catch(function(){console.log("not connected")})
})

function authenticate(req,res,next){
    if(req.cookies.username){

        next()
    }
    else{
        res.redirect("/login.html")
    }
}

app.get("/registerCourse/:cid",authenticate,function(req,res){
    console.log(req.cookies)
    mongoose.connect("mongodb+srv://infoedupoly:edupoly83@cluster0.eitlw5l.mongodb.net/rb36?retryWrites=true&w=majority&appName=Cluster0")
    .then(function(){
        User.findOneAndUpdate({username:req.cookies.username},{$push:{courses:req.params.cid}})
        .then((d)=>{console.log(d)})
        .catch(err=>console.log(err))
    }).catch(function(){console.log("not connected")})
    res.send("Undu ra babu")
})

app.listen(8088,function(){console.log("server running on 8088")})