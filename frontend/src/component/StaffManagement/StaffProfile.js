import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import call from '../../Assets/Icons/call.png'
import mail from '../../Assets/Icons/mail.png'
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import './staffprofile.css'


function StaffProfile(props) {

    const [staff, setStaff] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/staff/getStaff/${id}`).then((res) => {
            setStaff(res.data.staff)
        }).catch((e) => {
            window.location.href = "/public/login"
            swal({
                title: "unauthorized",
                text: "Please Login First ",
                icon: "warning"
            });
        })
    }, [])

    const deleteStaff = (id) => {
        swal({
            title: "Are you sure?",
            text: "Employee Will be permenatly remove from System",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`/staff/deletestaff/${id}`).then(() => {

                    if (willDelete) {
                        swal("The Employee has been deleted!",
                            { icon: "success", });
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    } else {
                        swal("Empoyee Is Not Deleted");
                    }
                })
            }
        });
    }


    return (
        <>
            <br />
            <div className="container customcon2">
                <br />
                <div className='card maincard'>
                        <div className="row g-3">
                            <div className="column staffpage-imagecol">
                                <div className="staffimage card">
                                    <img src={staff.profileImg} alt="Profile Img" className="staffimg" />
                                </div>
                            </div>
                            <div className="column staffpage-namecol">
                                <h3 style={{ marginTop: "20px", marginRight: "80px", fontWeight:"700" }} className="staffprof-nameh5" >{staff.name}</h3>
                                <h5 style={{ marginTop: "10px" }}><img src={mail} style={{ width: "25px" }} /> {staff.email}</h5>
                                <h5 style={{ marginTop: "10px" }}><img src={call} style={{ width: "25px" }} />{staff.code}{staff.contactNo}</h5>



                            </div>
                            <div className="column staffpage-iconcol">
                                <div className="filmicon">
                                    <Link to={"/testing"}>
                                        <IconButton title="View Attendance" aria-label="delete">
                                            <CalendarMonthIcon fontSize="medium" style={{ color: "lime" }} />
                                        </IconButton></Link>
                                    <Link to={"/staff/update/" + staff._id}>
                                        <IconButton title="Edit Employee" aria-label="delete">
                                            <EditIcon fontSize="medium" color="primary" />
                                        </IconButton></Link>
                                    <IconButton title="Delete Employee" aria-label="delete" onClick={() => deleteStaff(staff._id)}>
                                        <CancelRoundedIcon fontSize="large" color="secondary" />
                                    </IconButton>

                                </div>
                            </div>
                    </div>


                    {/* <div className="card border-light mb-3 staffcard"> */}
                    <hr />
                        <div className="row g-2">
                            <div className="column staff-profilecol1">
                                <h6 className='staffPage-texth6'>Contact Number:</h6>
                                <h5 className='staffPage-texth5'>{staff.code}{staff.contactNo}</h5>
                                <h6 className='staffPage-texth6'>Email:</h6>
                                <h5 className='staffPage-texth5'>{staff.email}</h5>
                                <h6 className='staffPage-texth6'>Address:</h6>
                                <h5 className='staffPage-texth5'>{staff.address}</h5>
                                <h6 className='staffPage-texth6'>Age:</h6>
                                <h5 className='staffPage-texth5'>{staff.age}</h5>
                            </div>
                            <div className="column staff-profilecol2">
                                <h6 className='staffPage-texth6'>NIC:</h6>
                                <h5 className='staffPage-texth5'>{staff.nic}</h5>
                                <h6 className='staffPage-texth6'>Gender:</h6>
                                <h5 className='staffPage-texth5'>{staff.gender}</h5>
                                <h6 className='staffPage-texth6'>Job Title:</h6>
                                <h5 className='staffPage-texth5'>{staff.jobtitle}</h5>
                                <h6 className='staffPage-texth6'>Martial State:</h6>
                                <h5 className='staffPage-texth5'>{staff.martialStatus}</h5>
                            </div> 
                    </div>
                </div>
            </div>
            <br/>
        </>
    )
}

export default StaffProfile