const mongoose = require("mongoose");


async function connectDB(URL) {
    mongoose.connect(URL)
    .then(()=>console.log("MongoDB Connected"));
}

module.exports = {
    connectDB
}