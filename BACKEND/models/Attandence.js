const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attandenceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  nic: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  jobtitle: {
    type: String,
    required: true
  },
  martialStatus: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  profileImg: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true
  },
}, { timestamps: true })

const Attandence = mongoose.model("Attandence", attandenceSchema);
module.exports = Attandence;
