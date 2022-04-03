import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import EditIcon from '@material-ui/icons/Edit';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import IconButton from '@material-ui/core/IconButton';


function ViewProfile(props) {

    const [user, setUser] = useState([]);
    

    useEffect(() => {
        axios.get('/user/userprofile').then((res) => {
            setUser(res.data)
        }).catch((e) => {
            // window.location.href = "/public/login"
            swal({
                title: "unauthorized",
                text: "Please Login First " +e,
                icon: "warning"
            });
        })
    }, [])

    const deleteuser = (id) => {
        swal({
            title: "Are you sure?",
            text: "Employee Will be permenatly remove from System",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`/user/delete/${id}`).then(() => {

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
    

        return( 
        
            <>
            <br />
            <div className="container customcon2">
                <br />
                <div className='card maincard'>
                        <div className="row g-3">
                            <div className="column staffpage-imagecol">
                                <div className="staffimage card">
                                <img src={user.image} alt="Profile Img" className="userimg" />
                                </div>
                            </div>

                            <div className="column staffpage-namecol">
                                <h3 style={{ marginTop: "20px", marginRight: "80px", fontWeight:"700" }} className="staffprof-nameh5" >{user.name}</h3>
                                <h5 style={{ marginTop: "10px" }}> {user.email}</h5>
                                <h5 style={{ marginTop: "10px" }}>{user.contactNo}</h5>

                            </div>
                            
                            
                            <div className="column staffpage-iconcol">
                                <div className="filmicon">
                                    <Link to={"/testing"}>
                                        </Link>
                                    <Link to={"/user/userupdate/" + user._id}>
                                        <IconButton title="Edit Employee" aria-label="delete">
                                            <EditIcon fontSize="medium" color="primary" />
                                        </IconButton></Link>
                                    <IconButton title="Delete User" aria-label="delete" onClick={() => deleteuser(user._id)}>
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
                                <h5 className='staffPage-texth5'>{user.contactNo}</h5>
                                <h6 className='staffPage-texth6'>Email:</h6>
                                <h5 className='staffPage-texth5'>{user.email}</h5>
                                <h6 className='staffPage-texth6'>Date of Birth :</h6>
                                <h5 className='staffPage-texth5'>{user.dob}</h5>
                                
                            </div>
                            <div className="column staff-profilecol2">
                                <h6 className='staffPage-texth6'>NIC:</h6>
                                <h5 className='staffPage-texth5'>{user.nic}</h5>
                                <h6 className='staffPage-texth6'>Gender:</h6>
                                <h5 className='staffPage-texth5'>{user.gender}</h5>
                        
                            </div> 
                    </div>
                </div>
            </div>
            <br/>
        </>
    )
}

export default ViewProfile

    


    
       
    