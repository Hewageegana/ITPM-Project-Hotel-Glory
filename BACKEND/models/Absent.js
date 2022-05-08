const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const absentSchema = new Schema({
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
    },
    nic: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    note: {
        type: String,
        require: true
    },
    profileImg: {
        type: String,
        require: true
    },
    currentDate: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    }
}, { timestamps: true })

const Absent = mongoose.model("Absent", absentSchema);
module.exports = Absent;
