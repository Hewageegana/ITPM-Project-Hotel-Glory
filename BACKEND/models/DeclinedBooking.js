const mongoose = require("mongoose");

const DeclinedBookingSchema = new mongoose.Schema({
  userId:{
    type:String,
    required: true
  },
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
    type: String,
  },
  CheckOutDate: {
    type: String,
  },
  Rooms: {
    type: String,
    
  },

  RoomType: {
    type: String,
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

const declinedbooking = mongoose.model("DeclinedBooking", DeclinedBookingSchema);
module.exports = declinedbooking;
