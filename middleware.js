const passport = require('passport');


const isLoggedIn = (req,res,next)=>{
    if(req.xhr && !req.isAuthenticated()){
        return res.send('you need to login first');
    }
    
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
} 

module.exports={isLoggedIn}