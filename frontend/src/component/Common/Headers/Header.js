import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../Assets/Images/HotalLOGOLarge.png'
import axios from "axios";
import './header.css'
import Authentication from "../../../Services/Authentication";
import {AuthContext} from '../../../Context/AuthContext';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';


const Header = props => {
  const [user, setUser] = useState([]);

  const {isAuthenticated,setIsAuthenticated} = useContext(AuthContext);  

  let history = useHistory();


  useEffect(()=>{
    const fetchUser = async()=>{
     const res = await axios.get('/user/userprofile').then((res)=>{
      setUser(res.data);
      })
    }
    fetchUser();
  }, []);

  const onClickLogoutHandler = ()=>{
    swal({
      title: "Log Out",
      text: "Are you Sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
    Authentication.logout().then(data=>{
      
      if(data.success){
            setUser(data.user);
            setIsAuthenticated(false);
            window.location.href = "/public/login"
            swal("Success", 
            "Successfully Logout",
            {icon: "success"}
          );
          } 
          // else {
          //   swal("Your Not Logout");}

      })
      }
  })
}

  
  return (
    <>
    <nav class="navbar sticky-top navbar-expand-lg navbar-dark"  style={{backgroundColor:"#2c2c6c"}}>
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
    <img src={logo} alt="" width="30" height="24"/>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    {user.length === 0?
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <Link to="/testing"><a class="nav-link">Rooms</a></Link>
        </li>
        <li class="nav-item">
          <Link to="/public/login"><a class="nav-link">Login/Register</a></Link>
        </li>
      </ul>:
      <>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <Link to="/testing"><a class="nav-link">Rooms</a></Link>
        </li>
        {user.role === 'user'?
                <li class="nav-item">
                <Link to="/testing"><a class="nav-link">My Bookings</a></Link>
              </li>:user.role === 'staff'?<>
                      <li class="nav-item">
                      <Link to="/testing"><a class="nav-link">Bookings</a></Link>
                    </li>
                    <li class="nav-item">
                    <Link to="/user/viewallstaff"><a class="nav-link">Employees</a></Link>
                     </li></>
                    :user.role ==='admin'?
                            <li class="nav-item">
                            <Link to="/testing"><a class="nav-link">All Users</a></Link>
                          </li>:<div class="spinner-border text-warning" role="status"></div>
      }

        <li class="nav-item">
          <Link to="/testing"><a class="nav-link">Profile</a></Link>
        </li>
      </ul>
      <div className='scrollStop'>
      <div class="dropdown">
      <span class="navbar-text profileHeader dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        <div className="profileHeader-img">
        <img src={user.image} className="headerImg"/>
        </div>
        <div className="profileHeader-name">
        <h7>{user.name}</h7>
        </div>
      </span>

      <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="#">Profile</a></li>
    <li><hr class="dropdown-divider"/></li>
    <li><a class="dropdown-item logoutBtnHeader" onClick={onClickLogoutHandler}>Logout</a></li>
  </ul>
      </div>
      </div>

</>}
    </div>
  </div>
</nav></>
  )
}

export default Header