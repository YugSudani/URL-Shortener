const mongoose = require("mongoose");


const mySchema = new mongoose.Schema({

    shortID:{
        type: String,
        required: true,
        uniqe:true,
    },
    redirectURL:{
        type: String,
        required: true,
    },
    visitHistory:[
        {timestamp :{type: Number}}
    ],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
}  ,  {timeseries:true},
);

const urlModel = mongoose.model("urlModel", mySchema);

module.exports = urlModel;