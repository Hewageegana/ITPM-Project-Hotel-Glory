const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  RoomId: {
    type: String,
    required: true,
  },
  RoomType: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  Image: {
    type: String,
    required: true,
  },
});

const Rooms = mongoose.model("Room", RoomSchema);
module.exports = Rooms;
