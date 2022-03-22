const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  contactNo:{
    type: String,
    required: true
  },
  address:{
    type:String,
    required: true
  },
  nic:{
    type: String,
    required: true
  },
  gender:{
    type: String,
    required: true
  },
  jobtitle:{
    type:String,
    required: true
  },
  martialStatus:{
    type: String,
    required: true
  },
  age:{
    type: String,
    required: true
  },
  profileImg:{
    type: String,
    required: true
  },
},{timestamps:true})

const Staff = mongoose.model("Staff",staffSchema);
module.exports = Staff;
