import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Testing from "./component/Testing";
import AddEmployees from "./component/StaffManagement/AddEmployees";
import Login from "./component/Common/Login";
import AddCustomer from "./component/CustomerManagement/AddCustomer";
import ViewProfile from "./component/CustomerManagement/ViewProfile";

import AddBooking from "./component/BookingManagement/AddBooking";
import ViewAllEmployee from "./component/StaffManagement/ViewAllEmployee";
import Header from "./component/Common/Headers/Header";
import Rooms from "./component/RoomManagement/Rooms";
import AddRooms from "./component/RoomManagement/AddRooms";
import UpdateEmployee from "./component/StaffManagement/UpdateEmployee";
import StaffProfile from "./component/StaffManagement/StaffProfile";
import ManageRooms from "./component/RoomManagement/ManageRooms";
import UpdateRoom from "./component/RoomManagement/UpdateRoom";
import HomePage from "./component/Common/Home Page/Homepage";
import UpdateCustomer from './component/CustomerManagement/UpdateCustomer';

import MyBooking from "./component/BookingManagement/MyBooking";

function App() {
  return (
    <Router>
      <div>
        <Route path="/" component={Header} />
        <Route path="/testing" exact component={Testing} />

        <Route path="/user/addstaff" exact component={AddEmployees} />
        <Route path="/public/login" exact component={Login} />
        <Route path="/register" exact component={AddCustomer} />
        <Route path="/userprofile" exact component={ViewProfile} />
        <Route path="/addbooking/:id" exact component={AddBooking} />
        <Route path="/rooms" exact component={Rooms} />
        <Route path="/addrooms" exact component={AddRooms} />
        <Route path="/user/viewallstaff" exact component={ViewAllEmployee} />
        <Route path="/staff/update/:id" exact component={UpdateEmployee} />
        <Route path="/staff/staffprofile/:id" exact component={StaffProfile} />
        <Route path="/managerooms" exact component={ManageRooms} />
        <Route path="/updateroom/:id" exact component={UpdateRoom} />
        <Route path="/" exact component={HomePage} />
        <Route path="/update/customer/:id" exact component={UpdateCustomer}/>
        <Route path="/mybooking" exact component={MyBooking} />
      </div>
    </Router>
  );
}

export default App;
