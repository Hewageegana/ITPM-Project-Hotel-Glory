const staffRouter = require('express').Router();
const passport = require('passport');
const passportConfig = require('../passport');
const Staff = require('../models/Staff');


// ADD New Staff Member to the System
staffRouter.post('/addstaff',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {name,contactNo,address,nic,gender,jobtitle,martialStatus,age,profileImg,email} = req.body;
  
    if(req.user.role === 'staff' || req.user.role === 'admin'){
    Staff.findOne({nic},(err,staff)=>{
        if(err)
        res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        if(staff)
        res.status(400).json({message : {msgBody : "Can't use same nic again", msgError: true}});
        else{
            const newStaff = new Staff({
                name,
                contactNo,
                address,
                nic,
                gender,
                jobtitle,
                martialStatus,
                age,
                profileImg,
                email
            })
            newStaff.save().then(()=>{
                res.json("Staff Added Success")
              }).catch((err)=>{
                console.log(err);
              })
      }  
    
      });
    }
    else
    res.status(403).json({message : {msgBody : "You'r not a staff or Admin", msgError : true}});
  });

  //Get All Staff Members
  staffRouter.get('/allstaff',passport.authenticate('jwt',{session:false}),(req,res)=>{
        if(req.user.role === 'staff' || req.user.role === 'admin'){
        Staff.find().sort({ name: 1 }).collation({ locale: "en", caseLevel: true })
        .then((staff)=>{
            res.json(staff)
        }).catch((err)=>{
            console.log(err);
        })
    }
    else
    res.status(403).json({message : {msgBody : "You'r not an Staff or admin", msgError : true}});
    
});

//Get One Staff Member Details
staffRouter.get('/getStaff/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
    let staffid = req.params.id;
    if(req.user.role === 'staff' || req.user.role === 'admin'){
      Staff.findById(staffid).then((staff)=>{
        res.status(200).send({status:"staff fetched", staff});
    
    }).catch((e)=>{
        res.status(500).send({status:"Error"});
    })
    }
    else
    res.status(403).json({message : {msgBody : "You'r not an admin or staff", msgError : true}});
  });

  //Update Staff Member Details
  staffRouter.put('/staffupdate/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
    let staffId = req.params.id;
    const {name,contactNo,address,nic,gender,jobtitle,martialStatus,age,profileImg,email} = req.body;
  
    const updateStaff = {
        name,
        contactNo,
        address,
        nic,
        gender,
        jobtitle,
        martialStatus,
        age,
        profileImg,
        email
    }
    if(req.user.role === 'staff' || req.user.role === 'admin'){
      const update = Staff.findByIdAndUpdate(staffId,updateStaff).then(() =>{
        res.status(200).send({status: "Stff updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.message})
    });
    }
    else
    res.status(403).json({message : {msgBody : "You'r not a Staff or admin", msgError : true}});
  });
  

  //Delete Staff Member
  staffRouter.delete('/deletestaff/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
    let staffId = req.params.id;
  
    if(req.user.role === 'staff' || req.user.role === 'admin'){
    Staff.findByIdAndDelete(staffId)
    .then(()=>{
      res.status(200).send({ status: "Staff deleted" });
    })
    .catch((err)=>{
      res.status(500).send({ status: "Error with delete", error: err.message });
    });
}
else
res.status(403).json({message : {msgBody : "You'r not a Staff or admin", msgError : true}});

  });


  module.exports = staffRouter;