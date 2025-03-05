const mongoose = require("mongoose");


const mySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        uniqe:true
    },
    password:{
        type:String,
        required:true,
    },
}, {timestamps :true} );

const userModel = mongoose.model("usermodel", mySchema);

module.exports = userModel;