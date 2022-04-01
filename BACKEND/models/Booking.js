const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  ContactNumber: {
    type: Number,
    required: true,
  },
  Country: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  CheckInDate: {
    type: Date,
    required: true,
  },
  CheckOutDate: {
    type: Date,
    required: true,
  },
  Rooms: {
    type: String,
    
  },

  RoomType: {
    type: String,
    required: true,
  },


  Nights: {
    type: String,
    
  },

  Adults: {
    type: String,
    
  },

  Children: {
    type: String,
    
  },
});

const booking = mongoose.model("Booking", BookingSchema);
module.exports = booking;
