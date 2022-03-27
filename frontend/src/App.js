import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Testing from "./component/Testing";
import Rooms from "./component/RoomManagement/Rooms";
import AddRooms from "./component/RoomManagement/AddRooms";
import AddEmployees from "./component/StaffManagement/AddEmployees";
import Login from "./component/Common/Login";
import ViewAllEmployee from "./component/StaffManagement/ViewAllEmployee";
import AddCustomer from "./component/CustomerManagement/AddCustomer";

function App() {
  return (
    <Router>
      <div>
        <Route path="/testing" exact component={Testing} />
        <Route path="/rooms" exact component={Rooms} />
        <Route path="/addrooms" exact component={AddRooms} />
        <Route path="/user/addstaff" exact component={AddEmployees} />
        <Route path="/public/login" exact component={Login} />
        <Route path="/user/viewallstaff" exact component={ViewAllEmployee} />
        <Route path="/register" exact component={AddCustomer} />
      </div>
    </Router>
  );
}

export default App;
