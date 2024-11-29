const mongoose = require("mongoose");

const user = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
         type: String, default: 'student', 
        enum: ['student', 'teacher'] 
    },
});

module.exports = mongoose.model("user",user);