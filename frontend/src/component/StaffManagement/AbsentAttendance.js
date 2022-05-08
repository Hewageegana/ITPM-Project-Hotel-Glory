import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import jspdf from "jspdf";
import "jspdf-autotable";
import logo from "../../Assets/Images/HotalLOGOLarge.png";
import call from "../../Assets/Icons/call.png";
import job from "../../Assets/Icons/job.png";
import "./viewallemployee.css";
import identity from "../../Assets/Icons/identity-card.png";
import img from "../../Assets/Images/HotalLOGOLarge.png";
import mail from "../../Assets/Icons/mail.png";
import userIcon from "../../Assets/Icons/user.png";
import "./attendanceHistory.css";

function AbsentAttendance() {
    let history = useHistory();
    let path = "/public/login";
    const [searchTerm, setsearchTerm] = useState("");
    const [date, setDate] = useState("");

    const [attendence, setAttendence] = useState([]);
    const { nic } = useParams();

    useEffect(() => {
        const getAttendance = async () => {
            const res = await axios.get(`/staff/allNicabsent/${nic}`).then((res) => {
                setAttendence(res.data)
            });
        };
        getAttendance();
    }, []);

    return (
        <>
            <br />
            <div className="container filmpage customcon">
                <br />
                <center>
                    <h1
                        style={{
                            letterSpacing: "5px",
                            fontSize: "30px",
                            fontWeight: "600",
                        }}
                    >
                        Attendance History
                    </h1>
                </center>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <Link to={"/staff/onehistory/" + nic} class="nav-link">Present</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page">Absent</Link>
                    </li>
                </ul>
                <input
                    className="search sfocus"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => {
                        setsearchTerm(e.target.value);
                    }}
                />
                {/* &nbsp;&nbsp;
                <Link to="/user/addstaff">
                    <button
                        type="submit"
                        className="btn btn-outline-info allempreg"
                        id="regsubmit"
                    >
                        New Employee
                    </button>
                </Link> */}
                &nbsp;&nbsp;
                <Link to="/staff/attendance">
                    <button
                        type="submit"
                        className="btn btn-outline-info allempreg"
                        id="regsubmit"
                    >
                        Attendance
                    </button>
                </Link>
                &nbsp;&nbsp;
                {/* <button
                    type="submit"
                    className="btn btn-outline-info allempreg"
                    id="regsubmit"
                    onClick={() => generatePDF(staff)}
                >
                    Report
                </button> */}
                <hr className="hrView" />
                {attendence.length === 0 ? (
                    <>
                        <div className="card border-dark mb-3 emptycard">
                            <div className="row g-3">
                                <div className="column filmpage-imagecol">
                                    <div className="filmimage">
                                        <center>
                                            <img src={logo} className="filmimg2" />{" "}
                                        </center>
                                    </div>
                                </div>
                                <div className="column filmpage-namecol">
                                    <h3 style={{ margin: "20px", fontWeight: "700" }}>
                                        No Attendance History
                                    </h3>
                                    {/* <center>
                                        <p>
                                            <Link to="/staff/addstaff">
                                                <button
                                                    type="submit"
                                                    className="button-28"
                                                    role="button"
                                                    id="regsubmit"
                                                >
                                                    Add New Employee
                                                </button>
                                            </Link>
                                        </p>
                                    </center> */}
                                </div>
                                <div className="column filmpage-iconcol">
                                    <div className="filmicon"></div>
                                </div>
                            </div>
                        </div>
                        <br />
                    </>
                ) : (
                    <div className="filmcard">
                        {attendence
                            .filter((val) => {
                                if (searchTerm === "") {
                                    return val;
                                } else if (
                                    val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    val.nic.toLowerCase().includes(searchTerm.toLowerCase())
                                ) {
                                    return val;
                                }
                            })
                            .map(function (f) {
                                return (
                                    <div className="card mb-2 filmcard1">
                                        <div className="row g-3">
                                            <div className="column history-imgcol">
                                                <div className="filmimage card">
                                                    <img src={f.profileImg} className="filmimg" />
                                                </div>
                                            </div>
                                            <div className="column history-detailcol">
                                                <h5
                                                    style={{ marginTop: "20px", marginRight: "80px" }}
                                                    className="filmpage-nameh5"
                                                >
                                                    {f.currentDate}
                                                </h5>
                                                {/* <h5
                                                    style={{ marginTop: "20px", marginRight: "80px" }}
                                                    className="filmpage-nameh5"
                                                >
                                                    {f.name}
                                                </h5> */}
                                                <h6 style={{ marginTop: "2px" }}>
                                                    <img src={userIcon} style={{ width: "25px" }} /> {f.name}
                                                </h6>
                                                <h6 style={{ marginTop: "2px" }}>
                                                    <img src={mail} style={{ width: "25px" }} /> {f.email}
                                                </h6>

                                                <h6 style={{ marginTop: "0px" }}>
                                                    <img src={identity} style={{ width: "25px" }} />{" "}
                                                    {f.nic}
                                                </h6>

                                                {/* <h6 style={{ marginTop: "0px" }}>
                                                    <img src={job} style={{ width: "25px" }} />{" "}
                                                    {f.jobtitle}
                                                </h6> */}
                                                <h6 style={{ marginTop: "0px" }}>
                                                    <img src={call} style={{ width: "25px" }} />{" "}
                                                    {f.contactNo}
                                                </h6>
                                            </div>
                                            <div className="column history-btncol">
                                                <div className="markBtn">
                                                    <div className="absentCover">
                                                        <h2 className="absentText">Absent</h2>
                                                    </div>
                                                    {/* <Link to={"/staff/update/" + f._id}>
                                                        <IconButton
                                                            title="Edit Employee"
                                                            aria-label="delete"
                                                        >
                                                            <EditIcon fontSize="medium" color="primary" />
                                                        </IconButton>
                                                    </Link> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                )}
                <br />
            </div>
        </>
    )
}

export default AbsentAttendance