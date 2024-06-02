const express=require("express");
const router=express.Router();
const User=require("../models/user");
 const passport = require("passport");


router.get("/register",(req,res)=>{
    res.render("auth/signup");
})

router.post("/register",async(req,res)=>{
    try{
        const {username,password,email}=req.body;
    const user=new User({username,email})
   const newUser= await User.register(user,password);
   req.login(newUser, function(err) {
    if (err) { return next(err); }
    return res.redirect('/homePage' );
  });
    }
    catch(e){
        res.redirect("/register")
    }
    
})

router.get("/login",(req,res)=>{
    res.render("auth/login")
})

router.post('/login',
    passport.authenticate('local',{
        failureRedirect:'/login',
        // failureFlash:true
    }),function(req,res){
        let redirectUrl= "/homePage";
        res.redirect(redirectUrl)

    }
)


router.get('/logout',(req,res)=>{
    
    req.logout(()=>{
        console.log("logout")
        res.redirect('/login');
    });
        
});


module.exports=router