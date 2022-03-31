
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Testing from './component/Testing';
import AddBooking from './component/BookingManagement/AddBooking';



import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Testing from "./component/Testing";
import AddEmployees from "./component/StaffManagement/AddEmployees";
import Login from "./component/Common/Login";
import ViewAllEmployee from "./component/StaffManagement/ViewAllEmployee";
import AddCustomer from "./component/CustomerManagement/AddCustomer";
import Header from "./component/Common/Headers/Header";
import Rooms from "./component/RoomManagement/Rooms";
import AddRooms from "./component/RoomManagement/AddRooms";
import ManageRooms from "./component/RoomManagement/ManageRooms";
import UpdateEmployee from "./component/StaffManagement/UpdateEmployee";
import UpdateRoom from "./component/RoomManagement/UpdateRoom";
import HomePage from "./component/Common/Home Page/Homepage";


function App() {
  return (
    <Router>
      <div>
        <Route path="/" component={Header} />
        <Route path="/testing" exact component={Testing} />

        <Route path="/addbooking" exact component={AddBooking} />

        <Route path="/rooms" exact component={Rooms} />
        <Route path="/addrooms" exact component={AddRooms} />
        <Route path="/user/addstaff" exact component={AddEmployees} />
        <Route path="/public/login" exact component={Login} />
        <Route path="/user/viewallstaff" exact component={ViewAllEmployee} />
        <Route path="/register" exact component={AddCustomer} />
        <Route path="/managerooms" exact component={ManageRooms} />
        <Route path="/staff/update/:id" exact component={UpdateEmployee} />
        <Route path="/updateroom" exact component={UpdateRoom} />
        <Route path="/" exact component={HomePage} />

      </div>
    </Router>
  );
}

export default App;
