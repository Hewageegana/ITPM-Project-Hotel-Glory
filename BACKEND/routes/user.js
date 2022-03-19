const userRouter = require('express').Router();
const JWT = require('jsonwebtoken');
const passport = require('passport');
const passportConfig = require('../passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const signToken = userID => {
  return JWT.sign({
      iss : "damru",
      sub : userID
//token expires in 1hour, after 1h user have to relogin 
  },"damru",{expiresIn: "1h"});
}

userRouter.route('/register').post((req,res)=>{
  const {username,password} = req.body;
  role = "user";


  User.findOne({username},(err,user)=>{
    if(err)
    res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
    if(user)
    res.status(400).json({message : {msgBody : "Username is already taken", msgError: true}});
    else{
      const newUser = new User({username,password,role});
      newUser.save(err=>{
          if(err)
          res.status(500).json({message : {msgBody : "Error has occured ", msgError: true}});
          else
          res.status(201).json({message : {msgBody : "Account Successfully created", msgError: false}});

      });
  }  

  });
});

userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
  res.clearCookie('access_token');
  res.json({user:{username : "", role :""},success : true});    
});

//use passport locatstrategy for login
userRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
  if(req.isAuthenticated()){
      //get request user from passport compare password
     const {_id,username,role} = req.user;
     //create json token
     const token =signToken(_id);
     //set cookie
     //use http only for prevent client edit cookie using java scripts
     //same site use for cross site scripting prevention
     res.cookie('access_token',token,{httpOnly: true, sameSite:true});
     res.status(200).json({isAuthenticated : true,user : {username,role}});
  }
  
});

userRouter.get('/userauthenticated',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const {username,role} = req.user;
  res.status(200).json({isAuthenticated : true, user : {username,role}});  
});

module.exports = userRouter;