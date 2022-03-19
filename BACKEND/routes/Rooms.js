const router = require("express").Router();
const { findById } = require("../models/Rooms");
const Rooms = require("../models/Rooms");

//insert Data
router.post("/add", async (req, res) => {
  try {
    const room = new Rooms(req.body);
    const savedRoom = await room.save();
    if (savedRoom) {
      res.status(201).send({ message: "success", data: savedRoom });
    } else {
      res.status(400).send({ message: "failed", data: savedRoom });
    }
    console.log("result , ", savedRoom);
  } catch (err) {
    console.log("error in careere ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});

//search for data using an ID
router.get("/rooms/:id", async (req, res) => {
  try {
    const findById = await Rooms.findById(req.params.id);
    res.json(findById);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//search for data using name
router.get("/rooms/find/:name", async (req, res) => {
  try {
    const findByName = await Rooms.findOne(req.params);
    res.json(findByName);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//retriew all data from db
router.get("/roomsview", async (req, res) => {
  try {
    const Roomseview = await Rooms.find(req.params);
    res.json(Roomseview);
    console.log("result , ", Roomseview);
  } catch (err) {
    console.log("error in retriew rooms", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

router.get("/view", async (_, res) => {
  res.json(await Rooms.find({}));
});

//Delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteRoom = await Rooms.findByIdAndRemove(req.params.id);
    res.json(deleteRoom);
    console.log("Deleted!");
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const deleteRoom = await Rooms.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(deleteRoom);
    console.log("result , ", deleteRoom);
  } catch (err) {
    console.log("error in getting room details", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

module.exports = router;
