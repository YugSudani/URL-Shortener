const express = require("express");
const router = express.Router();

const urlModel = require("../models/urlmodel");
const shortid = require("shortid")



//this route will take url and create shortID in DB
router.post("/new" , async(req ,res)=>{

    if(!req.user) return redirect("/static/login");
    const body = req.body;
    if(!body.url) return res.status(400).json({error : "All fields are Required "});
    
    const SID = shortid();
    await urlModel.create({
        shortID: SID,
        redirectURL: body.url,
        visitHistory:[],
        createdBy: req.user._id,       //req.user from middleware
    });

    return res.redirect("/static/home")
});


//redirect to url route is on index.js file because middleware will not allow accesse that here


//this rout will take SID and Send History of that SID
router.get("/hist/:id" , async (req ,res)=>{

    const shortID = req.params.id;
    const entry = await urlModel.findOne(
    {
        shortID
    }
  );
            return res.json({total_clicks: entry.visitHistory.length , analytics: entry.visitHistory });
});

module.exports = router;