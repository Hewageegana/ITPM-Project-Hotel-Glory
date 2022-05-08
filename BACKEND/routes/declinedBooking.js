const router = require("express").Router();
const declinedbooking = require("../models/DeclinedBooking");

const passport = require('passport');
const passportConfig = require('../passport');


//insert Data
router.post("/adddeclinedbooking",passport.authenticate('jwt',{session : false}) ,(async (req, res) => {
    try {
      const declinedBooking = new declinedbooking(req.body);
      const saveddeclinedbooking = await declinedBooking.save();
      if (saveddeclinedbooking) {
        res.status(201).send({ message: "success", data: saveddeclinedbooking });
      } else {
        res.status(400).send({ message: "failed", data: saveddeclinedbooking });
      }
      console.log("result , ", saveddeclinedbooking);
    } catch (err) {
      console.log("error in careere ", err);
      res.status(500).send({ message: "failed", data: err });
    }
  }));



  router.get('/declinedbookinguserview',passport.authenticate('jwt',{session : false}),(req,res)=>{

    // let userID = req.params.id;
    // const {name,nicno,address,contactno,companyname,raw,description,email,username,password,role} = req.body;
  
       declinedbooking.find({userId : req.user._id})
         .then((declinedBooking)=>{
          res.json(declinedBooking)
      }).catch((err)=>{
          console.log(err);
     })
     .catch(err => res.status(404).json(err));  
  });

  router.get('/declinedbookingstaffview',passport.authenticate('jwt',{session : false}),(req,res)=>{

    // let userID = req.params.id;
    // const {name,nicno,address,contactno,companyname,raw,description,email,username,password,role} = req.body;
  
       declinedbooking.find()
         .then((declinedBooking)=>{
          res.json(declinedBooking)
      }).catch((err)=>{
          console.log(err);
     })
     .catch(err => res.status(404).json(err));  
  });


  router.delete("/deletedeclined/:id", async (req, res) => {
    try {
      const deletedeclined = await declinedbooking.findByIdAndRemove(req.params.id);
      res.json(deletedeclined);
      console.log("Deleted!");
    } catch (err) {
      console.log("error in get data", err);
      res.status(204).send({ message: "failed", data: err });
    }
  });

  module.exports = router;