const express = require("express");
const router = express.Router();
const urlModel = require("../models/urlmodel");

//note : add render only in static router otherwise use redirect
router.get("/home" ,async (req,res)=>{

    if(!req.user) return  res.json({err:"login to use" })
    const allURL = await urlModel.find({createdBy:req.user._id})  //req.user from middleware
    res.render("home",{
        URLS: allURL
    });
});

router.get("/signup", (req ,res)=>{

    res.render("signup");
});

router.get("/login", (req ,res)=>{

    res.render("login");
});

module.exports = router;
