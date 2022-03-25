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

//user register(add)
userRouter.route('/register').post((req,res)=>{
  const {name,email,contactNo,gender,nic,dob,image,username,password} = req.body;
  role = "user";


  User.findOne({username},(err,user)=>{
    if(err)
    res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
    if(user)
    res.status(400).json({message : {msgBody : "Username is already taken", msgError: true}});
    else{
      const newUser = new User({name,email,contactNo,gender,nic,dob,image,username,password,role});
      newUser.save(err=>{
          if(err)
          res.status(500).json({message : {msgBody : "Error has occured ", msgError: true}});
          else
          res.status(201).json({message : {msgBody : "Account Successfully created", msgError: false}});

      });
  }  

  });
});


//logout
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


//update
userRouter.put('/userupdate/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  let userID = req.params.id;
  //const supplier = await Supplier.findById(req.user._id);
  //destructor
  const{name,email,contactNo,gender,nic,dob,image} = req.body;

  const updateUser = {
    name,
    email,
    contactNo,
    gender,
    nic,
    dob,
    image
  }
     const update = User.findByIdAndUpdate(userID,updateUser).then(() =>{
      res.status(200).send({status: "User updated"})
  }).catch((err) =>{
      console.log(err);
      res.status(500).send({status: "Error with updating data",error: err.message})
  });
  
});


// delete 
userRouter.delete('/delete/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
  let id = req.params.id;

      User.findByIdAndRemove(id).then(()=>{
        res.status(200).send({ status: "User deleted" });
      })
      .catch((err)=>{
        res.status(500).send({ status: "Error with delete", error: err.message });
      });
});


//user Profile (view)
userRouter.get('/userprofile',passport.authenticate('jwt',{session : false}),(req,res)=>{

  // let userID = req.params.id;
  // const {name,nicno,address,contactno,companyname,raw,description,email,username,password,role} = req.body;

       User.findById({_id : req.user._id}).then(user=>{
       
       if(!user){
           error.nonprofile = 'There is no profile for this user';
           return res.status(404).json(errors);

       }if(user){
       res.json(user);
       }
   })
   .catch(err => res.status(404).json(err));  
});


module.exports = userRouter;