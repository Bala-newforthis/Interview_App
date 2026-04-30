const mongoose = require ("mongoose");


const userSchema = new mongoose.Schema ({
    username : {
        type : String,
        unique : [true, "username is already taken"],
        required : true,
    },
    email : {
        type : String,
        unique : [true, "Account is already exist with this email address"],
        required : true,
    },
    password : {
        type : String,
        required : true,
    }
})

const userModel =  mongoose.model("users" , userSchema) //mongoose ke ander ek method is model hai
module.exports = userModel