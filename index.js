const express = require("express");
const app = express();
PORT = 8000;

const { connectDB } = require("./connection");
const path = require("path");
const { logedInUserOnly, checkAuth } = require("./middlewares/loginCK");
const cookieParser = require("cookie-parser");


//url model for redirect url route
const urlModel = require("./models/urlmodel");

//Routers
const urlRouter = require("./routers/urlRouter");
const staticR = require("./routers/staticR");
const userRouter = require("./routers/userRoute");


//connecting to DB
connectDB("mongodb://127.0.0.1:27017/SH-url");


//middlewares
app.use(express.json({extended: false}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


//ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


//this route will take SID and redirect it to redirectURl
app.get("/url/:SID" ,async (req ,res)=>{

    const shortID = req.params.SID
    const url = await urlModel.findOneAndUpdate({
        shortID
    },
    {
        $push: {
                visitHistory:{
                            timestamp: Date.now()
                    },
               },
    }
);
    return res.redirect(url.redirectURL);
});


//Routers
app.use("/static",checkAuth, staticR);
app.use("/user" , userRouter);
app.use("/url", logedInUserOnly , urlRouter);




app.listen(PORT , ()=>{console.log("Server Started on Port : ",PORT)})