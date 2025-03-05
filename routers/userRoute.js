const express = require("express");
const router = express.Router();
const userModel = require("../models/authModel");
const { default: mongoose } = require("mongoose");
const { setUser } = require("../services/authService");


router.post("/signup", (req ,res)=>{

    const {name,email,password} = req.body;
    userModel.create({
        name,
        email,
        password
    });
    res.redirect("/static/login")
});



router.post("/login", async (req ,res)=>{

    const {email,password} = req.body;
    const user = await userModel.findOne({email,password});
    if(!user) return res.render("login",{
        err : "invalid Email Or Password"
    });

    
    const token = setUser(user);
    res.cookie('uid',token);

    return res.redirect("/static/home")
});


module.exports = router;