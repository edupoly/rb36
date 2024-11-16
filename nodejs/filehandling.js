var fs = require("fs");

fs.readFile("students.txt",function(err,buf){
    console.log(buf.toString())
})

console.log("Last line")








// var filedata = fs.readFileSync("students.txt");
// console.log(filedata.toString())








// fs.rm("employees.txt",function(){console.log("Poye")})

// fs.appendFile("employees.txt","govindu sindhu",function(){
//     console.log("Appended")
// })


// fs.writeFile("employees.txt","balu siva jasim",function(err,x){
//     if(err){console.log("err::",err)}
//     else{console.log("x::",x)}
// })

// fs.readFile("students.txt",function(err,buf){
//     if(err){
//         console.log("Error Occured")
//     }
//     else{
//         console.log(buf.toString())
//     }
// })