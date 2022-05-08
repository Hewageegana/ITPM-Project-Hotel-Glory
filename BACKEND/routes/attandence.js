const attandenceRouter = require('express').Router();
const passport = require('passport');
const passportConfig = require('../passport');
const Staff = require('../models/Staff');
const Attandence = require('../models/Attandence');
const Absent = require('../models/Absent');
const Present = require('../models/Present');
const { db } = require("../models/Staff");


attandenceRouter.get('/attendance', passport.authenticate('jwt', { session: false }), (req, res) => {
    Staff.find()
        .then((staff) => {
            res.json(staff);
            db.collection("attandences").insertMany(staff)
        })
        .catch((err) => {
            console.log(err);
        })

});

attandenceRouter.get('/allattendance', passport.authenticate('jwt', { session: false }), (req, res) => {
    // let userID = req.params.id;
    // if(userId===req.user._id){
    Attandence.find().then((attendance) => {
        res.status(200).send({ status: "Attendance fetched", attendance });

    }).catch((e) => {
        res.status(500).send({ status: "Error" });
    })
    // }
});

attandenceRouter.get('/getattendence/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let attandenceID = req.params.id;
    Attandence.findById(attandenceID)
        .then((attendance) => {
            res.json(attendance);
        })
        .catch((err) => {
            console.log(err);
        })

});

attandenceRouter.delete('/deleteattendence/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let attandenceID = req.params.id;

    Attandence.findByIdAndDelete(attandenceID)
        .then(() => {
            res.status(200).send({ status: "Attendence deleted" });
        })
        .catch((err) => {
            res.status(500).send({ status: "Error with delete", error: err.message });
        });
});

attandenceRouter.post('/addabsent', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { name, contactNo, code, nic, email, note, profileImg, currentDate } = req.body;
    let status = "Absent"

    const newabsent = new Absent({
        name,
        contactNo,
        code,
        nic,
        email,
        note,
        profileImg,
        currentDate,
        status
    })

    newabsent.save().then(() => {
        res.json("Attendence Added")
    }).catch((err) => {
        console.log(err);
    })

});

attandenceRouter.post('/addpresent', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { name, contactNo, code, nic, email, note, profileImg, currentDate } = req.body;

    const newpresent = new Present({
        name,
        contactNo,
        code,
        nic,
        email,
        note,
        profileImg,
        currentDate
    })

    newpresent.save().then(() => {
        res.json("Attendence Added")
    }).catch((err) => {
        console.log(err);
    })

});


//All Present Attendance By Date
attandenceRouter.get('/allpresent/:date', passport.authenticate('jwt', { session: false }), (req, res) => {

    Present.find({ currentDate: req.params.date })
        .then((attendence) => {
            res.json(attendence);
        })
        .catch((err) => {
            console.log(err);
        })

});

//All Absent Attendance By Date
attandenceRouter.get('/allabsent/:date', passport.authenticate('jwt', { session: false }), (req, res) => {

    Absent.find({ currentDate: req.params.date })
        .then((attendence) => {
            res.json(attendence);
        })
        .catch((err) => {
            console.log(err);
        })

});


//All Absent Attendance By NIC
attandenceRouter.get('/allNicabsent/:nic', passport.authenticate('jwt', { session: false }), (req, res) => {

    Absent.find({ nic: req.params.nic })
        .then((attendence) => {
            res.json(attendence);
        })
        .catch((err) => {
            console.log(err);
        })

});

//All Present Attendance By NIC
attandenceRouter.get('/allNicpresent/:nic', passport.authenticate('jwt', { session: false }), (req, res) => {

    Present.find({ nic: req.params.nic })
        .then((attendence) => {
            res.json(attendence);
        })
        .catch((err) => {
            console.log(err);
        })

});

//Present record delete
attandenceRouter.delete('/deletepresent/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let userID = req.params.id;

    Present.findByIdAndDelete(userID)
        .then(() => {
            res.status(200).send({ status: "Present Record deleted" });
        })
        .catch((err) => {
            res.status(500).send({ status: "Error with delete", error: err.message });
        });
});

//Absent record delete
attandenceRouter.delete('/deleteabsent/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let userID = req.params.id;

    Absent.findByIdAndDelete(userID)
        .then(() => {
            res.status(200).send({ status: "Absent Record deleted" });
        })
        .catch((err) => {
            res.status(500).send({ status: "Error with delete", error: err.message });
        });
});

module.exports = attandenceRouter;
