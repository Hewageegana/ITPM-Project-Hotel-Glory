const router = require("express").Router();
const booking = require("../models/Booking");
const { findById } = require("../models/Booking");
const passport = require('passport');
const passportConfig = require('../passport');

router.get("/test",async (req, res) => {
    console.log("adasd", await res.json())
})
//insert Data
router.post("/add", async (req, res) => {
  try {
    const Booking = new booking(req.body);
    const savedbooking = await Booking.save();
    if (savedbooking) {
      res.status(201).send({ message: "success", data: savedbooking });
    } else {
      res.status(400).send({ message: "failed", data: savedbooking });
    }
    console.log("result , ", savedbooking);
  } catch (err) {
    console.log("error in careere ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});

//search for data using an ID
router.get("/booking/:id", async (req, res) => {
  try {
    const findById = await booking.findById(req.params.id);
    res.json(findById);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//search for data using name
router.get("/booking/find/:name", async (req, res) => {
  try {
    const findByName = await booking.findOne(req.params);
    res.json(findByName);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//retriew all data from db
router.get("/bookingview", async (req, res) => {
  try {
    const bookingview = await booking.find(req.params);
    res.json(bookingview);
    // console.log("result , ", bookingeview);
  } catch (err) {
    console.log("error in retriew booking", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

router.get("/view", async (_, res) => {
  res.json(await booking.find({}));
});

//Delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletebooking = await booking.findByIdAndRemove(req.params.id);
    res.json(deletebooking);
    console.log("Deleted!");
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const deletebooking = await booking.findByIdAndUpdate(req.params.id, req.body, {
      new: false,
    });
    res.json(deletebooking);
    console.log("result , ", deletebooking);
  } catch (err) {
    console.log("error", err);
    res.status(204).send({ message: "failed", data: err });
  }
});


router.get('/bookinguserview',passport.authenticate('jwt',{session : false}),(req,res)=>{

  // let userID = req.params.id;
  // const {name,nicno,address,contactno,companyname,raw,description,email,username,password,role} = req.body;

       booking.find({userId: req.user._id})
       .then((booking)=>{
        res.json(booking)
    }).catch((err)=>{
        console.log(err);
   })
   .catch(err => res.status(404).json(err));  
});

module.exports = router;
