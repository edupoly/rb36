var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");

http.createServer(function(req,res){
    console.log("A request received",req.url)
    var x = url.parse(req.url);
    var y = path.parse(x.path)
    console.log(y)
    if(req.url==='/' || req.url==='/favicon.ico'){
        fs.readFile("home.html",function(err,data){
            res.write(data.toString());
            res.end()
        })
        console.log("favico")
    }
    else{
        fs.readFile(y.base,function(err,data){
            res.write(data.toString());
            res.end()
        })
    }

}).listen(8085)