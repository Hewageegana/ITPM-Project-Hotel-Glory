import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import './addemployee.css'

function Mark() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    let history = useHistory();
    // let path = '/public/login';
    let path2 = '/staff/attendance';
    const { id } = useParams();

    const [attendance, setAttendence] = useState([]);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [contactNo, setcontactNo] = useState("");
    const [nic, setNic] = useState("");
    const [profileImg, setProfileImg] = useState("");

    const [currentDate, setDate] = useState("");
    const [note, setNote] = useState("No Special Note");
    const [code, setCODE] = useState("+94");



    useEffect(() => {

        function pad2(n) {
            return (n < 10 ? '0' : '') + n;
        }

        const current = new Date();
        var month = pad2(current.getMonth() + 1);//months (0-11)
        var day = pad2(current.getDate());//day (1-31)
        var year = current.getFullYear();
        var formattedDate =  year+"-"+month+"-"+day;

        // const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
        setDate(formattedDate)
        axios.get(`/staff/getattendence/${id}`).then((res) => {
            setAttendence(res.data)
            setName(res.data.name)
            setcontactNo(res.data.contactNo)
            setCODE(res.data.code)
            setNic(res.data.nic)
            setProfileImg(res.data.profileImg)
            setEmail(res.data.email)
        }).catch((e) => {
            history.push(path2);
        })
    }, [])

    function presentData(e) {
        
        const Employee = {
            name,
            contactNo,
            code,
            nic,
            currentDate,
            note,
            profileImg,
            email
        }
        swal({
            title: "Are you sure?",
            text: "Mark as Present",
            icon: "warning",
            buttons: true,
            dangerMode: false,
        }).then((present) => {
            if (present) {
                axios.post('/staff/addpresent', Employee).then(() => {
                    axios.delete(`/staff/deleteattendence/${id}`).then(() => {
                        if (present) {
                            swal({
                                title: "Success!",
                                text: "Your Successfully Marked Present",
                                icon: "success",
                                button: "Ok",
                            }); history.push(path2);
                        } else {
                            swal("Attendance Didn't Mark");
                        }
                    })
                }).catch((e) => {
                    swal("Please fill Form correctly " + e);
                })
            }
        })
        // axios.post('/staff/addpresent', Employee).then(() => {
        //     axios.delete(`/staff/deleteattendence/${id}`).then(() => {
        //         swal({
        //             title: "Success!",
        //             text: "Your Successfully Marked Present",
        //             icon: "success",
        //             button: "Ok",
        //         }); history.push(path2);
        //     })
        // }).catch((e) => {
        //     swal("Please fill Form correctly " + e);
        // })
    };

    function absentData(e) {

        const Employee = {
            name,
            contactNo,
            code,
            nic,
            currentDate,
            note,
            profileImg,
            email
        }
        swal({
            title: "Are you sure?",
            text: "Mark as Absent",
            icon: "warning",
            buttons: true,
            dangerMode: false,
        }).then((absent) => {
            if (absent) {
                axios.post('/staff/addabsent', Employee).then(() => {
                    axios.delete(`/staff/deleteattendence/${id}`).then(() => {
                        if (absent) {
                            swal({
                                title: "Success!",
                                text: "Your Successfully Marked Absent",
                                icon: "success",
                                button: "Ok",
                            }); history.push(path2);
                        } else {
                            swal("Attendance Didn't Mark");
                        }
                    })
                }).catch((e) => {
                    swal("Please fill Form correctly " + e);
                })
            }
        })
        // axios.post('/staff/addabsent', Employee).then(() => {
        //     axios.delete(`/staff/deleteattendence/${id}`).then(() => {
        //         swal({
        //             title: "Success!",
        //             text: "Your Successfully Marked Absent",
        //             icon: "success",
        //             button: "Ok",
        //         }); history.push(path2);
        //     })
        // }).catch((e) => {
        //     swal("Please fill Form correctly " + e);
        // })
    };

    return (
        <>
            <br />
            <div className="container customcon">

                <br />
                <center><h1 style={{ letterSpacing: "5px", fontSize: "30px", fontWeight: "600" }}>Mark Attandence</h1></center>
                <div className="register">
                    <div className="registerin" style={{ margin: "40px" }}>

                        <form className="needs-validation" noValidate>
                            <center> <div className="col-md-6">
                                <label for="floatingInput" style={{ marginBottom: "10px", fontSize: "18px" }}>Profile Image</label><br />
                                <label for="profile" style={{ marginBottom: "20px" }}>
                                    <div className="card poster">

                                        {profileImg === "" ? <center><h4 style={{ marginTop: "50px" }}>Preview</h4></center> : <center><img src={profileImg} className="posterimg" /></center>}

                                    </div>
                                </label>
                                <br />
                                {/* <input type="file" {...register("profileImg",{ required:true})} className="form-control logininput" id="poster" placeholder="Profile Image"
                      onChange={postDetails} required/>
                      {errors?.profileImg?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)} */}

                            </div></center>
                            <br />
                            <div className="row g-3">
                                <div className="col-md-6 form-floating">
                                    <input type="text" className="form-control logininput" id="username" placeholder="Employee Name" defaultValue={name} disabled
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }} />
                                    <label for="floatingInput">Employee Name</label>
                                </div>

                                <div className="col-md-1 form-floating">
                                    <input type="text" className="form-control logininput" id="contact" placeholder="+94" defaultValue={code} disabled
                                        onChange={(e) => {
                                            setCODE(e.target.value);
                                        }} required />
                                    <label for="floatingInput">  Code</label>
                                </div>

                                <div className="col-md-4 form-floating">
                                    <input type="text" className="form-control logininput" id="contact" placeholder="Contact Number" defaultValue={contactNo} disabled
                                        onChange={(e) => {
                                            setcontactNo(e.target.value);
                                        }} required />
                                    <label for="floatingInput">Contact Number</label>
                                </div>
                            </div>
                            <br />

                            <div className="row g-2">
                                <div className="col-md-6 form-floating">
                                    <input type="text" className="form-control logininput" id="nic" placeholder="nic" defaultValue={nic} disabled
                                        onChange={(e) => {
                                            setNic(e.target.value);
                                        }} required />
                                    <label for="floatingInput">Nic Number</label>
                                </div>

                                <div className="col-md-6 form-floating">
                                    <input type="text" className="form-control logininput" id="email" placeholder="Email" defaultValue={email} disabled
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }} required />
                                    <label for="floatingInput">Email</label>
                                </div>
                            </div>
                            <br />
                            <div className="col-md-6">
                                &nbsp;&nbsp;<label for="floatingInput">Special Note</label>
                                <textarea rows="3" className="form-control logininput" id="note" placeholder="note" defaultValue={note}
                                    onChange={(e) => {
                                        setNote(e.target.value);
                                    }} required />
                            </div>
                            <br />



                            <button type="submit" className="btnregister" onClick={handleSubmit(presentData)} id="regsubmit">Present</button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <button type="button" className="btnreset" id="regreset">Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <button type="submit" className="btnreset" onClick={handleSubmit(absentData)} id="regreset">Absent</button>
                        </form>
                    </div>
                </div>
                <br />
            </div>
            <br />
        </>
    )
}

export default Mark