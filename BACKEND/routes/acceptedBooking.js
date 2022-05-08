const router = require("express").Router();

const passport = require('passport');
const passportConfig = require('../passport');
const AcceptedBooking = require('../models/AcceptedBooking');


//insert Data
router.post("/addacceptedbooking",passport.authenticate('jwt',{session : false}) ,(async (req, res) => {
    try {
      const acceptedBooking = new AcceptedBooking(req.body);
      const savedacceptedbooking = await acceptedBooking.save();
      if (savedacceptedbooking) {
        res.status(201).send({ message: "success", data: savedacceptedbooking });
      } else {
        res.status(400).send({ message: "failed", data: savedacceptedbooking });
      }
      console.log("result , ", savedacceptedbooking);
    } catch (err) {
      console.log("error in careere ", err);
      res.status(500).send({ message: "failed", data: err });
    }
  }));



  router.get('/acceptedbookinguserview',passport.authenticate('jwt',{session : false}),(req,res)=>{

    // let userID = req.params.id;
    // const {name,nicno,address,contactno,companyname,raw,description,email,username,password,role} = req.body;
  
        AcceptedBooking.find({userId : req.user._id})
         .then((acceptedBooking)=>{
          res.json(acceptedBooking)
      }).catch((err)=>{
          console.log(err);
     })
     .catch(err => res.status(404).json(err));  
  });

  router.get('/acceptedbookingstaffview',passport.authenticate('jwt',{session : false}),(req,res)=>{

    // let userID = req.params.id;
    // const {name,nicno,address,contactno,companyname,raw,description,email,username,password,role} = req.body;
  
        AcceptedBooking.find()
         .then((acceptedBooking)=>{
          res.json(acceptedBooking)
      }).catch((err)=>{
          console.log(err);
     })
     .catch(err => res.status(404).json(err));  
  });


  router.delete("/deleteaccepted/:id", async (req, res) => {
    try {
      const deleteaccepted = await AcceptedBooking.findByIdAndRemove(req.params.id);
      res.json(deleteaccepted);
      console.log("Deleted!");
    } catch (err) {
      console.log("error in get data", err);
      res.status(204).send({ message: "failed", data: err });
    }
  });

  module.exports = router;