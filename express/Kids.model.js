var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    name:String,
    mobile:String,
    course:String
})

var Student = mongoose.model("Student",studentSchema)

module.exports=Student;