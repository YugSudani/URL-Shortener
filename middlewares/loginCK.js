//middleware that only allows to use further service only if user is loged in
//for that take cookie of user and find in session id 

const { getUser } = require("../services/authService");


async function logedInUserOnly(req ,res ,next){            //allows only if user is loged in  (it will check on every urlRouter req/res)

        const userUid = req.cookies?.uid;                   //geting cookie
        if(!userUid) return res.redirect("/static/login");  

        const user = getUser(userUid);                      //geting user if exist from service map
        if(!user) return res.redirect("/static/login");

        req.user = user;                      //used at url router
        next();
}

async function checkAuth(req,res,next) {  //for adding req.user in static home page to load only user's URL
    const userUid = req.cookies?.uid;

    const user = getUser(userUid);

    req.user = user //adds user in user object when static page loads
    next();         // allow next
}



module.exports = {
    checkAuth,
    logedInUserOnly,
}