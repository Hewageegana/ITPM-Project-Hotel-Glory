import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import jspdf from "jspdf";
import "jspdf-autotable";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import logo from "../../Assets/Images/HotalLOGOLarge.png";
import imgDefault from "../../Assets/Images/postman.png";
import call from "../../Assets/Icons/call.png";
import job from "../../Assets/Icons/job.png";
import "./viewallemployee.css";
import identity from "../../Assets/Icons/identity-card.png";
import img from "../../Assets/Images/HotalLOGOLarge.png";
import mail from "../../Assets/Icons/mail.png";
import "./attendance.css";

function Attendance() {

    let history = useHistory();
    let path = "/public/login";
    const [searchTerm, setsearchTerm] = useState("");
    const [user, setUser] = useState([]);
    // const [pageNumber, setPageNumber] = useState(0);
    const [attendance, setAttendence] = useState([]);

    useEffect(() => {
        const getAttendance = async () => {
            const res = await axios.get("/staff/allattendance").then((res) => {
                setAttendence(res.data.attendance);
                console.log(res.data)
            });
        };
        getAttendance();
    }, []);

    function viewEmployee() {
        axios.get("/staff/attendance").then((res) => {
            console.log(res)
            setTimeout(function () {
                window.location.reload();
            });
        })
    }
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
                        Attendance
                    </h1>
                </center>
                <input
                    className="search sfocus"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => {
                        setsearchTerm(e.target.value);
                    }}
                />
                &nbsp;&nbsp;
                <Link to="/staff/history">
                    <button
                        type="submit"
                        className="btn btn-outline-info allempreg"
                        id="regsubmit"
                    >
                        Attendance History
                    </button>
                </Link>
                &nbsp;&nbsp;
                {/* <button
                    onClick={() => viewEmployee()}
                    type="submit"
                    className="btn btn-outline-info allempreg"
                    id="regsubmit"
                >
                    Attendance
                </button> */}
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
                {attendance.length === 0 ? (
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
                                        Click View Employees Button
                                    </h3>
                                    <center>
                                        <p>
                                            <button
                                                type="submit"
                                                className="button-28"
                                                role="button"
                                                id="regsubmit"
                                                onClick={() => viewEmployee()}
                                            >
                                                View Employees
                                            </button>
                                        </p>
                                    </center>
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
                        {attendance.map(function (f) {
                            return (
                                <div className="card mb-2 filmcard1">
                                    <div className="row g-3">
                                        <div className="column attendancepage-imgcol">
                                            <div className="filmimage card">
                                                <img src={f.profileImg} className="filmimg" />
                                            </div>
                                        </div>
                                        <div className="column attendancepage-detailcol">
                                            <h5
                                                style={{ marginTop: "20px", marginRight: "80px" }}
                                                className="filmpage-nameh5"
                                            >
                                                {f.name}
                                            </h5>
                                            <h6 style={{ marginTop: "2px" }}>
                                                <img src={mail} style={{ width: "25px" }} /> {f.email}
                                            </h6>

                                            <h6 style={{ marginTop: "0px" }}>
                                                <img src={identity} style={{ width: "25px" }} />{" "}
                                                {f.nic}
                                            </h6>

                                            <h6 style={{ marginTop: "0px" }}>
                                                <img src={job} style={{ width: "25px" }} />{" "}
                                                {f.jobtitle}
                                            </h6>
                                            <h6 style={{ marginTop: "0px" }}>
                                                <img src={call} style={{ width: "25px" }} />{" "}
                                                {f.contactNo}
                                            </h6>
                                        </div>
                                        <div className="column attendancepage-btncol">
                                            <div className="markBtn">
                                                <Link to={"/staff/mark/" + f._id}>
                                                    <button
                                                        type="submit"
                                                        className="btnregister"
                                                        id="regsubmit"
                                                    >
                                                        Mark
                                                    </button>
                                                </Link>
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

export default Attendance